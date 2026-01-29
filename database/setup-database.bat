@echo off
echo ========================================
echo CADViewer Database Setup for MariaDB
echo ========================================
echo.

REM Auto-detect MariaDB installation path
set "MYSQL_CMD=mysql"
set "MYSQL_PATH="

REM Check common MariaDB installation paths
for /d %%i in ("C:\Program Files\MariaDB *") do (
    if exist "%%i\bin\mysql.exe" (
        set "MYSQL_PATH=%%i\bin"
        goto :found
    )
)

for /d %%i in ("C:\Program Files (x86)\MariaDB *") do (
    if exist "%%i\bin\mysql.exe" (
        set "MYSQL_PATH=%%i\bin"
        goto :found
    )
)

REM Check if mysql is in PATH
where mysql >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Found mysql in system PATH
    goto :found
)

REM Not found
echo ERROR: Could not find MariaDB installation!
echo Please install MariaDB or add it to your system PATH.
echo Expected location: C:\Program Files\MariaDB x.x\bin\
pause
exit /b 1

:found
if defined MYSQL_PATH (
    echo Found MariaDB at: %MYSQL_PATH%
    set "MYSQL_CMD=%MYSQL_PATH%\mysql.exe"
)
echo.

set /p MYSQL_ROOT_PASSWORD="Enter MariaDB root password (press Enter if no password): "
echo.

echo Creating database 'vizquery_demo'...
"%MYSQL_CMD%" -u root -p%MYSQL_ROOT_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS vizquery_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create database. Please check your password and MariaDB installation.
    pause
    exit /b 1
)

echo Database created successfully!
echo.

echo Importing database schema from vizquery_demo.sql...
"%MYSQL_CMD%" -u root -p%MYSQL_ROOT_PASSWORD% vizquery_demo < "%~dp0vizquery_demo.sql"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to import schema.
    pause
    exit /b 1
)

echo Schema imported successfully!
echo.

echo Running database migrations from migrate.sql...
"%MYSQL_CMD%" -u root -p%MYSQL_ROOT_PASSWORD% vizquery_demo < "%~dp0migrate.sql"

if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Migration had some errors, but base schema is imported.
    echo This is normal if you've already run migrations before.
)

echo.
echo ========================================
echo Database setup completed successfully!
echo ========================================
echo.
echo Database: vizquery_demo
echo Tables imported: users, buildings, floors, rooms, employees, etc.
echo.
echo Next steps:
echo 1. Update CADViewer_config.json with your database credentials
echo 2. Start your Node.js application
echo.
pause
