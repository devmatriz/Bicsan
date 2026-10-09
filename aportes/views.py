import logging
from functools import wraps
from pathlib import Path

from allauth.mfa.utils import is_mfa_enabled
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.views import redirect_to_login
from django.db import DatabaseError
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_GET, require_POST

from .models import Aporte, Comunidad


logger = logging.getLogger(__name__)

PAGINAS = {
    "acerca",
    "calendario",
    "coleccion",
    "detalle",
    "diccionario",
    "exposicion",
    "index",
    "privacidad",
    "pueblo",
    "region",
    "trivia",
    "terminos",
}


def requiere_2fa(view):
    """Exige que el usuario tenga la autenticación de dos factores activa."""

    @wraps(view)
    def wrapper(request, *args, **kwargs):
        if not is_mfa_enabled(request.user):
            messages.warning(
                request,
                "Para moderar aportes necesitas activar la verificación en dos pasos.",
            )
            return redirect("mfa_index")
        return view(request, *args, **kwargs)

    return wrapper


@login_required
def page(request, template_name):
    return render(request, template_name)


def html_page(request, page):
    if page not in PAGINAS:
        raise Http404("Pagina no encontrada")
    template_name = f"{page}.html"
    if not (Path(settings.BASE_DIR) / template_name).is_file():
        raise Http404("Pagina no encontrada")
    if page not in {"privacidad", "terminos"} and not request.user.is_authenticated:
        return redirect_to_login(request.get_full_path())
    return render(request, template_name)


@require_POST
@login_required
def crear_aporte(request):
    if not request.user.has_perm("aportes.add_aporte"):
        logger.warning("Usuario %s sin permiso intentó enviar un aporte", request.user.pk)
        return JsonResponse(
            {"ok": False, "errors": {"__all__": "Tu cuenta no tiene permiso para enviar aportes."}},
            status=403,
        )

    nombre = request.POST.get("name", "").strip()
    comunidad = request.POST.get("community", "").strip()
    mensaje = request.POST.get("message", "").strip()

    errores = {}
    if not nombre:
        errores["name"] = "El nombre es obligatorio."
    if not comunidad:
        errores["community"] = "La comunidad es obligatoria."
    if not mensaje:
        errores["message"] = "El aporte es obligatorio."
    if nombre and len(nombre) < 2:
        errores["name"] = "El nombre debe tener al menos 2 caracteres."
    if mensaje and len(mensaje) < 10:
        errores["message"] = "El aporte debe tener al menos 10 caracteres."
    if len(nombre) > 120:
        errores["name"] = "El nombre es demasiado largo."
    if len(comunidad) > 100:
        errores["community"] = "La comunidad es demasiado larga."
    if len(mensaje) > 5000:
        errores["message"] = "El aporte no puede superar 5000 caracteres."

    comunidad_obj = None
    if comunidad and "community" not in errores:
        comunidad_obj = Comunidad.objects.filter(nombre__iexact=comunidad).first()
        if comunidad_obj is None:
            errores["community"] = "Selecciona una comunidad de la lista."

    if errores:
        return JsonResponse({"ok": False, "errors": errores}, status=400)

    try:
        aporte = Aporte.objects.create(
            usuario=request.user,
            nombre=nombre,
            comunidad=comunidad_obj,
            mensaje=mensaje,
        )
    except DatabaseError:
        logger.exception("No se pudo guardar el aporte del usuario %s", request.user.pk)
        return JsonResponse(
            {"ok": False, "errors": {"__all__": "Error interno. Inténtalo más tarde."}},
            status=500,
        )
    logger.info("Aporte %s creado por el usuario %s", aporte.pk, request.user.pk)
    return JsonResponse({"ok": True, "id": aporte.pk}, status=201)


@require_GET
def salud(request):
    return JsonResponse({"estado": "ok"})


@login_required
def cuenta(request):
    aportes = request.user.aportes_culturales.select_related("comunidad")[:20]
    return render(
        request,
        "account/dashboard.html",
        {
            "aportes": aportes,
            "mfa_activo": is_mfa_enabled(request.user),
            "roles": request.user.groups.values_list("name", flat=True),
        },
    )


@require_GET
@login_required
@permission_required("aportes.revisar_aporte", raise_exception=True)
@requiere_2fa
def moderacion(request):
    pendientes = Aporte.objects.filter(revisado=False).select_related("usuario", "comunidad__region")
    return render(request, "account/moderacion.html", {"pendientes": pendientes})


@require_POST
@login_required
@permission_required("aportes.revisar_aporte", raise_exception=True)
@requiere_2fa
def marcar_revisado(request, pk):
    aporte = get_object_or_404(Aporte, pk=pk, revisado=False)
    aporte.revisado = True
    aporte.revisado_por = request.user
    aporte.save(update_fields=["revisado", "revisado_por"])
    logger.info("Aporte %s revisado por el usuario %s", aporte.pk, request.user.pk)
    messages.success(request, f"Aporte de {aporte.nombre} marcado como revisado.")
    return redirect("moderacion")
