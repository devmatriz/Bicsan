from django.contrib import admin

from .models import Aporte


@admin.register(Aporte)
class AporteAdmin(admin.ModelAdmin):
    list_display = ("nombre", "usuario", "comunidad", "creado", "revisado")
    list_filter = ("comunidad", "revisado", "creado")
    search_fields = ("nombre", "usuario__email", "comunidad", "mensaje")
    list_editable = ("revisado",)
    readonly_fields = ("creado",)
