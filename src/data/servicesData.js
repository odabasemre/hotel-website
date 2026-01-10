// Servis ikonları - Modern ve temiz tasarım
const serviceIcons = {
    // Mevcut servisler
    riverView: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 12c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
            <path d="M2 17c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
            <path d="M2 7c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
        </svg>
    ),
    balcony: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 12h18" />
            <path d="M8 12v9" />
            <path d="M16 12v9" />
            <path d="M12 3v9" />
        </svg>
    ),
    kitchen: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    ),
    fireplace: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
        </svg>
    ),
    wifi: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
    ),
    tv: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 18v3" />
        </svg>
    ),
    hairdryer: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10h4" />
            <circle cx="12" cy="10" r="5" />
            <path d="M17 10h4" />
            <path d="M12 15v6" />
            <path d="M9 21h6" />
        </svg>
    ),
    towels: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
            <path d="M4 10h16v10H4z" />
            <path d="M8 10v10" />
            <path d="M16 10v10" />
        </svg>
    ),
    parking: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
    ),
    bar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 22h8" />
            <path d="M12 11v11" />
            <path d="m19 3-7 8-7-8h14z" />
        </svg>
    ),
    reception: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    insulation: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12h4l3-9 4 18 3-9h4" />
        </svg>
    ),
    
    // Yeni servisler için hazır ikonlar
    spa: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12a3 3 0 1 0 6 0c0 3-3 6-6 6s-6-3-6-6 3-6 6-6a3 3 0 0 0 3 3" />
        </svg>
    ),
    pool: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="20" r="1" />
            <circle cx="12" cy="4" r="1" />
            <circle cx="6.343" cy="17.657" r="1" />
            <circle cx="6.343" cy="6.343" r="1" />
            <circle cx="17.657" cy="17.657" r="1" />
            <circle cx="17.657" cy="6.343" r="1" />
            <circle cx="4" cy="12" r="1" />
            <circle cx="20" cy="12" r="1" />
        </svg>
    ),
    gym: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6.5 6.5h11" />
            <path d="M6.5 17.5h11" />
            <path d="M6.5 12H8" />
            <path d="M16 12h1.5" />
            <path d="M8 8v8" />
            <path d="M16 8v8" />
        </svg>
    ),
    restaurant: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    ),
    laundry: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h3" />
            <path d="M17 6h.01" />
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <circle cx="12" cy="13" r="5" />
        </svg>
    ),
    minibar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 6h14l-1 7H6L5 6Z" />
            <path d="M5 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
            <path d="M3 6h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
        </svg>
    ),
    security: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    ),
    concierge: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    transport: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
            <path d="M8 8v4" />
            <path d="M9 18h6" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </svg>
    ),
    breakfast: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
            <line x1="6" x2="6" y1="2" y2="8" />
            <line x1="10" x2="10" y1="2" y2="8" />
            <line x1="14" x2="14" y1="2" y2="8" />
        </svg>
    ),
    airConditioning: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2h8l4 9H4l4-9Z" />
            <path d="M16 11v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3" />
            <path d="M8 15v4" />
            <path d="M16 15v4" />
            <path d="M12 15v4" />
        </svg>
    ),
    petFriendly: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="4" r="2" />
            <circle cx="18" cy="8" r="2" />
            <circle cx="20" cy="16" r="2" />
            <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
        </svg>
    )
};

// Servis kategorileri
export const serviceCategories = {
    accommodation: {
        title: 'Konaklama',
        color: '#2563eb',
        services: ['riverView', 'balcony', 'kitchen', 'fireplace', 'tv', 'minibar', 'airConditioning']
    },
    comfort: {
        title: 'Konfor',
        color: '#16a34a', 
        services: ['wifi', 'hairdryer', 'towels', 'insulation', 'laundry']
    },
    facilities: {
        title: 'Tesisler',
        color: '#dc2626',
        services: ['parking', 'bar', 'restaurant', 'spa', 'pool', 'gym']
    },
    services: {
        title: 'Hizmetler',
        color: '#ca8a04',
        services: ['reception', 'concierge', 'transport', 'breakfast', 'security', 'petFriendly']
    }
};

