from allauth.mfa.models import Authenticator
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.test import TestCase, override_settings
from django.urls import reverse

from .models import Aporte, Comunidad, Region
from .roles import COLABORADOR, MODERADOR


class SitioTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="maria", email="maria@example.com", password="Clave-segura-2026"
        )
        self.user.groups.add(Group.objects.get(name=COLABORADOR))
    def test_inicio_carga(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 302)
        self.assertIn("/accounts/login/", response.url)

        self.client.force_login(self.user)
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "csrfmiddlewaretoken")
        self.assertContains(response, 'id="contributeForm"')

    def test_paginas_de_cuenta_cargan(self):
        self.assertEqual(self.client.get("/accounts/login/").status_code, 200)
        self.assertEqual(self.client.get("/accounts/signup/").status_code, 200)
        self.assertEqual(self.client.get("/accounts/password/reset/").status_code, 200)
        response = self.client.get("/cuenta/")
        self.assertEqual(response.status_code, 302)
        self.client.force_login(self.user)
        self.assertEqual(self.client.get("/cuenta/").status_code, 200)

    def test_paginas_publicas_cargan(self):
        for page in ("privacidad", "terminos"):
            with self.subTest(page=page):
                self.assertEqual(self.client.get(f"/{page}.html").status_code, 200)

        for page in ("acerca", "calendario", "coleccion", "detalle", "diccionario",
                     "exposicion", "index", "pueblo", "region", "trivia"):
            with self.subTest(page=page):
                response = self.client.get(f"/{page}.html")
                self.assertEqual(response.status_code, 302)
                self.assertIn("/accounts/login/", response.url)

        self.client.force_login(self.user)
        for page in ("acerca", "calendario", "coleccion", "detalle", "diccionario",
                     "exposicion", "index", "pueblo", "region", "trivia"):
            with self.subTest(page=page):
                self.assertEqual(self.client.get(f"/{page}.html").status_code, 200)

    def test_crear_aporte(self):
        self.client.force_login(self.user)
        response = self.client.post(
            reverse("crear_aporte"),
            {"name": "Maria", "community": "Mískitu", "message": "Relato comunitario"},
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.json()["ok"])
        self.assertEqual(Aporte.objects.count(), 1)
        self.assertEqual(Aporte.objects.get().usuario, self.user)

    def test_rechazar_aporte_incompleto(self):
        self.client.force_login(self.user)
        response = self.client.post(reverse("crear_aporte"), {"name": "Maria"})
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.json()["ok"])

    def test_rechazar_comunidad_inexistente(self):
        self.client.force_login(self.user)
        response = self.client.post(
            reverse("crear_aporte"),
            {"name": "Maria", "community": "Inventada", "message": "Relato comunitario"},
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("community", response.json()["errors"])
        self.assertEqual(Aporte.objects.count(), 0)

    def test_catalogo_de_comunidades(self):
        self.assertEqual(Region.objects.count(), 4)
        self.assertEqual(Comunidad.objects.count(), 10)
        self.assertEqual(
            Comunidad.objects.get(nombre="Mískitu").region.nombre, "Costa Caribe Norte"
        )

    def test_aporte_requiere_cuenta(self):
        response = self.client.post(
            reverse("crear_aporte"),
            {"name": "Ana", "community": "Rama", "message": "Historia del pueblo"},
        )
        self.assertEqual(response.status_code, 302)
        self.assertIn("/accounts/login/", response.url)

    def test_salud(self):
        response = self.client.get(reverse("salud"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"estado": "ok"})


class SeguridadTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.sin_rol = User.objects.create_user(
            username="sinrol", email="sinrol@example.com", password="Clave-segura-2026"
        )
        self.moderador = User.objects.create_user(
            username="mod", email="mod@example.com", password="Clave-segura-2026"
        )
        self.moderador.groups.add(Group.objects.get(name=MODERADOR))
        self.colaborador = User.objects.create_user(
            username="colab", email="colab@example.com", password="Clave-segura-2026"
        )
        self.colaborador.groups.add(Group.objects.get(name=COLABORADOR))
        self.aporte = Aporte.objects.create(
            usuario=self.colaborador,
            nombre="Colab",
            comunidad=Comunidad.objects.get(nombre="Rama"),
            mensaje="Historia del pueblo rama",
        )

    def activar_2fa(self, user):
        Authenticator.objects.create(user=user, type=Authenticator.Type.TOTP, data={"secret": "x"})

    def test_roles_creados_con_permisos(self):
        colaborador = Group.objects.get(name=COLABORADOR)
        moderador = Group.objects.get(name=MODERADOR)
        self.assertTrue(colaborador.permissions.filter(codename="add_aporte").exists())
        self.assertFalse(colaborador.permissions.filter(codename="revisar_aporte").exists())
        self.assertTrue(moderador.permissions.filter(codename="revisar_aporte").exists())

    def test_registro_asigna_rol_colaborador(self):
        response = self.client.post(
            reverse("account_signup"),
            {"email": "nuevo@example.com", "password1": "Clave-segura-2026", "password2": "Clave-segura-2026"},
        )
        self.assertEqual(response.status_code, 302)
        nuevo = get_user_model().objects.get(email="nuevo@example.com")
        self.assertTrue(nuevo.groups.filter(name=COLABORADOR).exists())

    def test_usuario_sin_permiso_no_envia_aportes(self):
        self.client.force_login(self.sin_rol)
        response = self.client.post(
            reverse("crear_aporte"),
            {"name": "X", "community": "Rama", "message": "Historia del pueblo"},
        )
        self.assertEqual(response.status_code, 403)

    def test_rechaza_textos_muy_cortos(self):
        self.client.force_login(self.colaborador)
        response = self.client.post(
            reverse("crear_aporte"), {"name": "A", "community": "Rama", "message": "corto"}
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name", "message"})

    def test_colaborador_no_puede_moderar(self):
        self.client.force_login(self.colaborador)
        response = self.client.get(reverse("moderacion"))
        self.assertEqual(response.status_code, 403)
        self.assertContains(response, "Acceso denegado", status_code=403)

    def test_moderador_sin_2fa_es_enviado_a_activarlo(self):
        self.client.force_login(self.moderador)
        response = self.client.get(reverse("moderacion"))
        self.assertRedirects(response, reverse("mfa_index"), fetch_redirect_response=False)

    def test_moderador_con_2fa_revisa_aporte(self):
        self.activar_2fa(self.moderador)
        self.client.force_login(self.moderador)
        response = self.client.get(reverse("moderacion"))
        self.assertContains(response, "Historia del pueblo rama")
        response = self.client.post(reverse("marcar_revisado", args=[self.aporte.pk]))
        self.assertRedirects(response, reverse("moderacion"), fetch_redirect_response=False)
        self.aporte.refresh_from_db()
        self.assertTrue(self.aporte.revisado)
        self.assertEqual(self.aporte.revisado_por, self.moderador)

    def test_marcar_revisado_solo_por_post(self):
        self.activar_2fa(self.moderador)
        self.client.force_login(self.moderador)
        response = self.client.get(reverse("marcar_revisado", args=[self.aporte.pk]))
        self.assertEqual(response.status_code, 405)

    def test_admin_usa_login_con_2fa(self):
        response = self.client.get("/admin/")
        self.assertEqual(response.status_code, 302)
        response = self.client.get(response.url)
        self.assertEqual(response.status_code, 302)
        self.assertIn("/accounts/login/", response.url)

    def test_pagina_404_personalizada(self):
        response = self.client.get("/no-existe.html")
        self.assertContains(response, "Página no encontrada", status_code=404)

    def test_paginas_2fa_cargan(self):
        self.client.force_login(self.colaborador)
        self.assertEqual(self.client.get(reverse("mfa_index")).status_code, 200)
        self.assertEqual(self.client.get(reverse("cuenta")).status_code, 200)

    def test_sesion_expira_por_inactividad(self):
        self.assertEqual(settings.SESSION_COOKIE_AGE, 1800)
        self.assertTrue(settings.SESSION_SAVE_EVERY_REQUEST)
        self.assertTrue(settings.SESSION_EXPIRE_AT_BROWSER_CLOSE)

    @override_settings(CORS_ALLOWED_ORIGINS=["https://app.ejemplo.com"])
    def test_cors_solo_permite_origenes_configurados(self):
        response = self.client.get(reverse("salud"), HTTP_ORIGIN="https://app.ejemplo.com")
        self.assertEqual(response["Access-Control-Allow-Origin"], "https://app.ejemplo.com")

        response = self.client.get(reverse("salud"), HTTP_ORIGIN="https://sitio-ajeno.com")
        self.assertNotIn("Access-Control-Allow-Origin", response)
