from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from .models import Aporte


class SitioTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="maria", email="maria@example.com", password="Clave-segura-2026"
        )
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
            {"name": "Maria", "community": "Miskitu", "message": "Relato comunitario"},
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

    def test_aporte_requiere_cuenta(self):
        response = self.client.post(
            reverse("crear_aporte"),
            {"name": "Ana", "community": "Rama", "message": "Historia"},
        )
        self.assertEqual(response.status_code, 302)
        self.assertIn("/accounts/login/", response.url)

    def test_salud(self):
        response = self.client.get(reverse("salud"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"estado": "ok"})
