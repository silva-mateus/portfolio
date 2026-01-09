@echo off
REM Servidor local para portfólio

echo ========================================
echo   Servidor Local - Portfólio
echo ========================================
echo.

python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python encontrado
    echo.
    echo Acessivel em: http://localhost:8000
    echo Para parar: Ctrl+C
    echo.
    
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo [ERRO] Python nao encontrado
    echo.
    echo Instale Python: https://python.org
    echo Ou use: npx http-server
    echo.
    echo Abrindo arquivo direto...
    start index.html
)

pause
