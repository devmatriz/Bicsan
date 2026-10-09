# Despliegue en Azure con Docker

Guía para publicar BICSAN en una máquina virtual Ubuntu de Azure. La aplicación,
la base de datos y el proxy inverso corren en contenedores aislados.

```
Internet ──443/80──▶ Nginx (contenedor) ──red "publica"──▶ Django + Gunicorn (contenedor)
                       │                                         │
                       └─ /assets/ (volumen, gzip)                └─red "interna"──▶ PostgreSQL (contenedor)
```

- Solo **Nginx** publica puertos (80 y 443). Gunicorn (8000) y PostgreSQL (5432)
  no son accesibles desde internet.
- La red `interna` está marcada `internal: true`: PostgreSQL no tiene salida a internet.
- La aplicación corre dentro del contenedor con el usuario `bicsan`, sin privilegios.
- Los secretos viven en `.env` en el servidor; el archivo está en `.gitignore` y
  `.dockerignore`, así que nunca entra al repositorio ni a la imagen.

| Archivo | Función |
|---|---|
| `Dockerfile` | Imagen de la app en dos etapas, usuario no root, Gunicorn. |
| `docker/entrypoint.sh` | `collectstatic` (con compresión gzip) y `migrate` al arrancar. |
| `docker-compose.yml` | Servicios `db`, `web` y `nginx`, redes, volúmenes, healthchecks y rotación de logs. |
| `docker/nginx/bicsan.conf.template` | Proxy inverso, HTTPS, cabeceras de seguridad, gzip y caché de estáticos. |
| `docker/monitoreo.sh` | Estado de contenedores, CPU/RAM, disco, salud de la app y errores recientes. |

---

## 1. Crear la máquina virtual

| Campo | Valor |
|---|---|
| Imagen | Ubuntu Server 24.04 LTS |
| Tamaño | `B2ats_v2` (2 vCPU, 1 GiB) |
| Autenticación | Clave pública SSH (sin contraseña) |
| Usuario | `azureuser` (usuario estándar, no `root`) |
| Puertos de entrada | 22, 80, 443 |
| Disco | SSD estándar, 64 GiB o menos |

En **IP pública → Configuración → Etiqueta de nombre DNS** asigna un nombre, por ejemplo
`bicsan`, para obtener `bicsan.mexicocentral.cloudapp.azure.com`.

En **Redes → Configuración de red** restringe el puerto 22 a tu IP
(**Origen: Mi dirección IP**) para que nadie más pueda intentar entrar por SSH.

## 2. Conectarse por SSH (Windows)

```powershell
icacls "$env:USERPROFILE\Downloads\bicsan_key.pem" /inheritance:r /grant:r "$($env:USERNAME):R"
ssh -i "$env:USERPROFILE\Downloads\bicsan_key.pem" azureuser@bicsan.mexicocentral.cloudapp.azure.com
```

## 3. Asegurar el servidor

Todo se administra con `azureuser` usando `sudo` puntualmente; nunca se inicia sesión como `root`.

```bash
# Actualizaciones del sistema y parches de seguridad automáticos
sudo apt update && sudo apt upgrade -y
sudo apt install -y unattended-upgrades fail2ban
sudo dpkg-reconfigure -f noninteractive unattended-upgrades

# SSH: sin login de root y solo con clave
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/; s/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Cortafuegos del sistema (además del grupo de seguridad de Azure)
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Memoria de intercambio: la VM tiene 1 GiB de RAM
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

> Si antes instalaste Nginx o PostgreSQL directamente en el servidor, desactívalos
> para liberar los puertos: `sudo systemctl disable --now nginx postgresql`.

## 4. Instalar Docker

```bash
sudo apt install -y docker.io docker-compose-v2 git certbot
sudo usermod -aG docker azureuser
exit   # vuelve a conectarte por SSH para que el grupo se aplique
```

Comprueba con `docker compose version`.

## 5. Descargar el proyecto y configurar las variables ocultas

```bash
git clone https://github.com/devmatriz/Bicsan.git && cd Bicsan
cp .env.example .env
chmod 600 .env
nano .env
```

Valores mínimos en `.env`:

```env
DJANGO_SECRET_KEY=<python3 -c "import secrets; print(secrets.token_urlsafe(50))">
DJANGO_ALLOWED_HOSTS=bicsan.mexicocentral.cloudapp.azure.com
CSRF_TRUSTED_ORIGINS=https://bicsan.mexicocentral.cloudapp.azure.com
CORS_ALLOWED_ORIGINS=
DOMINIO=bicsan.mexicocentral.cloudapp.azure.com
POSTGRES_DB=bicsan
POSTGRES_USER=bicsan
POSTGRES_PASSWORD=<solo letras y números>
# + GOOGLE_* y EMAIL_* de producción
```

`DATABASE_URL` y `DJANGO_DEBUG=false` los define `docker-compose.yml`; no hace falta escribirlos.

## 6. Certificado HTTPS (Let's Encrypt)

Con los contenedores aún apagados (el puerto 80 debe estar libre):

```bash
sudo certbot certonly --standalone -d bicsan.mexicocentral.cloudapp.azure.com \
  --pre-hook  "docker compose -f /home/azureuser/Bicsan/docker-compose.yml stop nginx" \
  --post-hook "docker compose -f /home/azureuser/Bicsan/docker-compose.yml start nginx"
