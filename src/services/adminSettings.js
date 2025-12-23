const SETTINGS_KEY = 'ayder_hotel_settings';
const BOOKINGS_KEY = 'ayder_hotel_bookings';
const PROMOS_KEY = 'ayder_hotel_promos';

const defaultSettings = {
    nightlyPrice: 5000,
    totalRooms: 2,
    currency: 'TL',
    dailyData: {}
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
            inventory: effectiveInventory, // Show remaining rooms
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
    }
};
