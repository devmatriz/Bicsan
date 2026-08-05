from pathlib import Path

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import redirect_to_login
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST

from .models import Aporte


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
    if len(nombre) > 120:
        errores["name"] = "El nombre es demasiado largo."
    if len(comunidad) > 100:
        errores["community"] = "La comunidad es demasiado larga."
    if len(mensaje) > 5000:
        errores["message"] = "El aporte no puede superar 5000 caracteres."

    if errores:
        return JsonResponse({"ok": False, "errors": errores}, status=400)

    aporte = Aporte.objects.create(
        usuario=request.user,
        nombre=nombre,
        comunidad=comunidad,
        mensaje=mensaje,
    )
    return JsonResponse({"ok": True, "id": aporte.pk}, status=201)


@require_GET
def salud(request):
    return JsonResponse({"estado": "ok"})


@login_required
def cuenta(request):
    aportes = request.user.aportes_culturales.all()[:20]
    return render(request, "account/dashboard.html", {"aportes": aportes})
