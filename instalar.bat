@echo off
setlocal
where py >nul 2>nul
if errorlevel 1 (
  echo Python no esta instalado. Instala Python 3.11 o superior desde python.org.
  exit /b 1
)
echo Preparando un entorno virtual limpio...
py -m venv --clear .venv
if errorlevel 1 exit /b 1
call .venv\Scripts\activate.bat
if errorlevel 1 exit /b 1
python -m pip install --upgrade pip
if errorlevel 1 exit /b 1
python -m pip install -r requirements.txt
if errorlevel 1 exit /b 1
python -m pip check
if errorlevel 1 exit /b 1
python manage.py migrate
if errorlevel 1 exit /b 1
echo.
echo Instalacion terminada. Ejecuta iniciar.bat para abrir el sitio.
