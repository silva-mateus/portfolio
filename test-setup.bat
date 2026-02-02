@echo off
echo ================================================
echo Coffee Machine Debug - Quick Test
echo ================================================
echo.

echo [1/3] Checking .NET SDK installation...
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] .NET SDK not found!
    echo Please install .NET 8 SDK or higher
    pause
    exit /b 1
)
echo [OK] .NET SDK found

echo.
echo [2/3] Checking required files...

if not exist "js\coffee-machine-debug.js" (
    echo [ERROR] js\coffee-machine-debug.js not found!
    pause
    exit /b 1
)
echo [OK] coffee-machine-debug.js found

if not exist "ApiServer\ApiServer.csproj" (
    echo [ERROR] ApiServer\ApiServer.csproj not found!
    pause
    exit /b 1
)
echo [OK] ApiServer project found

echo.
echo [3/3] Checking data directory...
if not exist "data" mkdir data
if not exist "data\highscores.csv" (
    echo rank,name,score,time,filesRead,commandsUsed,date > data\highscores.csv
)
echo [OK] data directory ready

echo.
echo ================================================
echo All checks passed! ✓
echo ================================================
echo.
echo To start playing:
echo   1. Run: start-api-server.bat
echo   2. Run: start-server.bat
echo   3. Open browser and type 'play' in terminal
echo.
echo Press any key to exit...
pause >nul