```

Certbot guarda los *hooks* y renueva solo el certificado cada 60 días
(compruébalo con `sudo certbot renew --dry-run`).

## 7. Levantar los contenedores

```bash
docker compose up -d --build
docker compose ps                     # los tres servicios deben quedar "healthy"
docker compose exec web python manage.py createsuperuser
```

Abre `https://bicsan.mexicocentral.cloudapp.azure.com` y activa el 2FA del administrador.

## 8. Monitoreo básico

**En el servidor**

```bash
chmod +x docker/monitoreo.sh
./docker/monitoreo.sh                 # reporte completo
docker compose logs -f web            # registros en vivo
```

Revisión automática cada 5 minutos (solo escribe cuando algo falla):

```bash
crontab -e
# agrega:
*/5 * * * * /home/azureuser/Bicsan/docker/monitoreo.sh --alerta >> /home/azureuser/bicsan-monitoreo.log 2>&1
```

Además, Docker reinicia solo cualquier contenedor que se caiga (`restart: unless-stopped`),
cada servicio tiene *healthcheck* y los logs rotan (10 MB × 3 archivos).

**En el portal de Azure**

1. VM → **Supervisión → Métricas**: CPU, red y disco.
2. VM → **Alertas → Crear regla de alerta**: *Porcentaje de CPU* > 80 % durante 5 minutos,
   con un grupo de acciones que te envíe un correo.
3. VM → **Diagnósticos de arranque**: activado (permite ver la consola si la VM no responde).

## 9. Actualizar la aplicación

Después de cada versión publicada en `main`:

```bash
cd ~/Bicsan
git pull
docker compose up -d --build
docker image prune -f
```

## 10. Respaldo de la base de datos

```bash
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > ~/respaldo-$(date +%F).sql.gz
```

---

## Evidencia por entregable

| Entregable | Dónde se cumple | Cómo demostrarlo |
|---|---|---|
| 1. Compilación final | Imagen multi-etapa sin archivos de desarrollo (`.dockerignore`); estáticos comprimidos con gzip (WhiteNoise + `gzip_static`), caché de 30 días, gzip en HTML/JSON, HTTP/2. | `curl -sI -H "Accept-Encoding: gzip" https://DOMINIO/assets/css/styles.css` muestra `Content-Encoding: gzip`; Lighthouse en Chrome. |
| 2. Servidor seguro | Usuario `azureuser` con clave SSH, `root` sin acceso, UFW, fail2ban, parches automáticos; app con usuario `bicsan` dentro del contenedor; monitoreo con `monitoreo.sh`, cron y alertas de Azure. | `whoami`, `sudo ufw status`, `docker compose exec web whoami`, captura de la alerta en Azure. |
| 3. Proxy inverso | Nginx es el único servicio con puertos publicados; Gunicorn solo escucha en la red de Docker. | `docker compose ps` (solo nginx muestra `0.0.0.0:80/443`); `curl http://DOMINIO:8000` falla. |
| 4. Contenedores | `db`, `web` y `nginx` en contenedores; red `interna` sin internet para la base; volúmenes para datos. | `docker compose ps`, `docker network inspect bicsan_interna`. |
| 5. Conexión y CORS | Secretos solo en `.env` del servidor (`chmod 600`); `DATABASE_URL` construida en Compose; CORS limitado a `/api/` y a los orígenes de `CORS_ALLOWED_ORIGINS`. | `curl -sI -H "Origin: https://sitio-ajeno.com" https://DOMINIO/api/salud/` no devuelve `Access-Control-Allow-Origin`. |
