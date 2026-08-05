from django.conf import settings
from django.db import models


class Aporte(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="aportes_culturales",
    )
    nombre = models.CharField(max_length=120)
    comunidad = models.CharField(max_length=100)
    mensaje = models.TextField(max_length=5000)
    revisado = models.BooleanField(default=False)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-creado"]
        verbose_name = "aporte"
        verbose_name_plural = "aportes"

    def __str__(self):
        return f"{self.nombre} - {self.comunidad}"