// Ana servis verisi
export const servicesData = [
    // Mevcut servisler
    {
        key: 'riverView',
        icon: serviceIcons.riverView(),
        category: 'accommodation',
        featured: true,
        priority: 1
    },
    {
        key: 'balcony',
        icon: serviceIcons.balcony(),
        category: 'accommodation',
        featured: true,
        priority: 2
    },
    {
        key: 'kitchen',
        icon: serviceIcons.kitchen(),
        category: 'accommodation',
        featured: true,
        priority: 3
    },
    {
        key: 'fireplace',
        icon: serviceIcons.fireplace(),
        category: 'accommodation',
        featured: false,
        priority: 4
    },
    {
        key: 'wifi',
        icon: serviceIcons.wifi(),
        category: 'comfort',
        featured: true,
        priority: 5
    },
    {
        key: 'tv',
        icon: serviceIcons.tv(),
        category: 'accommodation',
        featured: false,
        priority: 6
    },
    {
        key: 'hairdryer',
        icon: serviceIcons.hairdryer(),
        category: 'comfort',
        featured: false,
        priority: 7
    },
    {
        key: 'towels',
        icon: serviceIcons.towels(),
        category: 'comfort',
        featured: false,
        priority: 8
    },
    {
        key: 'parking',
        icon: serviceIcons.parking(),
        category: 'facilities',
        featured: true,
        priority: 9
    },
    {
        key: 'bar',
        icon: serviceIcons.bar(),
        category: 'facilities',
        featured: false,
        priority: 10
    },
    {
        key: 'reception',
        icon: serviceIcons.reception(),
        category: 'services',
        featured: true,
        priority: 11
    },
    {
        key: 'insulation',
        icon: serviceIcons.insulation(),
        category: 'comfort',
        featured: false,
        priority: 12
    },

    // Yeni eklenecek servisler için template (şimdilik disabled)
    // Bunları aktif etmek için `disabled: false` yapabilirsin veya tamamen çıkarabilirsin
    {
        key: 'spa',
        icon: serviceIcons.spa(),
        category: 'facilities',
        featured: false,
        priority: 13,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'pool',
        icon: serviceIcons.pool(),
        category: 'facilities',
        featured: false,
        priority: 14,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'gym',
        icon: serviceIcons.gym(),
        category: 'facilities',
        featured: false,
        priority: 15,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'restaurant',
        icon: serviceIcons.restaurant(),
        category: 'facilities',
        featured: false,
        priority: 16,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'laundry',
        icon: serviceIcons.laundry(),
        category: 'comfort',
        featured: false,
        priority: 17,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'minibar',
        icon: serviceIcons.minibar(),
        category: 'accommodation',
        featured: false,
        priority: 18,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'security',
        icon: serviceIcons.security(),
        category: 'services',
        featured: false,
        priority: 19,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'concierge',
        icon: serviceIcons.concierge(),
        category: 'services',
        featured: false,
        priority: 20,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'transport',
        icon: serviceIcons.transport(),
        category: 'services',
        featured: false,
        priority: 21,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'breakfast',
        icon: serviceIcons.breakfast(),
        category: 'services',
        featured: false,
        priority: 22,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'airConditioning',
        icon: serviceIcons.airConditioning(),
        category: 'accommodation',
        featured: false,
        priority: 23,
        disabled: true // Henüz aktif değil
    },
    {
        key: 'petFriendly',
        icon: serviceIcons.petFriendly(),
        category: 'services',
        featured: false,
        priority: 24,
        disabled: true // Henüz aktif değil
    }
];

// Yardımcı fonksiyonlar
export const getServicesByCategory = (category) => {
    return servicesData
        .filter(service => service.category === category && !service.disabled)
        .sort((a, b) => a.priority - b.priority);
};

export const getFeaturedServices = () => {
    return servicesData
        .filter(service => service.featured && !service.disabled)
        .sort((a, b) => a.priority - b.priority);
};

export const getAllActiveServices = () => {
    return servicesData
        .filter(service => !service.disabled)
        .sort((a, b) => a.priority - b.priority);
};

export const getServiceIcon = (key) => {
    return serviceIcons[key] ? serviceIcons[key]() : null;
};