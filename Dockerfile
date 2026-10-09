# Imagen de producción de BICSAN: Django + Gunicorn con un usuario sin privilegios.

# Etapa 1: compila las dependencias en un entorno virtual aislado.
FROM python:3.12-slim AS dependencias

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt


# Etapa 2: imagen final, solo con el entorno virtual y el código.
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

RUN groupadd --system bicsan && useradd --system --gid bicsan --home /app bicsan

WORKDIR /app
COPY --from=dependencias /opt/venv /opt/venv
COPY --chown=bicsan:bicsan . .

RUN chmod +x docker/entrypoint.sh \
    && mkdir -p /app/staticfiles \
    && chown bicsan:bicsan /app/staticfiles

USER bicsan

EXPOSE 8000

ENTRYPOINT ["docker/entrypoint.sh"]
CMD ["gunicorn", "bicsan.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "60", "--access-logfile", "-"]
