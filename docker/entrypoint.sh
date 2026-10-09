#!/bin/sh
# Prepara la aplicación antes de arrancar Gunicorn.
set -e

# Copia y comprime (gzip) los archivos estáticos al volumen que comparte con Nginx.
python manage.py collectstatic --noinput

# Aplica las migraciones pendientes. La base ya está lista: Compose espera su healthcheck.
python manage.py migrate --noinput

exec "$@"
