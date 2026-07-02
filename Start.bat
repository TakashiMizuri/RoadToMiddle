@echo off
setlocal EnableExtensions
title Road to Middle

cd /d "%~dp0"

echo.
echo  ========================================
echo   Road to Middle - starting app
echo  ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js not found. Install LTS from https://nodejs.org
  goto fail
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm not found. Reinstall Node.js
  goto fail
)

if not exist "node_modules\" (
  echo [1/2] Installing root dependencies...
  call npm install
  if errorlevel 1 goto fail
)

if not exist "app\node_modules\" (
  echo [2/2] Installing app dependencies...
  pushd app
  call npm install
  if errorlevel 1 (
    popd
    goto fail
  )
  popd
)

echo.
echo Starting desktop app ^(Electron^)...
echo Close this window to stop the app.
echo.

pushd app
call npm run desktop:dev
popd

echo.
echo App closed.
pause
exit /b 0

:fail
echo.
echo Failed to start. See messages above.
pause
exit /b 1
