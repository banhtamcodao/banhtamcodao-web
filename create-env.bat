@echo off
echo Creating .env file from template...

if exist .env (
    echo File .env already exists!
    echo.
    set /p overwrite="Do you want to overwrite it? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo Cancelled.
        pause
        exit /b
    )
)

copy env.template .env >nul 2>&1
if errorlevel 1 (
    echo Error: Could not create .env file.
    pause
    exit /b 1
)

echo.
echo .env file created successfully!
echo.
echo IMPORTANT: Please edit .env file and replace the placeholder values with your actual Supabase credentials:
echo   - VITE_SUPABASE_URL: Your Supabase project URL
echo   - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous key
echo.
echo You can find these values in Supabase Dashboard -> Settings -> API
echo.
pause

