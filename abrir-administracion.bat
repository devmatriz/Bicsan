@echo off
call iniciar.bat
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8000/admin/"
