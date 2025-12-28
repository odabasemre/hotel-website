import { settingsApi, bookingsApi, uploadApi } from './api.js';

const SETTINGS_KEY = 'ayder_hotel_settings';
const BOOKINGS_KEY = 'ayder_hotel_bookings';
const PROMOS_KEY = 'ayder_hotel_promos';
const PRICING_KEY = 'ayder_hotel_pricing';
const PROPERTY_KEY = 'ayder_hotel_property';
const TEXTS_KEY = 'ayder_hotel_texts';

// API modu kontrolü - true ise API kullanır, false ise localStorage
const USE_API = import.meta.env.VITE_API_URL ? true : false;

const defaultSettings = {
    nightlyPrice: 5000,
    totalRooms: 2,
    currency: 'TL',
    dailyData: {}
};

// Varsayılan site yazıları
const defaultSiteTexts = {
    hero: {
        title: 'Ayder Kuzey Houses',
        subtitle: 'Doğanın Kalbinde Lüks Konaklama',
        description: 'Karadeniz\'in eşsiz doğasında, Ayder Yaylası\'nın büyüleyici manzarasına karşı unutulmaz bir tatil deneyimi yaşayın.'
    },
    services: {
        title: 'Hizmetlerimiz',
        subtitle: 'Konforunuz İçin Her Şey Düşünüldü',
        items: [
            { title: 'Jakuzi', description: 'Özel jakuzili odalarımızda dinlenin' },
            { title: 'Kahvaltı', description: 'Organik yöresel kahvaltı' },
            { title: 'Wi-Fi', description: 'Ücretsiz yüksek hızlı internet' },
            { title: 'Otopark', description: 'Ücretsiz özel otopark alanı' }
        ]
    },
    rooms: {
        title: 'Odalarımız',
        subtitle: 'Konfor ve Doğanın Buluşması',
        description: 'Her detayın özenle tasarlandığı odalarımızda, doğanın huzurunu yaşayın.'
    },
    about: {
        title: 'Hakkımızda',
        subtitle: 'Ayder Kuzey Houses',
        description: 'Doğanın kalbinde, Ayder Yaylası\'nın büyüleyici manzarasına karşı konforlu ve huzurlu bir konaklama deneyimi sunuyoruz. Misafirlerimize ev konforu ve doğanın huzurunu bir arada yaşatmayı hedefliyoruz.',
        features: ['Doğa ile iç içe konum', 'Jakuzili özel odalar', 'Yöresel organik kahvaltı', 'Ücretsiz Wi-Fi ve otopark']
    },
    footer: {
        description: 'Ayder Yaylası\'nın kalbinde, doğa ile iç içe unutulmaz bir konaklama deneyimi.',
        copyright: '© 2024 Ayder Kuzey Houses. Tüm hakları saklıdır.'
    },
    contact: {
        phone: '+90 555 123 4567',
        email: 'info@ayderkuzeyhouses.com',
        address: 'Ayder Yaylası, Çamlıhemşin, Rize'
    }
};

