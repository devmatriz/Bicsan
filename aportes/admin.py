from django.contrib import admin

from .models import Aporte, Comunidad, Region


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ("nombre",)
    search_fields = ("nombre",)


@admin.register(Comunidad)
class ComunidadAdmin(admin.ModelAdmin):
    list_display = ("nombre", "region")
    list_filter = ("region",)
    search_fields = ("nombre",)


@admin.register(Aporte)
class AporteAdmin(admin.ModelAdmin):
    list_display = ("nombre", "usuario", "comunidad", "creado", "revisado", "revisado_por")
    list_filter = ("comunidad__region", "comunidad", "revisado", "creado")
    search_fields = ("nombre", "usuario__email", "comunidad__nombre", "mensaje")
    list_editable = ("revisado",)
    list_select_related = ("usuario", "comunidad", "revisado_por")
    readonly_fields = ("creado", "revisado_por")
