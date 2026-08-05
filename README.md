# BICSAN

Biblioteca Intercultural de Cosmovisiones y Saberes Ancestrales de Nicaragua.

El proyecto usa Django como servidor, SQLite como base de datos y HTML, CSS y
JavaScript para la interfaz. El formulario de la página principal
guarda los aportes en la base de datos y se administra desde `/admin/`.

Incluye cuentas con correo y contraseña, recuperación de acceso, panel personal,
protección de aportes y autenticación con Google mediante OAuth 2.0.

## Requisitos

- Python 3.11 o superior. No reutilices un entorno `.venv` creado con otra
  versión de Python.
- Windows, macOS o Linux.

## Instalación en Windows

1. Instala Python desde `python.org` y marca la opción para agregarlo al PATH.
2. Copia la carpeta completa del proyecto a la nueva computadora.
3. Ejecuta `instalar.bat` una sola vez. El instalador reconstruye `.venv` para
   evitar binarios incompatibles de una instalación anterior.
4. Ejecuta `crear-admin.bat` una sola vez y elige tu usuario y contraseña.
5. Ejecuta `iniciar.bat` cada vez que quieras iniciar el sitio. El navegador se abre automáticamente.

## Instalación manual en cualquier sistema

```bash
python -m venv .venv
```

Activa el entorno virtual:

```bash
# Windows
.venv\Scripts\activate

# macOS o Linux
source .venv/bin/activate
```

Instala y prepara la base de datos:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

El sitio queda disponible en `http://127.0.0.1:8000`.

## Panel de administración

Crea el primer usuario administrador:

```bash
python manage.py createsuperuser
```

Después entra en `http://127.0.0.1:8000/admin/`. Los aportes enviados desde el
formulario aparecen en la sección **Aportes culturales**.

También puedes ejecutar `abrir-administracion.bat`, que inicia el servidor y abre
directamente el panel administrativo.

## Cuentas de usuarios

- Registro: `http://127.0.0.1:8000/accounts/signup/`
- Inicio de sesión: `http://127.0.0.1:8000/accounts/login/`
- Mi cuenta: `http://127.0.0.1:8000/cuenta/`
- Recuperación: `http://127.0.0.1:8000/accounts/password/reset/`

Cada aporte queda relacionado con el usuario que lo envió. Las contraseñas se
guardan con el sistema seguro de hashes de Django; nunca se almacenan como texto.

### Activar el acceso con Google

1. Crea una aplicación web OAuth en Google Cloud Console.
2. Agrega esta URL de retorno para desarrollo:
   `http://127.0.0.1:8000/accounts/google/login/callback/`
3. En producción agrega la misma ruta usando el dominio público y HTTPS.
4. Copia `.env.example` como `.env` y completa `GOOGLE_CLIENT_ID` y
   `GOOGLE_CLIENT_SECRET`. En un alojamiento, usa sus variables privadas.

El botón de Google se habilita automáticamente cuando ambas variables existen.
Nunca escribas el secreto de Google directamente en los archivos del proyecto.

## Cómo funciona el backend

- Django entrega todas las páginas y recursos del sitio.
- `POST /api/aportes/` recibe y valida el formulario público.
- SQLite guarda cada aporte permanentemente en `db.sqlite3`.
- `/admin/` permite buscar aportes, marcarlos como revisados y administrar usuarios.
- `GET /api/salud/` permite comprobar que el servidor está funcionando.

La base de datos conserva la información aunque cierres o reinicies la computadora.
El servidor local funciona mientras la ventana **Servidor BICSAN** permanezca abierta.
Para mantenerlo disponible públicamente las 24 horas se debe publicar en un servicio
de alojamiento; el proyecto ya incluye Waitress y archivos estáticos preparados para ello.

## Pasar el proyecto a otra computadora

Copia todo excepto estas carpetas y archivos generados:

- `.venv/`
- `__pycache__/`
- `staticfiles/`
- `db.sqlite3`, solamente si quieres comenzar con una base vacía.

Si quieres conservar los aportes registrados, copia también `db.sqlite3`. En la
nueva computadora repite la instalación y ejecuta las migraciones.

## Configuración

Las variables disponibles están documentadas en `.env.example`:

- `DJANGO_SECRET_KEY`: clave privada para una instalación publicada.
- `DJANGO_DEBUG`: usa `false` al publicar.
- `DJANGO_ALLOWED_HOSTS`: dominios o direcciones autorizadas, separados por comas.

Para una ejecución local normal no es necesario definirlas.

## Estructura principal

```text
bicsan/             configuración y rutas del proyecto Django
aportes/            modelo, endpoint y administración de aportes
assets/             estilos, scripts, imágenes, infografías y modelos usados
*.html              páginas renderizadas por Django
manage.py           comandos de administración
requirements.txt    dependencias reproducibles
instalar.bat        instalación automática en Windows
iniciar.bat         inicio automático en Windows
crear-admin.bat     creación del usuario administrador
```

## Publicación

Para recopilar los archivos estáticos y ejecutar con Waitress:

```bash
python manage.py collectstatic --noinput
waitress-serve --listen=0.0.0.0:8000 bicsan.wsgi:application
```

Antes de publicar configura una clave privada, desactiva el modo de depuración y
define los hosts permitidos.

Para un registro público profesional configura también un servidor SMTP y deja
`ACCOUNT_EMAIL_VERIFICATION=mandatory`. Así cada nuevo usuario debe verificar su
correo y puede recuperar su contraseña de forma segura.
