# Hotel Website - Docker Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Docker Desktop (Windows/Mac) veya Docker Engine (Linux)
- Docker Compose

### Kurulum

1. **Projeyi başlatın:**
```bash
docker-compose up -d
```

2. **Tarayıcıda açın:**
- Frontend: http://localhost
- API: http://localhost:5000/api/health

3. **Admin girişi:**
- URL: http://localhost/admin
- Kullanıcı: admin
- Şifre: admin123 (ilk girişte değiştirin!)

## 📁 Proje Yapısı

```
hotel-website/
├── docker-compose.yml      # Docker servisleri
├── Dockerfile              # Frontend build
├── nginx.conf              # Nginx konfigürasyonu
├── server/
│   ├── Dockerfile          # Backend build
│   ├── package.json
│   ├── src/
│   │   ├── index.js        # Express server
│   │   ├── database/
│   │   │   ├── db.js       # PostgreSQL bağlantısı
│   │   │   └── migrate.js  # Migration script
│   │   └── routes/
│   │       ├── settings.js # Ayarlar API
│   │       ├── bookings.js # Rezervasyon API
│   │       ├── upload.js   # Dosya yükleme API
│   │       └── auth.js     # Kimlik doğrulama
│   └── database/
│       └── init.sql        # Veritabanı şeması
├── src/                    # React frontend
└── public/                 # Statik dosyalar
```

## 🐳 Docker Komutları

### Servisleri başlat
```bash
docker-compose up -d
```

### Servisleri durdur
```bash
docker-compose down
```

### Logları görüntüle
```bash
# Tüm servisler
docker-compose logs -f

# Sadece backend
docker-compose logs -f backend

# Sadece postgres
docker-compose logs -f postgres
```

### Rebuild (kod değişikliklerinden sonra)
```bash
docker-compose up -d --build
```

### Veritabanını sıfırla (DİKKAT: Tüm veriler silinir!)
```bash
docker-compose down -v
docker-compose up -d
```

## 💾 Kalıcı Veri

Aşağıdaki veriler Docker volume'lerinde saklanır ve container silinse bile korunur:

- **postgres_data**: Veritabanı verileri (rezervasyonlar, ayarlar, vb.)
- **uploads_data**: Yüklenen fotoğraflar

### Backup alma
```bash
# Veritabanı backup
docker exec hotel_postgres pg_dump -U hotel_user hotel_db > backup.sql

# Uploads backup
docker cp hotel_backend:/app/uploads ./uploads_backup
```

### Backup geri yükleme
```bash
# Veritabanı
docker exec -i hotel_postgres psql -U hotel_user hotel_db < backup.sql

# Uploads
docker cp ./uploads_backup/. hotel_backend:/app/uploads
```

## 🖼️ Fotoğraf Yükleme

Fotoğraflar artık sunucu yeniden başlatıldığında kaybolmaz:

1. Admin panelinden fotoğraf yükleyin
2. Fotoğraflar `/app/uploads` klasörüne kaydedilir
3. Bu klasör Docker volume ile kalıcı hale getirilmiştir

### Fotoğraf kategorileri:
- `hero/` - Ana sayfa arka plan
- `services/` - Hizmetler bölümü
- `rooms/` - Oda fotoğrafları
- `about/` - Hakkımızda bölümü
- `gallery/` - Galeri fotoğrafları

## 🔧 Konfigürasyon

### Ortam Değişkenleri

`docker-compose.yml` içinde değiştirebileceğiniz ayarlar:

```yaml
environment:
  # Veritabanı
  POSTGRES_DB: hotel_db
  POSTGRES_USER: hotel_user
  POSTGRES_PASSWORD: hotel_secure_password_2024  # Değiştirin!
  
  # Backend
  JWT_SECRET: your-super-secret-jwt-key  # Değiştirin!
```

### Port Değiştirme

Frontend'i farklı bir portta çalıştırmak için:
```yaml
frontend:
  ports:
    - "8080:80"  # localhost:8080'den erişim
```

## 🐛 Sorun Giderme

### Container başlamıyor
```bash
# Logları kontrol et
docker-compose logs backend

# PostgreSQL hazır mı?
docker-compose logs postgres
```

### Veritabanı bağlantı hatası
```bash
# PostgreSQL container'ını yeniden başlat
docker-compose restart postgres

# Bekle ve backend'i yeniden başlat
docker-compose restart backend
```

### Fotoğraflar görünmüyor
```bash
# Uploads volume'unu kontrol et
docker exec hotel_backend ls -la /app/uploads

# Nginx cache'i temizle
docker-compose restart frontend
```

## 🌐 Production Dağıtımı

1. Güçlü şifreler belirleyin
2. HTTPS ayarlayın (Let's Encrypt)
3. Domain yapılandırması yapın
4. Firewall kurallarını ayarlayın

### HTTPS için Nginx güncellemesi (örnek):
```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;
    ...
}
```

## 📞 Destek

Sorunlarınız için issue açabilirsiniz.
