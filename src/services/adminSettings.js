const SETTINGS_KEY = 'ayder_hotel_settings';
const BOOKINGS_KEY = 'ayder_hotel_bookings';
const PROMOS_KEY = 'ayder_hotel_promos';
const PRICING_KEY = 'ayder_hotel_pricing';
const PROPERTY_KEY = 'ayder_hotel_property';

const defaultSettings = {
    nightlyPrice: 5000,
    totalRooms: 2,
    currency: 'TL',
    dailyData: {}
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
    description: 'Doğanın kalbinde, Ayder Yaylası’nın büyüleyici manzarasına karşı konforlu ve huzurlu bir konaklama deneyimi sunuyoruz.'
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

export const adminSettings = {
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

    saveSettings: (newSettings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
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

    // Calculates real-time inventory: (Configured Total - Active Bookings)
    getCalculatedDayData: (dateStr) => {
        const rawData = adminSettings.getDayData(dateStr);
        const bookings = adminSettings.getBookings();

        // Count active bookings for this date
        const checkDate = new Date(dateStr).getTime();
        const activeBookings = bookings.filter(b => {
            const start = new Date(b.checkIn).getTime();
            const end = new Date(b.checkOut).getTime();
            // Booking includes start date, excludes end date (standard hotel logic)
            return checkDate >= start && checkDate < end;
        }).length;

        const effectiveInventory = Math.max(0, rawData.inventory - activeBookings);

        return {
            ...rawData,
            rawInventory: rawData.inventory, // Base capacity configured by admin
            effectiveInventory: effectiveInventory, // Remaining rooms after bookings
            isSoldOut: effectiveInventory === 0,
            closed: rawData.closed || effectiveInventory === 0 // Force closed if no rooms
        };
    },

    getBookings: () => {
        try {
            const saved = localStorage.getItem(BOOKINGS_KEY);
            let bookings = saved ? JSON.parse(saved) : [];

            // --- Auto-Repair: Assign Room Numbers if missing or conflicting ---
            let needsSave = false;

            // Sort by ID (creation time) to ensure consistent assignment
            bookings.sort((a, b) => a.id - b.id);

            const processed = [];

            bookings.forEach(booking => {
                // If already has a valid room number [1, 2], we try to keep it, but check conflict
                let assigned = booking.roomNumber;

                const bStart = new Date(booking.checkIn).getTime();
                const bEnd = new Date(booking.checkOut).getTime();

                // Check against ALREADY processed bookings for overlaps in the SAME room
                const isConflict = (roomStr) => {
                    return processed.some(p => {
                        if (String(p.roomNumber) !== String(roomStr)) return false;
                        const pStart = new Date(p.checkIn).getTime();
                        const pEnd = new Date(p.checkOut).getTime();
                        return (bStart < pEnd && bEnd > pStart);
                    });
                };

                // If no room assigned, or current assignment conflicts, find a new one
                if (!assigned || isConflict(assigned)) {
                    if (!isConflict(1)) assigned = 1;
                    else if (!isConflict(2)) assigned = 2;
                    else assigned = 'Overbook'; // Should not happen if strictly 2 rooms

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

    addBooking: (booking) => {
        const bookings = adminSettings.getBookings();

        // --- Room Assignment Logic ---
        const newStart = new Date(booking.checkIn).getTime();
        const newEnd = new Date(booking.checkOut).getTime();

        // Find conflicting bookings
        const overlaps = bookings.filter(b => {
            const bStart = new Date(b.checkIn).getTime();
            const bEnd = new Date(b.checkOut).getTime();
            // Check if ranges overlap
            return (newStart < bEnd && newEnd > bStart);
        });

        const takenRooms = overlaps.map(b => b.roomNumber).filter(Boolean);

        // Try assigning Room 1, then Room 2
        let assignedRoom = 1;
        if (takenRooms.includes(1)) {
            if (!takenRooms.includes(2)) {
                assignedRoom = 2;
            } else {
                // If both 1 and 2 are taken (shouldn't happen if availability check passed)
                // We'll mark it as 'Overbook' or just default to 1 for admin to resolve
                assignedRoom = 'Overbook';
            }
        }

        bookings.push({ ...booking, id: Date.now(), roomNumber: assignedRoom });
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    },

    deleteBooking: (id) => {
        const bookings = adminSettings.getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    },

    // --- PROMOTION CODES ---
    getPromotions: () => {
        try {
            const saved = localStorage.getItem(PROMOS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    },

    addPromotion: (promo) => {
        const list = adminSettings.getPromotions();
        // Check for duplicates
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

    // --- PER-GUEST PRICING MANAGEMENT ---
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

        // Regenerate prices based on new config
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
        const pricing = adminSettings.getPricing();
        return adminSettings.updatePricingConfig({ basePrice });
    },

    // Calculate price for split guest counts for a specific date
    getCalculateSplitPrice: (dateStr, adults, children) => {
        const dayData = adminSettings.getDayData(dateStr);
        const basePriceForDate = dayData.price;

        let extraCharge = 0;

        // Adult pricing: 1-2 is base, 3+ is +499 each
        if (adults > 2) {
            extraCharge += (adults - 2) * 499;
        }

        // Child pricing: 299 each
        extraCharge += (children * 299);

        return basePriceForDate + extraCharge;
    },

    // Backward compatibility or simple person count (deprecated but kept for fallback)
    getEffectivePrice: (dateStr, numGuests) => {
        return adminSettings.getCalculateSplitPrice(dateStr, numGuests, 0);
    },

    // Calculate total price for a date range and split guest counts
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

    // --- ANALYTICS ENGINE ---
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

            // Only process statistics for the requested year
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

    // --- PROPERTY MANAGEMENT ---
    getPropertyData: () => {
        try {
            const saved = localStorage.getItem(PROPERTY_KEY);
            return saved ? JSON.parse(saved) : defaultPropertyData;
        } catch (e) { return defaultPropertyData; }
    },

    updatePropertyData: (data) => {
        try {
            const current = adminSettings.getPropertyData();
            const updated = { ...current, ...data };
            localStorage.setItem(PROPERTY_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) { return null; }
    }
};
