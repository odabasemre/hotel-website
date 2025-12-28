import { useState, useEffect } from 'react';
import { adminSettings } from '../services/adminSettings';

export const useCustomAvailability = () => {
    const [busyDates, setBusyDates] = useState([]);
    const [almostFullDates, setAlmostFullDates] = useState([]); // Dolmak üzere olan tarihler
    const [settings, setSettings] = useState(adminSettings.getSettings());

    const refreshAvailability = () => {
        const bookings = adminSettings.getBookings();
        const currentSettings = adminSettings.getSettings();
        setSettings(currentSettings);

        const countsByDate = {};
        const fullyBusyDates = [];
        const almostFull = [];

        // 1. Rezervasyonları işle
        bookings.forEach(booking => {
            let start = new Date(booking.checkIn);
            let end = new Date(booking.checkOut);
            let temp = new Date(start);
            while (temp < end) {
                const key = temp.toISOString().split('T')[0];
                countsByDate[key] = (countsByDate[key] || 0) + 1;
                temp.setDate(temp.getDate() + 1);
            }
        });

        // 2. Kontrol Aralığı: Bugünden itibaren 2026 sonuna kadar (Yaklaşık 700 gün)
        const today = new Date();
        for (let i = 0; i < 700; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            const dayData = adminSettings.getDayData(dateStr);
            const reservedCount = countsByDate[dateStr] || 0;
            const remainingInventory = dayData.inventory - reservedCount;

            // Eğer manuel olarak "Kapalı" (Stop Sale) yapıldıysa veya kontenjan dolduysa busy işaretle
            if (dayData.closed || remainingInventory <= 0) {
                fullyBusyDates.push(new Date(dateStr));
            } else if (remainingInventory === 1) {
                // Sadece 1 kişilik yer kaldıysa "dolmak üzere"
                almostFull.push(new Date(dateStr));
            }
        }

        setBusyDates(fullyBusyDates);
        setAlmostFullDates(almostFull);
    };

    useEffect(() => {
        refreshAvailability();
    }, []);

    const isDateBusy = (date) => {
        if (!date) return false;
        const checkStr = date.toISOString().split('T')[0];
        return busyDates.some(busyDate =>
            busyDate.toISOString().split('T')[0] === checkStr
        );
    };

    const isDateAlmostFull = (date) => {
        if (!date) return false;
        const checkStr = date.toISOString().split('T')[0];
        return almostFullDates.some(almostDate =>
            almostDate.toISOString().split('T')[0] === checkStr
        );
    };

    const getPriceForDate = (date, adults = 2, children = 0) => {
        if (!date) return settings.nightlyPrice || 5000;
        const dateStr = date.toISOString().split('T')[0];
        return adminSettings.getCalculateSplitPrice(dateStr, adults, children);
    };

    const getPriceBreakdownForDate = (date, adults = 2, children = 0) => {
        if (!date) return { basePrice: 5000, adultExtra: 0, childExtra: 0, totalPrice: 5000, formula: '5.000₺' };
        const dateStr = date.toISOString().split('T')[0];
        return adminSettings.getPriceBreakdown(dateStr, adults, children);
    };

    return { isDateBusy, isDateAlmostFull, getPriceForDate, getPriceBreakdownForDate, settings, refreshAvailability };
};
