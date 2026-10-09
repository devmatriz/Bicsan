#!/bin/sh
# Monitoreo básico de BICSAN en el servidor.
# Uso manual:  ./docker/monitoreo.sh
# Uso en cron: */5 * * * * /home/azureuser/Bicsan/docker/monitoreo.sh --alerta >> /home/azureuser/bicsan-monitoreo.log 2>&1
cd "$(dirname "$0")/.." || exit 1

DOMINIO=$(grep -E '^DOMINIO=' .env | cut -d= -f2-)
FECHA=$(date '+%Y-%m-%d %H:%M:%S')

if [ "$1" = "--alerta" ]; then
    # Modo silencioso: solo escribe cuando algo falla.
    problemas=$(docker compose ps --format '{{.Service}} {{.State}} {{.Health}}' | grep -v -E 'running healthy$|running $')
    codigo=$(curl -s -o /dev/null -w '%{http_code}' "https://$DOMINIO/api/salud/")
    disco=$(df --output=pcent / | tail -1 | tr -dc '0-9')
    [ -n "$problemas" ] && echo "$FECHA CONTENEDORES: $problemas"
    [ "$codigo" != "200" ] && echo "$FECHA SALUD: /api/salud/ respondió $codigo"
    [ "$disco" -ge 85 ] && echo "$FECHA DISCO: ${disco}% usado"
    exit 0
fi

echo "== Contenedores ($FECHA) =="
docker compose ps --format 'table {{.Service}}\t{{.State}}\t{{.Health}}\t{{.Status}}'

echo
echo "== Consumo de CPU y memoria =="
docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}'

echo
echo "== Servidor =="
uptime
free -h | head -2
df -h / | tail -1

echo
echo "== Salud de la aplicación =="
curl -s -o /dev/null -w "https://$DOMINIO/api/salud/ -> HTTP %{http_code} en %{time_total}s\n" "https://$DOMINIO/api/salud/"

echo
echo "== Últimos errores de la aplicación =="
docker compose logs --since 1h web 2>&1 | grep -E 'ERROR|CRITICAL|Traceback' | tail -10 || true
