@echo off
echo Stopping development server on port 3400...

REM Tìm và dừng process đang sử dụng port 3400
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3400 ^| findstr LISTENING') do (
    echo Found process using port 3400: PID %%a
    taskkill /F /PID %%a 2>nul
    if errorlevel 1 (
        echo Could not kill process %%a. It may already be stopped.
    ) else (
        echo Process %%a stopped successfully.
    )
)

REM Kiểm tra xem còn process nào trên port 3400 không
timeout /t 1 /nobreak >nul
netstat -ano | findstr :3400 | findstr LISTENING >nul
if errorlevel 1 (
    echo Server stopped successfully.
) else (
    echo Warning: Port 3400 may still be in use.
)

pause

