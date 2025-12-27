@echo off
echo Docker servisleri durduruluyor...
docker-compose down
echo.
echo Servisler durduruldu.
echo.
echo NOT: Veriler korundu. Tamamen silmek icin:
echo docker-compose down -v
pause
