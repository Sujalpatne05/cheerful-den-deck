@echo off
echo ========================================
echo Room Management - Database Setup
echo ========================================
echo.

echo This will attempt to create and initialize the database.
echo.
set /p password="Enter your PostgreSQL password (or press Enter to skip): "

if "%password%"=="" (
    echo.
    echo No password provided. Please use one of these methods:
    echo 1. Open pgAdmin and run the database_setup.sql file
    echo 2. Follow the MANUAL_DB_SETUP.md guide
    echo 3. Run this script again with your password
    echo.
    pause
    exit
)

echo.
echo Creating database...
set PGPASSWORD=%password%
psql -U postgres -c "CREATE DATABASE room_management;"

if %errorlevel% neq 0 (
    echo.
    echo Failed to create database. Password might be incorrect.
    echo Please check MANUAL_DB_SETUP.md or POSTGRES_PASSWORD_RESET.md
    echo.
    pause
    exit
)

echo.
echo Initializing database schema...
psql -U postgres -d room_management -f database_setup.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ SUCCESS! Database initialized!
    echo ========================================
    echo.
    echo Default login credentials:
    echo Email: admin@hotel.com
    echo Password: admin123
    echo.
    echo Now update backend\.env with:
    echo DB_PASSWORD=%password%
    echo.
    echo Then restart your backend server.
    echo.
) else (
    echo.
    echo Failed to initialize database.
    echo Please follow MANUAL_DB_SETUP.md guide.
    echo.
)

pause
