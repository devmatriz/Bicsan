from allauth.account.decorators import secure_admin_login
from django.contrib import admin
from django.urls import include, path

from aportes import views


# El panel /admin/ usa el login de allauth para que también exija 2FA.
admin.site.login = secure_admin_login(admin.site.login)
admin.site.site_header = "Administración BICSAN"
admin.site.site_title = "BICSAN"


urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("api/", include("aportes.urls")),
    path("cuenta/", views.cuenta, name="cuenta"),
    path("moderacion/", views.moderacion, name="moderacion"),
    path("moderacion/<int:pk>/revisar/", views.marcar_revisado, name="marcar_revisado"),
    path("", views.page, {"template_name": "index.html"}, name="inicio"),
    path("<str:page>.html", views.html_page, name="pagina"),
]
