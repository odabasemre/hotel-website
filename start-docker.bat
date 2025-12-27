@echo off
echo =======================================
echo    Hotel Website - Docker Baslatici
echo =======================================
echo.

REM Docker calisiyormu kontrol et
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo HATA: Docker yuklu degil veya calismiyor!
    echo Lutfen Docker Desktop'i yukleyin ve calistirin.
    pause
    exit /b 1
)

echo Docker bulundu, servisler baslatiliyor...
echo.

REM Servisleri baslat
docker-compose up -d --build

if %errorlevel% neq 0 (
    echo HATA: Docker servisleri baslatilamadi!
    pause
    exit /b 1
)

echo.
echo =======================================
echo    Servisler basariyla baslatildi!
echo =======================================
echo.
echo Frontend: http://localhost
echo API:      http://localhost:5000/api/health
echo Admin:    http://localhost/admin
echo.
echo Admin Giris:
echo   Kullanici: admin
echo   Sifre: admin123
echo.
echo Durdurmak icin: docker-compose down
echo =======================================
pause
