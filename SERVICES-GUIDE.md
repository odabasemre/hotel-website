# Services Management Guide

Bu kılavuz, otel web sitesindeki hizmetleri (services) nasıl yöneteceğinizi açıklar.

## Mevcut Sistem Yapısı

### Dosya Konumları
- **Services Data**: `src/data/servicesData.js` - Ana servis verileri
- **Services Component**: `src/components/home/Services.jsx` - Görüntülenme bileşeni
- **Çeviriler**: 
  - Türkçe: `public/locales/tr/translation.json`
  - İngilizce: `public/locales/en/translation.json`

## Yeni Servis Ekleme

### 1. Services Data'ya Ekleme (`src/data/servicesData.js`)

```javascript
// Yeni bir servis eklemek için:
{
    key: 'yeniServis',              // Çeviri anahtarı
    icon: serviceIcons.yeniIcon(),  // Icon komponenti
    category: 'facilities',         // Kategori (accommodation, comfort, facilities, services)
    featured: false,                // Ana sayfada öne çıkacak mı?
    priority: 25,                   // Sıralama (düşük numara = önce)
    disabled: false                 // false = aktif, true = gizli
}
```

### 2. Icon Ekleme

`serviceIcons` nesnesine yeni icon ekleyin:

```javascript
yeniIcon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* SVG path buraya */}
    </svg>
)
```

### 3. Çevirileri Ekleme

**Türkçe** (`public/locales/tr/translation.json`):
```json
"services": {
    "yeniServis": {
        "title": "Servis Başlığı",
        "description": "Servis açıklaması"
    }
}
```

**İngilizce** (`public/locales/en/translation.json`):
```json
"services": {
    "yeniServis": {
        "title": "Service Title",
        "description": "Service description"
    }
}
```

## Mevcut Servisler

### Aktif Servisler (disabled: false)
- `riverView` - Nehir Manzarası
- `balcony` - Özel Balkon
- `kitchen` - Tam Donanımlı Mutfak
- `fireplace` - Şömine
- `wifi` - Yüksek Hızlı WiFi
- `tv` - Akıllı TV
- `hairdryer` - Saç Kurutma Makinesi
- `towels` - Havlu ve Çarşaf
- `parking` - Ücretsiz Otopark
- `bar` - İçecek Barı
- `reception` - 7/24 Resepsiyon
- `insulation` - Ses & Isı Yalıtımı

### Hazır Ama Deaktif Servisler (disabled: true)
Bunları aktif etmek için `disabled: false` yapın:

- `spa` - Spa & Wellness
- `pool` - Yüzme Havuzu
- `gym` - Fitness Salonu
- `restaurant` - Restoran
- `laundry` - Çamaşırhane
- `minibar` - Minibar
- `security` - Güvenlik
- `concierge` - Concierge
- `transport` - Ulaşım
- `breakfast` - Kahvaltı
- `airConditioning` - Klima
- `petFriendly` - Evcil Hayvan Dostu

## Servis Kategorileri

- **accommodation** (Konaklama) - Mavi (#2563eb)
- **comfort** (Konfor) - Yeşil (#16a34a)
- **facilities** (Tesisler) - Kırmızı (#dc2626)
- **services** (Hizmetler) - Sarı (#ca8a04)

## Hızlı Aktivasyon

Örnek: Spa'yı aktif etmek için:

1. `src/data/servicesData.js`'de spa objesinden `disabled: true` satırını silin
2. Sayfa otomatik güncellenecek

## Yardımcı Fonksiyonlar

- `getAllActiveServices()` - Tüm aktif servisleri getirir
- `getFeaturedServices()` - Öne çıkan servisleri getirir
- `getServicesByCategory(category)` - Kategoriye göre servisleri getirir

## Layout Seçenekleri

Services component'inde iki farklı görünüm modu var:

1. **Grid Mode** (şu an aktif) - Tüm servisler tek grid'de
2. **Category Mode** (yorum satırında) - Kategorilere göre gruplu görünüm

Category mode'u aktif etmek için `Services.jsx`'deki yorum satırlarını kaldırın ve grid mode'u yoruma alın.