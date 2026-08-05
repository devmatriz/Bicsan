@echo off
setlocal
if not exist .venv\Scripts\python.exe (
  echo Primero ejecuta instalar.bat
  pause
  exit /b 1
)
.venv\Scripts\python.exe manage.py migrate
if errorlevel 1 (
  echo No fue posible preparar la base de datos.
  pause
  exit /b 1
)
start "Servidor BICSAN" ".venv\Scripts\python.exe" manage.py runserver 127.0.0.1:8000
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:8000"
echo BICSAN esta funcionando en http://127.0.0.1:8000
echo Para detenerlo, cierra la ventana llamada Servidor BICSAN.
