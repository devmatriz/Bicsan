from django.contrib import admin
from django.urls import include, path

from aportes import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("api/", include("aportes.urls")),
    path("cuenta/", views.cuenta, name="cuenta"),
    path("", views.page, {"template_name": "index.html"}, name="inicio"),
    path("<str:page>.html", views.html_page, name="pagina"),
]
