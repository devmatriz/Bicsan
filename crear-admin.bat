@echo off
setlocal
if not exist .venv\Scripts\python.exe (
  echo Primero ejecuta instalar.bat
  pause
  exit /b 1
)
.venv\Scripts\python.exe manage.py migrate
.venv\Scripts\python.exe manage.py createsuperuser
echo.
echo Ahora inicia BICSAN y entra en http://127.0.0.1:8000/admin/
pause
