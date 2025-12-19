# 📸 Fotoğraf Yükleme Rehberi

Bu dosya, web sitenize kendi fotoğraflarınızı nasıl ekleyeceğinizi gösterir.

---

## 📁 Klasör Yapısı

```
public/images/
├── hero/           # Ana sayfa arka plan görseli
├── services/       # Hizmetler bölümü görselleri
├── room/           # Oda görselleri
├── about/          # Hakkımızda bölümü görselleri
└── gallery/        # Galeri görselleri
```

---

## 🖼️ Hangi Fotoğrafı Nereye Koymalısınız?

### 1. Hero (Ana Sayfa Arka Planı)
**Konum:** `public/images/hero/`

| Dosya Adı | Açıklama | Önerilen Boyut |
|-----------|----------|----------------|
| `hero-background.jpg` | Ana sayfa büyük arka plan görseli (dağ manzarası, otel dış cephe) | 1920x1080px |

**Nasıl kullanılır:**
- Otel dış cephesi veya manzara fotoğrafı
- Yatay (landscape) oryantasyon
- Yüksek kalite, dramatik görünüm

---

### 2. Services (Hizmetler Bölümü)
**Konum:** `public/images/services/`

| Dosya Adı | Açıklama | Önerilen Boyut |
|-----------|----------|----------------|
| `service-1.jpg` | Sol taraf görseli (havuz, spa vb.) | 800x600px |
| `service-2.jpg` | Sağ taraf görseli (oda, lobi vb.) | 800x600px |

**Nasıl kullanılır:**
- Otel olanaklarını gösteren fotoğraflar
- Havuz, spa, restaurant, lobi gibi alanlar

---

### 3. Room (Oda Tanıtımı)
**Konum:** `public/images/room/`

| Dosya Adı | Açıklama | Önerilen Boyut |
|-----------|----------|----------------|
| `room-main.jpg` | Ana oda görseli | 1000x700px |

**Nasıl kullanılır:**
- En güzel odanızın fotoğrafı
- Yatak, mobilya ve dekorasyonu net göstermeli
- Temiz, düzenli, profesyonel çekim

---

### 4. About (Hakkımızda)
**Konum:** `public/images/about/`

| Dosya Adı | Açıklama | Önerilen Boyut |
|-----------|----------|----------------|
| `about-1.jpg` | Büyük dikey görsel (otel dış cephe) | 800x1000px |
| `about-2.jpg` | Küçük görsel (lobi, resepsiyon) | 600x400px |

**Nasıl kullanılır:**
- Otel binası dış görünüm
- Lobi, resepsiyon alanı
- Dikey (portrait) ve yatay (landscape) karışımı

---

### 5. Gallery (Galeri)
**Konum:** `public/images/gallery/`

| Dosya Adı | Açıklama | Önerilen Boyut |
|-----------|----------|----------------|
| `gallery-1.jpg` | Büyük öne çıkan görsel (lobi/ana alan) | 1200x800px |
| `gallery-2.jpg` | Yatak odası | 800x600px |
| `gallery-3.jpg` | Restaurant/yemek alanı | 800x600px |
| `gallery-4.jpg` | Havuz | 800x600px |
| `gallery-5.jpg` | Dış cephe/manzara | 800x600px |
| `gallery-6.jpg` | Spa/wellness | 800x600px |

**Nasıl kullanılır:**
- Otelin farklı alanlarını gösteren çeşitli fotoğraflar
- En az 6 adet fotoğraf
- Yüksek kalite, iyi ışıklandırma

---

## 📋 Fotoğraf Gereksinimleri

### ✅ Önerilen Özellikler:
- **Format:** JPG veya PNG
- **Kalite:** Yüksek çözünürlük (minimum 1920px genişlik hero için)
- **Dosya Boyutu:** Her fotoğraf max 2MB (web için optimize edilmiş)
- **Oryantasyon:** Çoğunlukla yatay (landscape)
- **Işık:** İyi ışıklandırılmış, net fotoğraflar
- **İçerik:** Temiz, düzenli, profesyonel görünüm

### ❌ Kaçınılması Gerekenler:
- Bulanık veya düşük kaliteli fotoğraflar
- Çok karanlık veya aşırı parlak görüntüler
- Kişisel eşyalar veya dağınıklık
- Çok büyük dosya boyutları (yavaş yükleme)

---

## 🚀 Fotoğrafları Ekledikten Sonra

Fotoğraflarınızı ilgili klasörlere koyduktan sonra, aşağıdaki dosyaları düzenleyerek fotoğraf yollarını güncelleyin:

1. **Hero:** `src/components/home/Hero.jsx`
2. **Services:** `src/components/home/Services.jsx`
3. **Room:** `src/components/home/RoomShowcase.jsx`
4. **About:** `src/components/home/About.jsx`
5. **Gallery:** `src/components/home/Gallery.jsx`

Örnek:
```javascript
// Eski (Unsplash URL)
src="https://images.unsplash.com/photo-..."

// Yeni (Kendi fotoğrafınız)
src="/images/hero/hero-background.jpg"
```

---

## 💡 İpuçları

1. **Tutarlılık:** Tüm fotoğrafların benzer bir stil ve kalitede olmasına dikkat edin
2. **Optimizasyon:** Büyük fotoğrafları yüklemeden önce [TinyPNG](https://tinypng.com) gibi araçlarla sıkıştırın
3. **Yedekleme:** Orijinal fotoğraflarınızın yedeğini başka bir yerde saklayın
4. **Test:** Fotoğrafları ekledikten sonra web sitesini kontrol edin

---

## 📞 Yardım

Fotoğraf ekleme konusunda sorun yaşarsanız:
1. Dosya adlarının doğru olduğundan emin olun
2. Dosya formatının JPG veya PNG olduğunu kontrol edin
3. Tarayıcıyı yenileyin (Cmd + Shift + R)
