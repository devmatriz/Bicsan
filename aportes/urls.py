from django.urls import path

from . import views


urlpatterns = [
    path("aportes/", views.crear_aporte, name="crear_aporte"),
    path("salud/", views.salud, name="salud"),
]
