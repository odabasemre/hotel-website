---
description: World-class React project folder structure and organization
---

# 🏗️ Dünya Standartlarında React Proje Yapısı

## Önerilen Klasör Yapısı

```
src/
├── assets/                    # Statik dosyalar (resimler, fontlar, ikonlar)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                # Yeniden kullanılabilir UI bileşenleri
│   ├── common/                # Tüm projede kullanılan ortak bileşenler
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   └── index.js           # Barrel export
│   │
│   ├── layout/                # Sayfa düzeni bileşenleri
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── index.js
│   │
│   └── features/              # Özelliğe özel bileşenler
│       ├── home/
│       ├── admin/
│       ├── booking/
│       └── gallery/
│
├── pages/                     # Sayfa bileşenleri (route seviyesi)
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── Admin/
│   ├── RoomDetail/
│   └── index.js
│
├── hooks/                     # Özel React hook'ları
│   ├── useAuth.js
│   ├── useApi.js
│   └── index.js
│
├── services/                  # API ve dış hizmet entegrasyonları
│   ├── api/
│   │   ├── axios.js
│   │   └── endpoints.js
│   ├── adminSettings.js
│   └── index.js
│
├── store/                     # State yönetimi (Context, Redux, Zustand)
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BookingContext.jsx
│   └── index.js
│
├── utils/                     # Yardımcı fonksiyonlar
│   ├── formatters.js
│   ├── validators.js
│   ├── constants.js
│   └── index.js
│
├── config/                    # Uygulama yapılandırması
│   ├── images.js
│   ├── routes.js
│   └── index.js
│
├── data/                      # Statik veri dosyaları
│   ├── galleryData.js
│   ├── roomsData.js
│   └── index.js
│
├── styles/                    # Global stiller
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── themes/
│   │   ├── light.css
│   │   └── dark.css
│   └── index.css
│
├── i18n/                      # Çoklu dil desteği
│   └── index.js
│
├── App.jsx
└── main.jsx
```

## Dosya Adlandırma Kuralları

1. **Bileşenler**: PascalCase (`Header.jsx`, `RoomCard.jsx`)
2. **Hook'lar**: camelCase, "use" öneki (`useAuth.js`, `useBooking.js`)
3. **Yardımcı fonksiyonlar**: camelCase (`formatDate.js`, `validators.js`)
4. **Sabitler**: UPPER_SNAKE_CASE içeride (`API_URL`, `MAX_GUESTS`)
5. **CSS dosyaları**: kebab-case veya bileşen adı (`header.css`, `Header.css`)

## Barrel Export Pattern

Her klasörde `index.js` dosyası oluşturun:

```javascript
// components/common/index.js
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
```

Bu pattern sayesinde:
```javascript
// Karmaşık import yerine
import Button from '../components/common/Button/Button';

// Temiz import
import { Button, Input, Modal } from '@/components/common';
```

## Uygulama Adımları

// turbo-all
1. Yeni klasör yapısını oluştur
2. Bileşenleri yeni lokasyonlara taşı
3. Import yollarını güncelle
4. Barrel export dosyalarını oluştur
5. Build ve test et
