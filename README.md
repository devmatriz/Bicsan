# BICSAN

**Biblioteca Intercultural de Cosmovisiones y Saberes Ancestrales de Nicaragua.**
Plataforma web para recopilar, preservar y difundir los saberes de los pueblos
indígenas, afrodescendientes y mestizos de las cuatro regiones de Nicaragua:
pueblos, comidas, danzas, leyendas, lugares y lenguas.

| | |
|---|---|
| **Producción** | _pendiente: agrega aquí la URL de Render cuando esté publicado_ |
| **Repositorio** | <https://github.com/devmatriz/Bicsan> |
| **Licencia** | Ver [`LICENSE`](LICENSE) |
| **Documentación técnica** | [`docs/`](docs/README.md): modelo ER y diagramas UML |
| **Flujo de trabajo Git** | [`CONTRIBUTING.md`](CONTRIBUTING.md) |

---

## Índice

1. [Arquitectura](#1-arquitectura)
2. [Tecnologías y dependencias](#2-tecnologías-y-dependencias)
3. [Estructura del proyecto y módulos](#3-estructura-del-proyecto-y-módulos)
4. [Modelo de datos](#4-modelo-de-datos)
5. [Endpoints y rutas](#5-endpoints-y-rutas)
6. [Roles y permisos](#6-roles-y-permisos)
7. [Seguridad](#7-seguridad)
8. [Variables de entorno](#8-variables-de-entorno)
9. [Instalación local](#9-instalación-local)
10. [Pruebas](#10-pruebas)
11. [Despliegue en producción](#11-despliegue-en-producción)
12. [Control de versiones](#12-control-de-versiones)

---

## 1. Arquitectura

BICSAN es una aplicación **monolítica Django** con renderizado en el servidor y
JavaScript en el navegador para la interacción. Django entrega las páginas,
protege el acceso, recibe los aportes y sirve los archivos estáticos.

```mermaid
flowchart LR
    U["Navegador<br/>HTML + CSS + JS"] -- "HTTPS" --> G["Gunicorn<br/>(servidor WSGI)"]
    G --> MW["Middleware Django<br/>Security · WhiteNoise · Sesión<br/>CSRF · Auth · allauth"]
    MW --> R["bicsan/urls.py"]
    R --> V1["aportes.views<br/>páginas, API, moderación"]
    R --> V2["allauth<br/>login, registro, 2FA, Google"]
    R --> V3["django.contrib.admin"]
    V1 & V2 & V3 --> ORM["ORM de Django"]
    ORM --> DB[("SQLite (local)<br/>PostgreSQL (producción)")]
    V2 -- "OAuth 2.0" --> GO["Google"]
    V2 -- "SMTP" --> MAIL["Servidor de correo"]
    MW -. "/assets/*" .-> ST["Archivos estáticos<br/>(WhiteNoise)"]
```

**Flujo de una petición**

1. El navegador pide una página, por ejemplo `/region.html`.
2. Los middlewares aplican HTTPS, cabeceras de seguridad, sesión y CSRF.
3. La vista comprueba que haya sesión iniciada; si no, redirige al login.
4. Django renderiza la plantilla HTML. Los datos culturales (pueblos, recetas,
   danzas…) están en `assets/js/data.js` y el JavaScript arma las tarjetas,
   filtros y buscadores en el navegador.
5. El formulario de aportes envía un `POST` con `fetch` a `/api/aportes/`, que
   valida y guarda en la base de datos y responde JSON.

---

## 2. Tecnologías y dependencias

| Capa | Tecnología |
|---|---|
| Backend | Python 3.11+ · Django 5.2 |
| Autenticación | django-allauth 65 (correo, Google OAuth 2.0, 2FA) |
| Base de datos | SQLite en desarrollo · PostgreSQL en producción |
| Frontend | HTML5, CSS3, JavaScript sin frameworks · `<model-viewer>` para modelos 3D |
| Servidor | Gunicorn (Linux/Render) · Waitress (Windows) |
| Alojamiento | Render (`render.yaml`) |

**Dependencias de Python** (`requirements.txt`):

| Paquete | Para qué se usa |
|---|---|
| `Django` | Framework web: rutas, vistas, ORM, plantillas, admin y seguridad. |
| `django-allauth[socialaccount,mfa]` | Registro, login por correo, verificación, recuperación de contraseña, login con Google y verificación en dos pasos (TOTP). Instala `qrcode` y `fido2`. |
| `dj-database-url` | Convierte la variable `DATABASE_URL` en la configuración de base de datos. |
| `psycopg[binary]` | Controlador para PostgreSQL en producción. |
| `gunicorn` | Servidor WSGI de producción en Linux. |
| `waitress` | Servidor WSGI alternativo que funciona en Windows. |
| `whitenoise` | Sirve los archivos estáticos comprimidos sin necesidad de Nginx. |
| `python-dotenv` | Lee las variables del archivo `.env` en desarrollo. |

**Dependencias del navegador** (por CDN): Google Fonts (Barlow Condensed y
Source Sans 3) y `@google/model-viewer` para los modelos 3D de la Costa Caribe.

---

## 3. Estructura del proyecto y módulos

```text
bicsan/                      Configuración del proyecto Django
├── settings.py              Ajustes: apps, base de datos, seguridad, sesión, 2FA, logging
├── urls.py                  Rutas principales; protege /admin/ con el login de allauth
├── wsgi.py / asgi.py        Puntos de entrada para el servidor

aportes/                     Aplicación principal
├── models.py                Region, Comunidad y Aporte
├── views.py                 Páginas, API de aportes, Mi cuenta, moderación, salud
├── urls.py                  Rutas /api/aportes/ y /api/salud/
├── roles.py                 Crea los roles Colaborador y Moderador y sus permisos
├── apps.py                  Conecta las señales (roles tras migrate, rol al registrarse)
├── admin.py                 Configuración del panel /admin/
├── context_processors.py    Indica a las plantillas si el login con Google está activo
├── tests.py                 21 pruebas automáticas
└── migrations/              Historial del esquema de la base de datos

templates/
├── account/                 Login, registro, recuperación, Mi cuenta, moderación
├── allauth/layouts/         Aplica el diseño de BICSAN a las páginas de allauth (2FA, correo)
└── 403.html, 404.html, 500.html   Páginas de error

assets/                      Archivos estáticos (se publican en /assets/)
├── css/styles.css           Estilos del sitio
├── css/auth.css             Estilos de cuenta, 2FA y moderación
├── js/data.js               Contenido cultural: pueblos, lugares, recetas, danzas, leyendas, diccionario
├── js/core.js               Común a todas las páginas: encabezado y pie, modo oscuro, idioma ES/EN,
│                            tamaño de letra, favoritos, reto del día, «Sorpréndeme»
├── js/app.js                Página de inicio: mapa, colecciones, formulario de aportes
├── js/pages.js              Páginas internas: región, pueblo, detalle, colección, trivia…
├── js/caribe-lab.js         Visor 3D e infografías de la Costa Caribe
├── js/icons.js              Íconos SVG
├── img/, infografias/, models/   Imágenes, láminas y modelos 3D (.glb)

*.html                       Páginas del sitio (index, region, pueblo, detalle, colección,
                             diccionario, calendario, trivia, exposición, acerca, privacidad, términos)
docs/                        Modelo ER y diagramas UML
render.yaml, build.sh        Despliegue en Render
*.bat                        Instalación y arranque en Windows
```

---

## 4. Modelo de datos

```mermaid
erDiagram
    REGION ||--o{ COMUNIDAD : agrupa
    COMUNIDAD ||--o{ APORTE : recibe
    USUARIO ||--o{ APORTE : "envía / revisa"
```

| Modelo | Campos principales | Notas |
|---|---|---|
| `Region` | `nombre` (único) | 4 regiones cargadas por la migración `0003`. |
| `Comunidad` | `nombre` (único), `region` → Region | 10 pueblos cargados por la migración `0003`. |
| `Aporte` | `usuario`, `comunidad`, `nombre`, `mensaje`, `revisado`, `revisado_por`, `creado` | Permiso personalizado `revisar_aporte`. |

Diagrama completo, justificación de la 3FN y diagramas UML en [`docs/`](docs/README.md).

---

## 5. Endpoints y rutas

### API JSON

| Método | Ruta | Acceso | Descripción | Respuestas |
|---|---|---|---|---|
| `POST` | `/api/aportes/` | Sesión + permiso `aportes.add_aporte` + token CSRF | Crea un aporte cultural. | `201` creado · `400` errores de validación · `403` sin permiso · `302` sin sesión · `405` otro método |
| `GET` | `/api/salud/` | Público | Comprobación de salud usada por Render. | `200 {"estado": "ok"}` |

**Ejemplo `POST /api/aportes/`** (formulario `multipart/form-data` o `x-www-form-urlencoded`):

| Campo | Reglas |
|---|---|
| `name` | Obligatorio, 2 a 120 caracteres. |
| `community` | Obligatorio; debe existir en el catálogo de comunidades. |
| `message` | Obligatorio, 10 a 5000 caracteres. |

```json
// 201
{ "ok": true, "id": 12 }
// 400
{ "ok": false, "errors": { "community": "Selecciona una comunidad de la lista." } }
```

### Páginas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` y `/index.html` | Sesión | Inicio. |
| `/<pagina>.html` | Sesión | `acerca`, `calendario`, `coleccion`, `detalle`, `diccionario`, `exposicion`, `pueblo`, `region`, `trivia`. |
| `/privacidad.html`, `/terminos.html` | Público | Páginas legales. |
| `/cuenta/` | Sesión | Mi cuenta: roles, estado del 2FA y aportes propios. |
| `/moderacion/` | Permiso `revisar_aporte` + 2FA activo | Lista de aportes pendientes. |
| `POST /moderacion/<id>/revisar/` | Igual que la anterior | Marca un aporte como revisado. |
| `/admin/` | Personal (`is_staff`) con login de allauth | Panel de administración de Django. |

### Cuentas (django-allauth)

| Ruta | Descripción |
|---|---|
| `/accounts/signup/` | Registro con correo y contraseña. |
| `/accounts/login/` | Inicio de sesión (pide el código 2FA si está activo). |
| `/accounts/logout/` | Cierre de sesión (`POST`). |
| `/accounts/password/reset/` | Recuperación de contraseña por correo. |
| `/accounts/password/change/` | Cambio de contraseña. |
| `/accounts/email/` | Administrar correos. |
| `/accounts/google/login/` | Inicio de sesión con Google. |
| `/accounts/2fa/` | Panel de verificación en dos pasos. |
| `/accounts/2fa/totp/activate/` | Activar la app autenticadora (pide reingresar la contraseña). |
| `/accounts/2fa/recovery-codes/` | Ver o regenerar códigos de recuperación. |

---

## 6. Roles y permisos

Los roles son grupos de Django. Se crean automáticamente al ejecutar
`python manage.py migrate` (`aportes/roles.py`).

| Rol | Cómo se obtiene | Permisos |
|---|---|---|
| **Visitante** | Sin sesión | Login, registro, recuperación y páginas legales. |
| **Colaborador** | Automático al registrarse (correo o Google) | `add_aporte`, `view_comunidad`, `view_region`. |
| **Moderador** | Lo asigna un administrador en `/admin/` → Usuarios → Grupos | Lo anterior + `view_aporte`, `revisar_aporte`. Debe tener 2FA activo. |
| **Administrador** | `python manage.py createsuperuser` | Todos los permisos y acceso a `/admin/`. |

Para hacer moderador a un usuario: `/admin/` → **Usuarios** → elegir usuario →
en **Grupos** agregar *Moderador* → Guardar.

---

## 7. Seguridad

| Medida | Implementación |
|---|---|
| Contraseñas | Hash PBKDF2 de Django y 4 validadores (longitud, similitud, comunes, numéricas). |
| Verificación de correo | Obligatoria en producción (`ACCOUNT_EMAIL_VERIFICATION=mandatory`). |
| **2FA** | `allauth.mfa`: app autenticadora (TOTP) y 10 códigos de recuperación. El login de `/admin/` también pasa por allauth, así que también exige el 2FA. |
| Límite de intentos | 5 inicios de sesión fallidos cada 5 min; 5 registros y 5 recuperaciones por hora por IP. |
| **Control de sesión** | Expira tras 30 min de inactividad (`SESSION_COOKIE_AGE`) y al cerrar el navegador; cookies `HttpOnly`, `SameSite=Lax` y `Secure` en producción. |
| **Roles y permisos** | Grupos de Django; las vistas usan `login_required`, `permission_required` y el decorador `requiere_2fa`. |
| **Validación de datos** | En el navegador (`required`, `minlength`, `maxlength`) y en el servidor (`aportes/views.py`); la comunidad debe existir en el catálogo. |
| CSRF | Token en todos los formularios y en el `fetch` del formulario de aportes. |
| HTTPS | En producción: redirección a HTTPS, HSTS de 1 año, cookies seguras. |
| Cabeceras | `X-Frame-Options: DENY`, `Referrer-Policy: same-origin`, `X-Content-Type-Options: nosniff`. |
| **Manejo de errores** | Páginas 403/404/500 propias, respuestas JSON con códigos HTTP correctos, captura de errores de base de datos y registro (`LOGGING`) de eventos de seguridad. |
| Secretos | Solo en variables de entorno; `.env` está en `.gitignore`; el servidor no arranca en producción sin `DJANGO_SECRET_KEY`. |

---

## 8. Variables de entorno

Copia `.env.example` como `.env` para desarrollo. En producción se configuran en
el panel del alojamiento.

| Variable | Obligatoria en producción | Valor por defecto | Descripción |
|---|---|---|---|
| `DJANGO_SECRET_KEY` | **Sí** | clave de desarrollo | Clave criptográfica de Django. |
| `DJANGO_DEBUG` | Sí (`false`) | `true` | Modo de depuración. |
| `DJANGO_ALLOWED_HOSTS` | Sí* | `localhost,127.0.0.1` | Dominios permitidos, separados por comas. |
| `CSRF_TRUSTED_ORIGINS` | Sí* | vacío | Orígenes HTTPS de confianza, ej. `https://bicsan.org`. |
| `DATABASE_URL` | Sí | SQLite local | URL de PostgreSQL: `postgres://usuario:clave@host:5432/bicsan`. |
| `ACCOUNT_EMAIL_VERIFICATION` | No | `none` en desarrollo, `mandatory` en producción | `none`, `optional` o `mandatory`. |
| `SESSION_COOKIE_AGE` | No | `1800` | Segundos de inactividad antes de cerrar la sesión. |
| `GOOGLE_CLIENT_ID` | No | vacío | ID del cliente OAuth de Google. |
| `GOOGLE_CLIENT_SECRET` | No | vacío | Secreto del cliente OAuth de Google. |
| `EMAIL_BACKEND` | Sí | consola | `django.core.mail.backends.smtp.EmailBackend` en producción. |
| `EMAIL_HOST` / `EMAIL_PORT` | Sí | — / `587` | Servidor SMTP. |
| `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` | Sí | vacío | Credenciales SMTP. |
| `EMAIL_USE_TLS` | No | `true` | Usa TLS con el servidor SMTP. |
| `DEFAULT_FROM_EMAIL` | Sí | `BICSAN <no-reply@localhost>` | Remitente de los correos. |
| `RENDER_EXTERNAL_HOSTNAME` | — | — | La define Render; se agrega sola a hosts y orígenes. |

\* En Render no hace falta si usas el dominio `*.onrender.com`.

---

## 9. Instalación local

**Requisitos:** Python 3.11 o superior y Git.

### Windows (automático)

1. Ejecuta `instalar.bat` una vez (crea `.venv`, instala dependencias y migra).
2. Ejecuta `crear-admin.bat` una vez para crear el administrador.
3. Ejecuta `iniciar.bat` para abrir el sitio en `http://127.0.0.1:8000`.

`abrir-administracion.bat` inicia el servidor y abre `/admin/`.

### Cualquier sistema (manual)

```bash
git clone https://github.com/devmatriz/Bicsan.git
cd Bicsan
python -m venv .venv
# Windows: .venv\Scripts\activate    ·    macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env            # opcional en desarrollo
python manage.py migrate        # crea tablas, catálogos y roles
python manage.py createsuperuser
python manage.py runserver
```

En desarrollo los correos (verificación, recuperación) se muestran en la consola.

**Activar el login con Google:** crea un cliente OAuth web en Google Cloud
Console con la URL de retorno `http://127.0.0.1:8000/accounts/google/login/callback/`
(en producción, la misma ruta con tu dominio HTTPS) y completa
`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.

---

## 10. Pruebas

```bash
python manage.py test aportes
```

21 pruebas cubren: páginas públicas y protegidas, creación y validación de
aportes, catálogo de comunidades, roles y permisos, asignación del rol al
registrarse, moderación con 2FA, login del admin, página 404 y configuración de
sesión.

---

## 11. Despliegue en producción

El proyecto incluye `render.yaml` (Blueprint de Render), que crea:

- Una base de datos **PostgreSQL** (`bicsan-db`).
- Un servicio web Python que ejecuta `build.sh` (instala dependencias,
  `collectstatic` y `migrate`) y arranca con
  `gunicorn bicsan.wsgi:application`.
- Comprobación de salud en `/api/salud/`.

**Pasos:**

1. Sube el repositorio a GitHub.
2. En Render: **New → Blueprint** y elige el repositorio.
3. Completa las variables marcadas `sync: false` (Google y SMTP).
4. Cuando termine el despliegue, crea el administrador desde la consola
   (**Shell**) del servicio: `python manage.py createsuperuser`.
5. Entra con ese usuario y activa el 2FA en **Mi cuenta → Verificación en dos pasos**.

**Lista de verificación**

- [ ] `DJANGO_DEBUG=false` y `DJANGO_SECRET_KEY` generada.
- [ ] `DATABASE_URL` apunta a PostgreSQL.
- [ ] SMTP configurado y `ACCOUNT_EMAIL_VERIFICATION=mandatory`.
- [ ] `python manage.py check --deploy` sin advertencias críticas.
- [ ] 2FA activo en las cuentas de administrador y moderador.

**Alternativa en un servidor Windows:**

```bash
python manage.py collectstatic --noinput
waitress-serve --listen=0.0.0.0:8000 bicsan.wsgi:application
```

---

## 12. Control de versiones

El flujo completo está en [`CONTRIBUTING.md`](CONTRIBUTING.md). En resumen:

- `main` → producción · `develop` → integración.
- Ramas de trabajo: `feature/…`, `fix/…`, `docs/…`, `chore/…`, `hotfix/…`.
- Mensajes con **Conventional Commits**: `feat(auth): agrega 2FA`.
- Todo cambio entra por **Pull Request** hacia `develop`, y de `develop` a `main`.
