"""Roles de BICSAN basados en grupos y permisos de Django."""
import logging

from django.contrib.auth.models import Group, Permission

logger = logging.getLogger(__name__)

COLABORADOR = "Colaborador"
MODERADOR = "Moderador"

PERMISOS = {
    COLABORADOR: ["add_aporte", "view_comunidad", "view_region"],
    MODERADOR: [
        "add_aporte",
        "view_comunidad",
        "view_region",
        "view_aporte",
        "revisar_aporte",
    ],
}


def crear_roles(sender=None, **kwargs):
    """Crea los grupos y sus permisos. Se ejecuta después de cada migrate."""
    from django.contrib.auth import get_user_model

    for nombre, codigos in PERMISOS.items():
        grupo, creado = Group.objects.get_or_create(name=nombre)
        permisos = Permission.objects.filter(
            content_type__app_label="aportes", codename__in=codigos
        )
        grupo.permissions.set(permisos)
        if creado and nombre == COLABORADOR:
            # Primera vez: las cuentas que ya existían pasan a ser colaboradoras.
            existentes = get_user_model().objects.filter(is_superuser=False)
            grupo.user_set.add(*existentes)
            logger.info("Rol %s creado y asignado a %s cuentas", nombre, existentes.count())


def asignar_colaborador(sender, request, user, **kwargs):
    """Toda cuenta nueva (correo o Google) recibe el rol Colaborador."""
    grupo, _ = Group.objects.get_or_create(name=COLABORADOR)
    user.groups.add(grupo)
    logger.info("Cuenta nueva %s agregada al rol %s", user.pk, COLABORADOR)
