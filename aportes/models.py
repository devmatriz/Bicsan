from django.conf import settings
from django.db import models


class Region(models.Model):
    nombre = models.CharField(max_length=60, unique=True)

    class Meta:
        ordering = ["nombre"]
        verbose_name = "región"
        verbose_name_plural = "regiones"

    def __str__(self):
        return self.nombre


class Comunidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    region = models.ForeignKey(
        Region,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="comunidades",
        help_text="Vacío cuando el pueblo está presente en todo el país.",
    )

    class Meta:
        ordering = ["nombre"]
        verbose_name = "comunidad"
        verbose_name_plural = "comunidades"

    def __str__(self):
        return self.nombre


class Aporte(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="aportes_culturales",
    )
    nombre = models.CharField(max_length=120)
    comunidad = models.ForeignKey(
        Comunidad,
        on_delete=models.PROTECT,
        related_name="aportes",
    )
    mensaje = models.TextField(max_length=5000)
    revisado = models.BooleanField(default=False)
    revisado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="aportes_revisados",
    )
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-creado"]
        verbose_name = "aporte"
        verbose_name_plural = "aportes"
        permissions = [
            ("revisar_aporte", "Puede revisar y aprobar aportes"),
        ]

    def __str__(self):
        return f"{self.nombre} - {self.comunidad}"
