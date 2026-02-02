@echo off
echo ======================================
echo Coffee Machine Debug - API Server
echo ======================================
echo.

REM Check if .NET SDK is installed
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: .NET SDK is not installed or not in PATH
    echo Please install .NET 8 SDK or higher
    pause
    exit /b 1
)

REM Start server
echo.
echo Starting API server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
set ASPNETCORE_URLS=http://localhost:5000
dotnet run --project ApiServer\ApiServer.csproj

pause


