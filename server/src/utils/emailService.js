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

// Rezervasyon belgesi HTML şablonu oluştur
const generateReservationDocument = (bookingData) => {
    const booking_id = bookingData.booking_id || bookingData.bookingId;
    const guest_name = bookingData.guest_name || bookingData.guestName;
    const guest_email = bookingData.guest_email || bookingData.guestEmail;
    const guest_phone = bookingData.guest_phone || bookingData.guestPhone;
    const check_in = bookingData.check_in || bookingData.checkIn;
    const check_out = bookingData.check_out || bookingData.checkOut;
    const total_price = bookingData.total_price || bookingData.totalPrice;
    const room_number = bookingData.room_number || bookingData.roomNumber || '1';

    const checkInDate = new Date(check_in).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const checkOutDate = new Date(check_out).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Calculate nights
    const checkInObj = new Date(check_in);
    const checkOutObj = new Date(check_out);
    const nights = Math.ceil((checkOutObj - checkInObj) / (1000 * 60 * 60 * 24));

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Rezervasyon Belgesi - ${guest_name}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 40px;
                    background: white;
                    color: #333;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    border: 2px solid #2d4a3e;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #2d4a3e 0%, #1a2f26 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .hotel-name {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .hotel-tagline {
                    font-size: 14px;
                    opacity: 0.9;
                }
                .document-title {
                    background: #e8f5e9;
                    color: #2d4a3e;
                    padding: 15px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    border-bottom: 2px solid #2d4a3e;
                }
                .content {
                    padding: 30px;
                }
                .section {
                    margin-bottom: 25px;
                }
                .section-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #2d4a3e;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 8px;
                    margin-bottom: 15px;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                .info-item {
                    display: flex;
                    flex-direction: column;
                }
                .info-label {
                    font-size: 12px;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .info-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    margin-top: 4px;
                }
                .dates-box {
                    background: #f5f5f5;
                    border-radius: 8px;
                    padding: 20px;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    gap: 20px;
                }
                .date-item {
                    text-align: center;
                }
                .date-label {
                    font-size: 12px;
                    color: #666;
                    text-transform: uppercase;
                }
                .date-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #2d4a3e;
                    margin-top: 5px;
                }
                .date-time {
                    font-size: 14px;
                    color: #888;
                    margin-top: 3px;
                }
                .arrow {
                    font-size: 24px;
                    color: #2d4a3e;
                }
                .price-box {
                    background: #2d4a3e;
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }
                .price-label {
                    font-size: 14px;
                    opacity: 0.9;
                }
                .price-value {
                    font-size: 32px;
                    font-weight: bold;
                    margin-top: 5px;
                }
                .price-nights {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-top: 5px;
                }
                .rules-section {
                    background: #fff8e1;
                    border: 1px solid #ffcc02;
                    border-radius: 8px;
                    padding: 20px;
                }
                .rules-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #f57c00;
                    margin-bottom: 15px;
                }
                .rules-list {
                    list-style: none;
                    padding: 0;
                }
                .rules-list li {
                    padding: 8px 0;
                    border-bottom: 1px dashed #ddd;
                    font-size: 14px;
                }
                .rules-list li:last-child {
                    border-bottom: none;
                }
                .footer {
                    background: #f5f5f5;
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #e0e0e0;
                }
                .contact-info {
                    font-size: 13px;
                    color: #666;
                    line-height: 1.8;
                }
                .contact-info strong {
                    color: #2d4a3e;
                }
                .confirmation-badge {
                    display: inline-block;
                    background: #4caf50;
                    color: white;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="hotel-name">Ayder Kuzey Houses</div>
                    <div class="hotel-tagline">Doğanın Kalbinde Huzurlu Bir Kaçış</div>
                </div>
                
                <div class="document-title">
                    REZERVASYON ONAY BELGESİ
                </div>
                
                <div class="content">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <span class="confirmation-badge">✓ ONAYLANDI</span>
                        <div style="margin-top: 10px; color: #666; font-size: 14px;">
                            Rezervasyon No: <strong>${booking_id}</strong>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">👤 Misafir Bilgileri</div>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Ad Soyad</span>
                                <span class="info-value">${guest_name}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Telefon</span>
                                <span class="info-value">${guest_phone || '-'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">E-posta</span>
                                <span class="info-value">${guest_email || '-'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Oda Numarası</span>
                                <span class="info-value">Oda ${room_number}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">📅 Konaklama Tarihleri</div>
                        <div class="dates-box">
                            <div class="date-item">
                                <div class="date-label">Giriş Tarihi</div>
                                <div class="date-value">${checkInDate}</div>
                                <div class="date-time">14:00'dan itibaren</div>
                            </div>
                            <div class="arrow">→</div>
                            <div class="date-item">
                                <div class="date-label">Çıkış Tarihi</div>
                                <div class="date-value">${checkOutDate}</div>
                                <div class="date-time">11:00'a kadar</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">💰 Ödeme Bilgileri</div>
                        <div class="price-box">
                            <div class="price-label">Toplam Tutar</div>
                            <div class="price-value">${total_price?.toLocaleString('tr-TR') || '0'} ₺</div>
                            <div class="price-nights">${nights} Gece Konaklama</div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="rules-section">
                            <div class="rules-title">
                                ⚠️ TESİS KURALLARI
                            </div>
                            <ul class="rules-list">
                                <li>• Giriş saati 14:00, çıkış saati 11:00'dır.</li>
                                <li>• Tesisimizde evcil hayvan kabul edilmemektedir.</li>
                                <li>• Tüm odalarda sigara içmek yasaktır.</li>
                                <li>• Gece 22:00'dan sonra sessizlik kuralına uyulmalıdır.</li>
                                <li>• Oda kapasitesi üzerinde misafir kabul edilmemektedir (Maks. 8 kişi).</li>
                                <li>• Değerli eşyalarınız için resepsiyondaki kasayı kullanabilirsiniz.</li>
                                <li>• Tesiste yaşanan hasarlardan misafirler sorumludur.</li>
                                <li>• İptal işlemleri giriş tarihinden 48 saat önce yapılmalıdır.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <div class="contact-info">
                        <strong>📍 Adres:</strong> Kaplıca Mahallesi, Ayder Yukarı Ambarlık Küme Evler No:282, Çamlıhemşin/Rize<br>
                        <strong>📞 Telefon:</strong> +90 530 428 93 55<br>
                        <strong>✉️ E-posta:</strong> ayderkuzeyhouses@gmail.com<br>
                        <strong>🌐 Web:</strong> www.ayderkuzeyhouses.com
                    </div>
                    <p style="margin-top: 15px; font-size: 12px; color: #999;">
                        Bu belge ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
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

// Müşteriye rezervasyon onay maili gönder
export const sendCustomerConfirmation = async (bookingData) => {
    try {
        const transporter = createTransporter();
        
        // Hem snake_case (DB) hem camelCase (frontend) formatlarını destekle
        const booking_id = bookingData.booking_id || bookingData.bookingId;
        const guest_name = bookingData.guest_name || bookingData.guestName;
        const guest_email = bookingData.guest_email || bookingData.guestEmail;
        const guest_phone = bookingData.guest_phone || bookingData.guestPhone;
        const check_in = bookingData.check_in || bookingData.checkIn;
        const check_out = bookingData.check_out || bookingData.checkOut;
        const adults = bookingData.adults || 2;
        const children = bookingData.children || 0;
        const total_price = bookingData.total_price || bookingData.totalPrice;
        const currency = bookingData.currency || 'TRY';
        const notes = bookingData.notes;

        const checkInDate = new Date(check_in).toLocaleDateString('tr-TR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const checkOutDate = new Date(check_out).toLocaleDateString('tr-TR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Gece sayısı hesapla
        const checkInObj = new Date(check_in);
        const checkOutObj = new Date(check_out);
        const nights = Math.ceil((checkOutObj - checkInObj) / (1000 * 60 * 60 * 24));

        // Rezervasyon belgesi HTML'i oluştur
        const reservationDocument = generateReservationDocument(bookingData);

        const mailOptions = {
            from: {
                name: 'Ayder Kuzey Evleri',
                address: process.env.EMAIL_USER || 'ayderkuzeyhouses@gmail.com'
            },
            to: guest_email,
            subject: `✅ Rezervasyonunuz Onaylandı - ${booking_id}`,
            attachments: [
                {
                    filename: `Rezervasyon-${booking_id}.html`,
                    content: reservationDocument,
                    contentType: 'text/html'
                }
            ],
            text: `
Sayın ${guest_name},

Rezervasyonunuz başarıyla alınmıştır! 🎉

REZERVASYON BİLGİLERİ
=====================
Rezervasyon No: ${booking_id}
Giriş: ${checkInDate} - Saat 14:00
Çıkış: ${checkOutDate} - Saat 12:00
Konaklama: ${nights} gece
Misafir: ${adults} Yetişkin${children > 0 ? `, ${children} Çocuk` : ''}
Toplam Tutar: ${total_price?.toLocaleString('tr-TR')} ${currency}

TESİS KURALLARI
===============
• Giriş Saati: 14:00 - Çıkış Saati: 12:00
• Evcil hayvan kabul edilmemektedir
• Tesisimizde sigara içilmez
• Sessiz saatler: 23:00 - 08:00
• Jakuzi kullanımı 23:00'a kadar serbesttir
• Şömine için odun temin edilmektedir

ÖNEMLİ BİLGİLER
===============
• Giriş sırasında geçerli kimlik belgesi gereklidir
• Erken giriş veya geç çıkış için lütfen önceden bilgi veriniz
• İptal politikası: Konaklama tarihine 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz

İLETİŞİM
========
📞 Telefon: +90 530 428 93 55
📍 Adres: Kaplıca Mahallesi, Ayder Yukarı Ambarlık Küme Evler No:282, Çamlıhemşin/Rize
🌐 Web: https://ayderkuzey.com

Herhangi bir sorunuz olursa bize her zaman ulaşabilirsiniz.

Sizi ağırlamaktan mutluluk duyacağız! 🏔️

Saygılarımızla,
Ayder Kuzey Evleri Ekibi
            `,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🏔️ Ayder Kuzey Evleri</h1>
                        <p style="color: #a8d5ba; margin: 10px 0 0 0; font-size: 14px;">Doğanın Kalbinde Huzur</p>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="padding: 30px 25px; border: 1px solid #e0e0e0; border-top: none;">
                        
                        <!-- Greeting -->
                        <div style="text-align: center; margin-bottom: 25px;">
                            <h2 style="color: #1a362d; margin: 0 0 10px 0;">Rezervasyonunuz Onaylandı! ✅</h2>
                            <p style="color: #666; margin: 0;">Sayın <strong>${guest_name}</strong>, sizi ağırlamak için sabırsızlanıyoruz.</p>
                        </div>
                        
                        <!-- Reservation Card -->
                        <div style="background: linear-gradient(135deg, #f8faf9 0%, #e8f5e9 100%); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid #c8e6c9;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <span style="background: #2d5a4a; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                                    Rezervasyon No: ${booking_id}
                                </span>
                            </div>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">
                                        <div style="color: #888; font-size: 12px; text-transform: uppercase;">Giriş</div>
                                        <div style="color: #1a362d; font-weight: bold; font-size: 15px;">${checkInDate}</div>
                                        <div style="color: #2d5a4a; font-size: 13px;">Saat 14:00'den itibaren</div>
                                    </td>
                                    <td style="padding: 12px; text-align: center; width: 40px;">
                                        <span style="font-size: 20px;">→</span>
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">
                                        <div style="color: #888; font-size: 12px; text-transform: uppercase;">Çıkış</div>
                                        <div style="color: #1a362d; font-weight: bold; font-size: 15px;">${checkOutDate}</div>
                                        <div style="color: #2d5a4a; font-size: 13px;">Saat 12:00'ye kadar</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding: 15px 12px;">
                                        <table style="width: 100%;">
                                            <tr>
                                                <td style="text-align: center; padding: 10px;">
                                                    <div style="color: #888; font-size: 11px;">KONAKLAMA</div>
                                                    <div style="color: #1a362d; font-weight: bold; font-size: 18px;">${nights} Gece</div>
                                                </td>
                                                <td style="text-align: center; padding: 10px; border-left: 1px solid #ddd; border-right: 1px solid #ddd;">
                                                    <div style="color: #888; font-size: 11px;">MİSAFİR</div>
                                                    <div style="color: #1a362d; font-weight: bold; font-size: 18px;">${adults + children} Kişi</div>
                                                </td>
                                                <td style="text-align: center; padding: 10px;">
                                                    <div style="color: #888; font-size: 11px;">TOPLAM</div>
                                                    <div style="color: #2d5a4a; font-weight: bold; font-size: 18px;">${total_price?.toLocaleString('tr-TR')} ₺</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Facility Rules -->
                        <div style="background: #fff8e1; border-radius: 10px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
                            <h3 style="color: #f57c00; margin: 0 0 15px 0; font-size: 16px;">📋 Tesis Kuralları</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                <li><strong>Giriş:</strong> 14:00 | <strong>Çıkış:</strong> 12:00</li>
                                <li>Evcil hayvan kabul edilmemektedir</li>
                                <li>Tesisimizde sigara içilmez</li>
                                <li>Sessiz saatler: 23:00 - 08:00</li>
                                <li>Jakuzi kullanımı 23:00'a kadar serbesttir</li>
                                <li>Şömine için odun temin edilmektedir</li>
                            </ul>
                        </div>
                        
                        <!-- Important Info -->
                        <div style="background: #e3f2fd; border-radius: 10px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #2196f3;">
                            <h3 style="color: #1565c0; margin: 0 0 15px 0; font-size: 16px;">ℹ️ Önemli Bilgiler</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                <li>Giriş sırasında geçerli kimlik belgesi gereklidir</li>
                                <li>Erken giriş veya geç çıkış için lütfen önceden bilgi veriniz</li>
                                <li>Konaklama tarihine 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz</li>
                            </ul>
                        </div>
                        
                        <!-- Contact Box -->
                        <div style="background: #1a362d; border-radius: 10px; padding: 25px; text-align: center; color: white;">
                            <h3 style="margin: 0 0 15px 0; font-size: 16px;">📞 Bize Ulaşın</h3>
                            <p style="margin: 0 0 10px 0; font-size: 20px; font-weight: bold;">
                                <a href="tel:+905304289355" style="color: #a8d5ba; text-decoration: none;">+90 530 428 93 55</a>
                            </p>
                            <p style="margin: 0; color: #a8d5ba; font-size: 13px;">
                                Herhangi bir sorunuz olursa bize her zaman ulaşabilirsiniz.
                            </p>
                        </div>
                        
                        <!-- Attachment Note -->
                        <div style="margin-top: 25px; padding: 15px; background: #fafafa; border-radius: 8px; text-align: center; border: 1px dashed #ccc;">
                            <p style="margin: 0; color: #666; font-size: 13px;">
                                📎 Rezervasyon belgenize ekte ulaşabilirsiniz.
                            </p>
                        </div>
                        
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
                        <p style="margin: 0 0 10px 0; color: #555; font-size: 13px;">
                            📍 Kaplıca Mahallesi, Ayder Yukarı Ambarlık Küme Evler No:282<br>
                            Çamlıhemşin / Rize
                        </p>
                        <p style="margin: 0; color: #888; font-size: 12px;">
                            <a href="https://ayderkuzey.com" style="color: #2d5a4a; text-decoration: none;">ayderkuzey.com</a>
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Müşteri onay maili gönderildi:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Müşteri maili gönderme hatası:', error);
        return { success: false, error: error.message };
    }
};

export default { sendBookingNotification, sendCustomerConfirmation, generateReservationDocument };
