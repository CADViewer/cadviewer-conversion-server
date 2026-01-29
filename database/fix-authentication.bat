@echo off
echo ========================================
echo Fix MariaDB Authentication for Node.js
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

echo Fixing authentication plugin for root user...
echo.

"%MYSQL_CMD%" -u root -p%MYSQL_ROOT_PASSWORD% -e "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('%MYSQL_ROOT_PASSWORD%');"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to change authentication plugin.
    echo Trying alternative method...
    echo.
    "%MYSQL_CMD%" -u root -p%MYSQL_ROOT_PASSWORD% -e "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('%MYSQL_ROOT_PASSWORD%'); FLUSH PRIVILEGES;"
)

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Could not fix authentication. Please check your password.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Authentication fixed successfully!
echo ========================================
echo.
echo Root user now uses mysql_native_password plugin
echo Your Node.js application should now connect properly
echo.
echo IMPORTANT: Make sure your CADViewer_config.json has:
echo   "mysqlPassword": "%MYSQL_ROOT_PASSWORD%"
echo.
pause
