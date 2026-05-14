@echo off
REM Simple HTTP Server Launcher for WebGIS NDMI
REM This script uses Python's built-in HTTP server

echo ========================================
echo WebGIS NDMI - Local Server Launcher
echo ========================================
echo.

REM Check if Python 3 is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    REM Check if Python 2 is available
    python -m SimpleHTTPServer 8000
)

pause