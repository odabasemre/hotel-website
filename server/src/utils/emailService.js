import nodemailer from 'nodemailer';

// Gmail SMTP Transporter oluştur
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'ayderkuzeyhouses@gmail.com',
            pass: process.env.EMAIL_PASSWORD // Gmail App Password buraya gelecek
        }
    });
};

// Rezervasyon bildirimi maili gönder
export const sendBookingNotification = async (bookingData) => {
    try {
        const transporter = createTransporter();
        
        // Hem snake_case (DB) hem camelCase (frontend) formatlarını destekle
        const booking_id = bookingData.booking_id || bookingData.bookingId;
        const guest_name = bookingData.guest_name || bookingData.guestName;
        const guest_email = bookingData.guest_email || bookingData.guestEmail;
        const guest_phone = bookingData.guest_phone || bookingData.guestPhone;
        const check_in = bookingData.check_in || bookingData.checkIn;
        const check_out = bookingData.check_out || bookingData.checkOut;
        const guests = bookingData.guests;
        const room_type = bookingData.room_type || bookingData.roomType;
        const total_price = bookingData.total_price || bookingData.totalPrice;
        const currency = bookingData.currency || 'TRY';
        const notes = bookingData.notes;
        const created_at = bookingData.created_at || bookingData.createdAt || new Date();

        const checkInDate = new Date(check_in).toLocaleDateString('tr-TR');
        const checkOutDate = new Date(check_out).toLocaleDateString('tr-TR');
        const createdAtDate = new Date(created_at).toLocaleString('tr-TR');

        const mailOptions = {
            from: process.env.EMAIL_USER || 'ayderkuzeyhouses@gmail.com',
            to: process.env.EMAIL_ADMIN || 'odabasemre0215@gmail.com',
            cc: process.env.EMAIL_CC || undefined,
            subject: `🏨 Yeni Rezervasyon - ${booking_id}`,
            text: `
🎉 YENİ REZERVASYON ALINDI!

REZERVASYON DETAYLARI
=====================

Rezervasyon No: ${booking_id}
Misafir Adı: ${guest_name}
E-posta: ${guest_email}
Telefon: ${guest_phone}

Giriş Tarihi: ${checkInDate}
Çıkış Tarihi: ${checkOutDate}
Misafir Sayısı: ${guests} kişi
Oda Tipi: ${room_type}

TOPLAM TUTAR: ${total_price} ${currency}

İşlem Tarihi: ${createdAtDate}
${notes ? `Notlar: ${notes}\n` : ''}
📌 Not: Misafiri en kısa sürede arayarak rezervasyonu onaylayabilirsiniz.

---
Bu mail Ayder Kuzey Houses rezervasyon sistemi tarafından otomatik olarak gönderilmiştir.
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #1a362d; border-bottom: 3px solid #2d5a4a; padding-bottom: 10px;">
                        🎉 Yeni Rezervasyon Alındı!
                    </h2>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5a4a; margin-top: 0;">Rezervasyon Detayları</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Rezervasyon No:</td>
                                <td style="padding: 8px 0; color: #333;">${booking_id}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Misafir Adı:</td>
                                <td style="padding: 8px 0; color: #333;">${guest_name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                                <td style="padding: 8px 0; color: #333;">${guest_email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                                <td style="padding: 8px 0; color: #333;">${guest_phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Giriş Tarihi:</td>
                                <td style="padding: 8px 0; color: #333;">${checkInDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Çıkış Tarihi:</td>
                                <td style="padding: 8px 0; color: #333;">${checkOutDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Misafir Sayısı:</td>
                                <td style="padding: 8px 0; color: #333;">${guests} kişi</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Oda Tipi:</td>
                                <td style="padding: 8px 0; color: #333;">${room_type}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Toplam Tutar:</td>
                                <td style="padding: 8px 0; color: #2d5a4a; font-weight: bold; font-size: 18px;">
                                    ${total_price} ${currency}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">İşlem Tarihi:</td>
                                <td style="padding: 8px 0; color: #666; font-size: 13px;">${createdAtDate}</td>
                            </tr>
                            ${notes ? `
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Notlar:</td>
                                <td style="padding: 8px 0; color: #333;">${notes}</td>
                            </tr>
                            ` : ''}
                        </table>
                    </div>
                    
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #2d5a4a;">
                        <p style="margin: 0; color: #1a362d;">
                            <strong>📌 Not:</strong> Misafiri en kısa sürede arayarak rezervasyonu onaylayabilirsiniz.
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <p style="color: #888; font-size: 12px; text-align: center; margin: 10px 0 0 0;">
                        Bu mail Ayder Kuzey Houses rezervasyon sistemi tarafından otomatik olarak gönderilmiştir.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Rezervasyon bildirimi mail gönderildi:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Mail gönderme hatası:', error);
        return { success: false, error: error.message };
    }
};

export default { sendBookingNotification };
