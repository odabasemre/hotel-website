import { useState, useEffect } from 'react';

// Basit iCal Parser
const parseICalData = (icalData) => {
    const events = [];
    const lines = icalData.split('\n');
    let inEvent = false;
    let currentEvent = {};

    lines.forEach(line => {
        if (line.startsWith('BEGIN:VEVENT')) {
            inEvent = true;
            currentEvent = {};
        } else if (line.startsWith('END:VEVENT')) {
            inEvent = false;
            if (currentEvent.start && currentEvent.end) {
                events.push({
                    start: parseICalDate(currentEvent.start),
                    end: parseICalDate(currentEvent.end)
                });
            }
        } else if (inEvent) {
            if (line.startsWith('DTSTART')) {
                currentEvent.start = line.split(':')[1];
            } else if (line.startsWith('DTEND')) {
                currentEvent.end = line.split(':')[1];
            }
        }
    });

    return events;
};

const parseICalDate = (dateStr) => {
    if (!dateStr) return null;
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
};

export const useAvailability = (calendarId) => {
    const [busyDates, setBusyDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tesis Oda Kapasitesi (2 Oda)
    // Bu değer, aynı gün için kaç rezervasyon kabul edileceğini belirler.
    const TOTAL_ROOMS = 2;

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                if (!calendarId) {
                    setLoading(false);
                    return;
                }

                // Google Calendar iCal linki
                const calendarUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;

                // CORS Proxy
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(calendarUrl)}`;

                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error('Takvim verisi alınamadı');

                const data = await response.text();
                const events = parseICalData(data);

                // Gün bazında rezervasyon sayısını hesapla
                // Her tarih için kaç oda tutulmuş sayıyoruz
                const bookingsCountByDate = {}; // { "YYYY-MM-DD": count }

                events.forEach(event => {
                    let currentDate = new Date(event.start);
                    const endDate = new Date(event.end);

                    // Başlangıç tarihinden bitiş tarihine kadar olan günleri say
                    while (currentDate < endDate) {
                        // Tarihi stringe çevir (YYYY-MM-DD)
                        // Yerel saat dilimi sorunlarını önlemek için manuel formatlama
                        const year = currentDate.getFullYear();
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const dateKey = `${year}-${month}-${day}`;

                        bookingsCountByDate[dateKey] = (bookingsCountByDate[dateKey] || 0) + 1;

                        // Bir sonraki güne geç
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                });

                // Sadece kapasiteyi (2 oda) dolduran günleri "busy" olarak işaretle
                const fullyBookedDays = [];
                Object.keys(bookingsCountByDate).forEach(dateKey => {
                    if (bookingsCountByDate[dateKey] >= TOTAL_ROOMS) {
                        // Tarih stringini tekrar Date objesine çevir
                        const parts = dateKey.split('-');
                        fullyBookedDays.push(new Date(parts[0], parts[1] - 1, parts[2]));
                    }
                });

                setBusyDates(fullyBookedDays);
            } catch (err) {
                console.error("Takvim hatası:", err);
                setError(err);
                setBusyDates([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailability();
    }, [calendarId]);

    const isDateBusy = (date) => {
        return busyDates.some(busyDate =>
            busyDate.getDate() === date.getDate() &&
            busyDate.getMonth() === date.getMonth() &&
            busyDate.getFullYear() === date.getFullYear()
        );
    };

    return { busyDates, isDateBusy, loading, error };
};
