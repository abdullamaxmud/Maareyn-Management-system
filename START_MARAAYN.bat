@echo off
title Maraayn Management System Launcher
echo ===================================================
echo   Starting Maraayn Management System (SaaS)
echo ===================================================
start "Maraayn Backend API (4000)" cmd /k "cd /d "%~dp0backend" && npm.cmd run start:prod"
start "Maraayn Frontend UI (5173)" cmd /k "cd /d "%~dp0frontend" && npm.cmd run dev"
timeout /t 4 >nul
start http://localhost:5173