const defaultPropertyData = {
    heroImage: '/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png',
    photos: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
        { id: 1, name: 'Ücretsiz Wi-Fi', icon: 'wifi' },
        { id: 2, name: 'Jakuzi', icon: 'hot_tub' },
        { id: 3, name: 'Dağ Manzarası', icon: 'mountains' },
        { id: 4, name: 'Şömine', icon: 'fireplace' },
        { id: 5, name: 'Kahvaltı Dahil', icon: 'restaurant' },
        { id: 6, name: 'Ücretsiz Otopark', icon: 'local_parking' }
    ],
    description: "Doğanın kalbinde, Ayder Yaylası'nın büyüleyici manzarasına karşı konforlu ve huzurlu bir konaklama deneyimi sunuyoruz.",
    siteImages: {
        hero: {
            background: '/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png'
        },
        services: {
            image1: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image2: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        rooms: {
            main: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        about: {
            image1: '/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png'
        },
        gallery: {
            image1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            image2: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image3: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image4: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image5: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image6: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image7: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image8: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    }
};

const defaultPricing = {
    baseGuests: 2,
    basePrice: 5000,
    perAdultIncrement: 499,
    perChildIncrement: 299,
    maxAdults: 6,
    maxChildren: 3,
    maxTotalOccupancy: 8
};

// Cache for API responses
let apiCache = {
    settings: null,
    bookings: null,
    property: null,
    texts: null,
    lastFetch: {}
};

const CACHE_DURATION = 5000; // 5 saniye

function isCacheValid(key) {
    return apiCache.lastFetch[key] && (Date.now() - apiCache.lastFetch[key]) < CACHE_DURATION;
}

export const adminSettings = {
    // Settings
    getSettings: () => {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            if (!saved) return defaultSettings;
            const parsed = JSON.parse(saved);
            return {
                nightlyPrice: parsed.nightlyPrice || parsed.basePrice || 5000,
                totalRooms: parsed.totalRooms || 2,
                currency: parsed.currency || 'TL',
                dailyData: parsed.dailyData || {}
            };
        } catch (e) {
            return defaultSettings;
        }
    },

    getSettingsAsync: async () => {
        if (USE_API) {
            try {
                const data = await settingsApi.get('general');
                // localStorage'a da kaydet (offline fallback)
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
                return data;
            } catch (e) {
                console.warn('API error, falling back to localStorage:', e);
                return adminSettings.getSettings();
            }
        }
        return adminSettings.getSettings();
    },

    saveSettings: (newSettings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    },

    saveSettingsAsync: async (newSettings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
        if (USE_API) {
            try {
                await settingsApi.update('general', newSettings);
            } catch (e) {
                console.warn('API save failed:', e);
            }
        }
    },

    getDayData: (dateStr) => {
        const settings = adminSettings.getSettings();
        const dayInfo = settings.dailyData[dateStr] || {};
        return {
            price: Number(dayInfo.price || settings.nightlyPrice || 5000),
            inventory: Number(dayInfo.inventory !== undefined ? dayInfo.inventory : settings.totalRooms),
            closed: !!dayInfo.closed
        };
    },

    updateDayData: (dateStr, data) => {
        const settings = adminSettings.getSettings();
        if (!settings.dailyData) settings.dailyData = {};
        settings.dailyData[dateStr] = { ...settings.dailyData[dateStr], ...data };
        adminSettings.saveSettings(settings);
    },

    getCalculatedDayData: (dateStr) => {
        const rawData = adminSettings.getDayData(dateStr);
        const bookings = adminSettings.getBookings();

        const checkDate = new Date(dateStr).getTime();
        const activeBookings = bookings.filter(b => {
            const start = new Date(b.checkIn).getTime();
            const end = new Date(b.checkOut).getTime();
            return checkDate >= start && checkDate < end;
        }).length;

        const effectiveInventory = Math.max(0, rawData.inventory - activeBookings);

        return {
            ...rawData,
            rawInventory: rawData.inventory,
            effectiveInventory: effectiveInventory,
            isSoldOut: effectiveInventory === 0,
            closed: rawData.closed || effectiveInventory === 0
        };
    },

    // Bookings
    getBookings: () => {
        try {
            const saved = localStorage.getItem(BOOKINGS_KEY);
            let bookings = saved ? JSON.parse(saved) : [];

            let needsSave = false;
            bookings.sort((a, b) => a.id - b.id);

            const processed = [];

            bookings.forEach(booking => {
                let assigned = booking.roomNumber;
                const bStart = new Date(booking.checkIn).getTime();
                const bEnd = new Date(booking.checkOut).getTime();

                const isConflict = (roomStr) => {
                    return processed.some(p => {
                        if (String(p.roomNumber) !== String(roomStr)) return false;
                        const pStart = new Date(p.checkIn).getTime();
                        const pEnd = new Date(p.checkOut).getTime();
                        return (bStart < pEnd && bEnd > pStart);
                    });
                };

                if (!assigned || isConflict(assigned)) {
                    if (!isConflict(1)) assigned = 1;
                    else if (!isConflict(2)) assigned = 2;
                    else assigned = 'Overbook';

                    if (booking.roomNumber !== assigned) {
                        booking.roomNumber = assigned;
                        needsSave = true;
                    }
                }
                processed.push(booking);
            });

            if (needsSave) {
                localStorage.setItem(BOOKINGS_KEY, JSON.stringify(processed));
                bookings = processed;
            }

            return bookings;
        } catch (e) { return []; }
    },

    getBookingsAsync: async () => {
        if (USE_API) {
            try {
                const data = await bookingsApi.getAll();
                // localStorage'a da kaydet
                localStorage.setItem(BOOKINGS_KEY, JSON.stringify(data));
                return data;
            } catch (e) {
                console.warn('API error, falling back to localStorage:', e);
                return adminSettings.getBookings();
            }
        }
        return adminSettings.getBookings();
    },

    addBooking: (booking) => {
        const bookings = adminSettings.getBookings();
        const newStart = new Date(booking.checkIn).getTime();
        const newEnd = new Date(booking.checkOut).getTime();

        const overlaps = bookings.filter(b => {
            const bStart = new Date(b.checkIn).getTime();
            const bEnd = new Date(b.checkOut).getTime();
            return (newStart < bEnd && newEnd > bStart);
        });

        const takenRooms = overlaps.map(b => b.roomNumber).filter(Boolean);

        let assignedRoom = 1;
        if (takenRooms.includes(1)) {
            if (!takenRooms.includes(2)) {
                assignedRoom = 2;
            } else {
                assignedRoom = 'Overbook';
            }
        }

        bookings.push({ ...booking, id: Date.now(), roomNumber: assignedRoom });
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    },

    addBookingAsync: async (booking) => {
        // Önce localStorage'a ekle
        adminSettings.addBooking(booking);
        
        if (USE_API) {
            try {
                await bookingsApi.create({
                    guestName: booking.name || booking.guestName,
                    guestEmail: booking.email || booking.guestEmail,
                    guestPhone: booking.phone || booking.guestPhone,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    guests: booking.guests || booking.adults + (booking.children || 0),
                    roomType: booking.roomType || 'bungalow',
                    totalPrice: booking.totalPrice,
                    currency: booking.currency || 'TRY',
                    notes: booking.notes
                });
            } catch (e) {
                console.warn('API booking save failed:', e);
            }
        }
    },

    deleteBooking: (id) => {
        const bookings = adminSettings.getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    },

    deleteBookingAsync: async (id) => {
        adminSettings.deleteBooking(id);
        if (USE_API) {
            try {
                await bookingsApi.delete(id);
            } catch (e) {
                console.warn('API delete failed:', e);
            }
        }
    },

    // Promotions
    getPromotions: () => {
        try {
            const saved = localStorage.getItem(PROMOS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    },

    addPromotion: (promo) => {
        const list = adminSettings.getPromotions();
        if (list.find(p => p.code === promo.code)) return false;
        list.push({ ...promo, id: Date.now(), createdAt: new Date().toISOString() });
        localStorage.setItem(PROMOS_KEY, JSON.stringify(list));
        return true;
    },

    deletePromotion: (id) => {
        const list = adminSettings.getPromotions();
        const filtered = list.filter(p => p.id !== id);
        localStorage.setItem(PROMOS_KEY, JSON.stringify(filtered));
    },

    updatePromotion: (id, updatedData) => {
        const list = adminSettings.getPromotions();
        const index = list.findIndex(p => p.id === id);
        if (index === -1) return false;
        list[index] = { ...list[index], ...updatedData };
        localStorage.setItem(PROMOS_KEY, JSON.stringify(list));
        return true;
    },

    validatePromotion: (code) => {
        const list = adminSettings.getPromotions();
        const promo = list.find(p => p.code === code && p.status === 'active');
        return promo || null;
    },

    // Pricing
    getPricing: () => {
        try {
            const saved = localStorage.getItem(PRICING_KEY);
            if (!saved) return defaultPricing;
            const parsed = JSON.parse(saved);
            return {
                baseGuests: parsed.baseGuests || 2,
                basePrice: parsed.basePrice || 5000,
                perPersonIncrement: parsed.perPersonIncrement || 500,
                maxGuests: parsed.maxGuests || 7,
                guestPricing: parsed.guestPricing || defaultPricing.guestPricing
            };
        } catch (e) {
            return defaultPricing;
        }
    },

    savePricing: (pricingData) => {
        localStorage.setItem(PRICING_KEY, JSON.stringify(pricingData));
    },

    updatePricingConfig: (config) => {
        const pricing = adminSettings.getPricing();
        const updated = { ...pricing, ...config };

        const newPricing = {
            1: updated.basePrice,
            2: updated.basePrice
        };

        for (let i = 3; i <= updated.maxGuests; i++) {
            newPricing[i] = updated.basePrice + ((i - 2) * updated.perPersonIncrement);
        }

        updated.guestPricing = newPricing;
        adminSettings.savePricing(updated);
        return updated;
    },

    updateBasePriceForGuests: (basePrice) => {
        return adminSettings.updatePricingConfig({ basePrice });
    },

    getCalculateSplitPrice: (dateStr, adults, children) => {
        const dayData = adminSettings.getDayData(dateStr);
        const basePriceForDate = dayData.price;
        const pricing = adminSettings.getPricing();

        let extraCharge = 0;

        // 2 yetişkinden sonraki her yetişkin için ek ücret
        if (adults > 2) {
            extraCharge += (adults - 2) * pricing.perAdultIncrement;
        }

        // Her çocuk için ek ücret
        extraCharge += (children * pricing.perChildIncrement);

        return basePriceForDate + extraCharge;
    },

    // Fiyat detaylarını döndür (formüllü gösterim için)
    getPriceBreakdown: (dateStr, adults, children) => {
        const dayData = adminSettings.getDayData(dateStr);
        const basePriceForDate = dayData.price;
        const pricing = adminSettings.getPricing();

        let adultExtra = 0;
        let childExtra = 0;

        if (adults > 2) {
            adultExtra = (adults - 2) * pricing.perAdultIncrement;
        }
        childExtra = children * pricing.perChildIncrement;

        return {
            basePrice: basePriceForDate,
            adultExtra,
            childExtra,
            totalExtra: adultExtra + childExtra,
            totalPrice: basePriceForDate + adultExtra + childExtra,
            formula: `${basePriceForDate.toLocaleString()}₺${adultExtra > 0 ? ` + ${adultExtra.toLocaleString()}₺` : ''}${childExtra > 0 ? ` + ${childExtra.toLocaleString()}₺` : ''}`
        };
    },

    getEffectivePrice: (dateStr, numGuests) => {
        return adminSettings.getCalculateSplitPrice(dateStr, numGuests, 0);
    },

    calculateTotalPrice: (checkIn, checkOut, adults, children) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        let total = 0;
        let current = new Date(start);

        for (let i = 0; i < nights; i++) {
            const dateStr = current.toISOString().split('T')[0];
            total += adminSettings.getCalculateSplitPrice(dateStr, adults, children);
            current.setDate(current.getDate() + 1);
        }

        return total;
    },

    // Analytics
    getAnalytics: (year = new Date().getFullYear()) => {
        const bookings = adminSettings.getBookings();
        const stats = {
            totalRevenue: 0,
            totalBookings: 0,
            totalNights: 0,
            monthlyData: Array(12).fill(0).map(() => ({ revenue: 0, bookings: 0, nights: 0 })),
            roomOccupancy: { 1: 0, 2: 0 },
            availableYears: [new Date().getFullYear()]
        };

        bookings.forEach(b => {
            const checkIn = new Date(b.checkIn);
            const checkOut = new Date(b.checkOut);
            const bYear = checkIn.getFullYear();

            if (!stats.availableYears.includes(bYear)) {
                stats.availableYears.push(bYear);
            }

            if (bYear === year) {
                const month = checkIn.getMonth();
                const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
                const price = Number(b.totalPrice) || 0;

                stats.totalRevenue += price;
                stats.totalBookings += 1;
                stats.totalNights += nights;

                stats.monthlyData[month].revenue += price;
                stats.monthlyData[month].bookings += 1;
                stats.monthlyData[month].nights += nights;

                if (b.roomNumber === 1) stats.roomOccupancy[1] += nights;
                if (b.roomNumber === 2) stats.roomOccupancy[2] += nights;
            }
        });

        stats.availableYears.sort((a, b) => b - a);
        return stats;
    },

    // Property Management
    getPropertyData: () => {
        try {
            const saved = localStorage.getItem(PROPERTY_KEY);
            return saved ? JSON.parse(saved) : defaultPropertyData;
        } catch (e) { return defaultPropertyData; }
    },

    getPropertyDataAsync: async () => {
        if (USE_API) {
            try {
                const data = await settingsApi.getPropertyInfo();
                if (data && Object.keys(data).length > 0) {
                    localStorage.setItem(PROPERTY_KEY, JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.warn('API error, falling back to localStorage:', e);
            }
        }
        return adminSettings.getPropertyData();
    },

    updatePropertyData: (data) => {
        try {
            const current = adminSettings.getPropertyData();
            const updated = { ...current, ...data };
            localStorage.setItem(PROPERTY_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) { return null; }
    },

    updatePropertyDataAsync: async (data) => {
        const updated = adminSettings.updatePropertyData(data);
        if (USE_API && updated) {
            try {
                for (const [key, value] of Object.entries(data)) {
                    await settingsApi.updatePropertyInfo(key, value);
                }
            } catch (e) {
                console.warn('API update failed:', e);
            }
        }
        return updated;
    },

    // Site Texts Management
    getSiteTexts: () => {
        try {
            const saved = localStorage.getItem(TEXTS_KEY);
            if (!saved) return defaultSiteTexts;
            const parsed = JSON.parse(saved);
            return {
                hero: { ...defaultSiteTexts.hero, ...parsed.hero },
                services: { ...defaultSiteTexts.services, ...parsed.services },
                rooms: { ...defaultSiteTexts.rooms, ...parsed.rooms },
                about: { ...defaultSiteTexts.about, ...parsed.about },
                footer: { ...defaultSiteTexts.footer, ...parsed.footer },
                contact: { ...defaultSiteTexts.contact, ...parsed.contact }
            };
        } catch (e) { return defaultSiteTexts; }
    },

    getSiteTextsAsync: async (lang = 'tr') => {
        if (USE_API) {
            try {
                const data = await settingsApi.getTexts(lang);
                if (data && Object.keys(data).length > 0) {
                    localStorage.setItem(TEXTS_KEY, JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.warn('API error, falling back to localStorage:', e);
            }
        }
        return adminSettings.getSiteTexts();
    },

    updateSiteTexts: (data) => {
        try {
            const current = adminSettings.getSiteTexts();
            const updated = { ...current, ...data };
            localStorage.setItem(TEXTS_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) { return null; }
    },

    updateSiteTextsAsync: async (data, lang = 'tr') => {
        const updated = adminSettings.updateSiteTexts(data);
        if (USE_API && updated) {
            try {
                for (const [section, content] of Object.entries(data)) {
                    await settingsApi.updateTexts(section, lang, content);
                }
            } catch (e) {
                console.warn('API update failed:', e);
            }
        }
        return updated;
    },

    // Image Upload Helper
    uploadImage: async (file, section, imageKey) => {
        if (USE_API) {
            try {
                const result = await uploadApi.uploadSingle(file, section, imageKey);
                return result.path;
            } catch (e) {
                console.error('Upload failed:', e);
                throw e;
            }
        }
        
        // Fallback: Convert to base64 for localStorage
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    uploadImages: async (files, section = 'gallery') => {
        if (USE_API) {
            try {
                const result = await uploadApi.uploadMultiple(Array.from(files), section);
                return result.files.map(f => f.path);
            } catch (e) {
                console.error('Upload failed:', e);
                throw e;
            }
        }
        
        // Fallback: Convert all to base64
        const promises = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        return Promise.all(promises);
    }
};
