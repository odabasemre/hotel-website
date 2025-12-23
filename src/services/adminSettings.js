const SETTINGS_KEY = 'ayder_hotel_settings';
const BOOKINGS_KEY = 'ayder_hotel_bookings';

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
            // Tüm alanların varlığını ve doğru isimleri kontrol et
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

    getBookings: () => {
        try {
            const saved = localStorage.getItem(BOOKINGS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    },

    addBooking: (booking) => {
        const bookings = adminSettings.getBookings();
        bookings.push({ ...booking, id: Date.now() });
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    },

    deleteBooking: (id) => {
        const bookings = adminSettings.getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    }
};
