from django.apps import AppConfig
from django.db.models.signals import post_migrate


class AportesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "aportes"
    verbose_name = "Aportes culturales"

    def ready(self):
        from allauth.account.signals import user_signed_up

        from .roles import asignar_colaborador, crear_roles

        post_migrate.connect(crear_roles, sender=self, dispatch_uid="aportes_crear_roles")
        user_signed_up.connect(asignar_colaborador, dispatch_uid="aportes_asignar_colaborador")
