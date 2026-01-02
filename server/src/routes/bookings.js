import express from 'express';
import pool from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingNotification, sendCustomerConfirmation } from '../utils/emailService.js';

const router = express.Router();

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        let query = 'SELECT * FROM bookings WHERE 1=1';
        const params = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND status = $${paramIndex}`;
            params.push(status);
            paramIndex++;
        }

        if (startDate) {
            query += ` AND check_in >= $${paramIndex}`;
            params.push(startDate);
            paramIndex++;
        }

        if (endDate) {
            query += ` AND check_out <= $${paramIndex}`;
            params.push(endDate);
            paramIndex++;
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// Belirli bir rezervasyonu getir
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM bookings WHERE id = $1 OR booking_id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

// Yeni rezervasyon oluştur
router.post('/', async (req, res) => {
    console.log('📥 Yeni rezervasyon isteği alındı:', req.body);
    try {
        const {
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guests,
            roomType,
            totalPrice,
            currency,
            notes
        } = req.body;

        const bookingId = `BK-${uuidv4().substring(0, 8).toUpperCase()}`;

        const result = await pool.query(
            `INSERT INTO bookings 
             (booking_id, guest_name, guest_email, guest_phone, check_in, check_out, guests, room_type, total_price, currency, notes)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING *`,
            [bookingId, guestName, guestEmail, guestPhone, checkIn, checkOut, guests, roomType, totalPrice, currency || 'TRY', notes]
        );

        const booking = result.rows[0];
        console.log('💾 Rezervasyon veritabanına kaydedildi:', bookingId);

        // Rezervasyon tarihlerinde kontenjanı güncelle (pricing tablosunda is_available = false yap)
        try {
            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);
            const tempDate = new Date(startDate);
            
            while (tempDate < endDate) {
                const dateStr = tempDate.toISOString().split('T')[0];
                
                // Bu tarihteki aktif rezervasyon sayısını kontrol et
                const activeBookingsResult = await pool.query(
                    `SELECT COUNT(*) as count FROM bookings 
                     WHERE check_in <= $1 AND check_out > $1 
                     AND status != 'cancelled'`,
                    [dateStr]
                );
                const activeCount = parseInt(activeBookingsResult.rows[0].count);
                
                // totalRooms (varsayılan 2) ile karşılaştır, doluysa kapat
                const totalRooms = 2; // Varsayılan oda sayısı
                if (activeCount >= totalRooms) {
                    await pool.query(
                        `INSERT INTO pricing (date, is_available) VALUES ($1, false)
                         ON CONFLICT (date) DO UPDATE SET is_available = false`,
                        [dateStr]
                    );
                    console.log(`📅 ${dateStr} tarihi dolu olarak işaretlendi`);
                }
                
                tempDate.setDate(tempDate.getDate() + 1);
            }
        } catch (inventoryError) {
            console.error('⚠️ Kontenjan güncelleme hatası:', inventoryError.message);
        }

        // Rezervasyon bildirimi mailini gönder (Admin'e)
        try {
            console.log('📧 Admin mail gönderimi başlatılıyor...');
            const mailResult = await sendBookingNotification(booking);
            console.log('✅ Admin bildirimi gönderildi:', bookingId, mailResult);
        } catch (emailError) {
            console.error('⚠️ Admin mail gönderme hatası:', emailError.message);
        }

        // Müşteriye onay maili gönder
        try {
            console.log('📧 Müşteri onay maili gönderimi başlatılıyor...');
            const customerMailResult = await sendCustomerConfirmation({
                ...booking,
                adults: req.body.adults || guests,
                children: req.body.children || 0
            });
            console.log('✅ Müşteri onay maili gönderildi:', bookingId, customerMailResult);
        } catch (emailError) {
            console.error('⚠️ Müşteri mail gönderme hatası:', emailError.message);
            // Mail hatasında bile rezervasyon başarılı sayılır
        }

        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Rezervasyon güncelle
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guests,
            roomType,
            totalPrice,
            currency,
            status,
            notes
        } = req.body;

        const result = await pool.query(
            `UPDATE bookings SET
             guest_name = COALESCE($1, guest_name),
             guest_email = COALESCE($2, guest_email),
             guest_phone = COALESCE($3, guest_phone),
             check_in = COALESCE($4, check_in),
             check_out = COALESCE($5, check_out),
             guests = COALESCE($6, guests),
             room_type = COALESCE($7, room_type),
             total_price = COALESCE($8, total_price),
             currency = COALESCE($9, currency),
             status = COALESCE($10, status),
             notes = COALESCE($11, notes),
             updated_at = CURRENT_TIMESTAMP
             WHERE id = $12 OR booking_id = $12
             RETURNING *`,
            [guestName, guestEmail, guestPhone, checkIn, checkOut, guests, roomType, totalPrice, currency, status, notes, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// Rezervasyon sil
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM bookings WHERE id = $1 OR booking_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json({ success: true, deleted: result.rows[0] });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

// Müsaitlik kontrolü
router.get('/check/availability', async (req, res) => {
    try {
        const { checkIn, checkOut } = req.query;

        if (!checkIn || !checkOut) {
            return res.status(400).json({ error: 'Check-in and check-out dates are required' });
        }

        // Toplam oda sayısını al
        const settingsResult = await pool.query(
            "SELECT value FROM settings WHERE key = 'general'"
        );
        const totalRooms = settingsResult.rows[0]?.value?.totalRooms || 2;

        // O tarihlerdeki rezervasyon sayısını kontrol et
        const bookingsResult = await pool.query(
            `SELECT COUNT(*) as booked FROM bookings 
             WHERE status != 'cancelled' 
             AND (check_in <= $2 AND check_out >= $1)`,
            [checkIn, checkOut]
        );

        const bookedRooms = parseInt(bookingsResult.rows[0].booked);
        const availableRooms = totalRooms - bookedRooms;

        res.json({
            available: availableRooms > 0,
            availableRooms,
            totalRooms,
            bookedRooms
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Failed to check availability' });
    }
});

export default router;
