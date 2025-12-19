// Image Configuration
// Bu dosyada tüm görsellerin yollarını tek yerden yönetebilirsiniz

const images = {
    // Hero Section - Ana Sayfa Arka Plan
    hero: {
        background: '/images/hero/hero-background.jpg',
        // Şu an Unsplash kullanıyor, kendi fotoğrafınızı ekleyin:
        // background: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    },

    // Services Section - Hizmetler Bölümü
    services: {
        image1: '/images/services/service-1.jpg',
        image2: '/images/services/service-2.jpg',
        // Şu an Unsplash kullanıyor:
        // image1: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?...',
        // image2: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?...',
    },

    // Room Section - Oda Tanıtımı
    room: {
        main: '/images/room/room-main.jpg',
        // Şu an Unsplash kullanıyor:
        // main: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?...',
    },

    // About Section - Hakkımızda
    about: {
        image1: '/images/about/about-1.jpg',
        image2: '/images/about/about-2.jpg',
        // Şu an Unsplash kullanıyor:
        // image1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?...',
        // image2: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?...',
    },

    // Gallery Section - Galeri
    gallery: [
        '/images/gallery/gallery-1.jpg',
        '/images/gallery/gallery-2.jpg',
        '/images/gallery/gallery-3.jpg',
        '/images/gallery/gallery-4.jpg',
        '/images/gallery/gallery-5.jpg',
        '/images/gallery/gallery-6.jpg',
        // Şu an Unsplash kullanıyor:
        // 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?...',
        // 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?...',
        // vb.
    ],

    // Testimonials - Müşteri Avatarları (opsiyonel)
    testimonials: {
        avatar1: '/images/testimonials/avatar-1.jpg',
        avatar2: '/images/testimonials/avatar-2.jpg',
        avatar3: '/images/testimonials/avatar-3.jpg',
    }
}

export default images
