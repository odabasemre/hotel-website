import React, { useState } from 'react'
import { adminSettings } from '../../../services/adminSettings'

function BookingsTab({
    bookings,
    setBookings,
    searchQuery,
    setSearchQuery,
    bookingFilter,
    setBookingFilter
}) {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10 // Her sayfada 10 rezervasyon göster

    // Print reservation function
    const handlePrintReservation = (booking) => {
        // Handle name splitting if stored as old single string
        let fName = booking.firstName
        let lName = booking.lastName
        if (!fName && booking.name) {
            const parts = booking.name.split(' ')
            lName = parts.pop()
            fName = parts.join(' ')
        }

        const checkInDate = new Date(booking.checkIn).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        const checkOutDate = new Date(booking.checkOut).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        
        // Calculate nights
        const checkIn = new Date(booking.checkIn)
        const checkOut = new Date(booking.checkOut)
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Rezervasyon Belgesi - ${fName} ${lName}</title>
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
                    .logo {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        margin-bottom: 15px;
                        border: 3px solid white;
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
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .rules-list {
                        list-style: none;
                        padding: 0;
                    }
                    .rules-list li {
                        padding: 8px 0;
                        border-bottom: 1px dashed #ddd;
                        font-size: 14px;
                        display: flex;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .rules-list li:last-child {
                        border-bottom: none;
                    }
                    .rule-icon {
                        color: #f57c00;
                        font-weight: bold;
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
                    @media print {
                        body {
                            padding: 20px;
                        }
                        .container {
                            border: 1px solid #ccc;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="/logo.jpg" alt="Logo" class="logo" onerror="this.style.display='none'">
                        <div class="hotel-name">Ayder Kuzey Houses</div>
                        <div class="hotel-tagline">Doğanın Kalbinde Huzurlu Bir Kaçış</div>
                    </div>
                    
                    <div class="document-title">
                        REZERVASYON ONAY BELGESİ
                    </div>
                    
                    <div class="content">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <span class="confirmation-badge">✓ ONAYLANDI</span>
                        </div>
                        
                        <div class="section">
                            <div class="section-title">👤 Misafir Bilgileri</div>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Ad Soyad</span>
                                    <span class="info-value">${fName} ${lName}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Telefon</span>
                                    <span class="info-value">${booking.phone || '-'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">E-posta</span>
                                    <span class="info-value">${booking.email || '-'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Oda Numarası</span>
                                    <span class="info-value">Oda ${booking.roomNumber || '1'}</span>
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
                                <div class="price-value">${booking.totalPrice?.toLocaleString('tr-TR') || '0'} ₺</div>
                                <div class="price-nights">${nights} Gece Konaklama</div>
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="rules-section">
                                <div class="rules-title">
                                    ⚠️ TESİS KURALLARI
                                </div>
                                <ul class="rules-list">
                                    <li><span class="rule-icon">•</span> Giriş saati 14:00, çıkış saati 11:00'dır.</li>
                                    <li><span class="rule-icon">•</span> Tesisimizde evcil hayvan kabul edilmemektedir.</li>
                                    <li><span class="rule-icon">•</span> Tüm odalarda sigara içmek yasaktır.</li>
                                    <li><span class="rule-icon">•</span> Gece 22:00'dan sonra sessizlik kuralına uyulmalıdır.</li>
                                    <li><span class="rule-icon">•</span> Oda kapasitesi üzerinde misafir kabul edilmemektedir (Maks. 8 kişi).</li>
                                    <li><span class="rule-icon">•</span> Değerli eşyalarınız için resepsiyondaki kasayı kullanabilirsiniz.</li>
                                    <li><span class="rule-icon">•</span> Tesiste yaşanan hasarlardan misafirler sorumludur.</li>
                                    <li><span class="rule-icon">•</span> İptal işlemleri giriş tarihinden 48 saat önce yapılmalıdır.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <div class="contact-info">
                            <strong>📍 Adres:</strong> Ayder Yaylası, Çamlıhemşin, Rize, Türkiye<br>
                            <strong>📞 Telefon:</strong> +90 532 123 45 67<br>
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
        `

        const printWindow = window.open('', '_blank')
        printWindow.document.write(printContent)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
            printWindow.print()
        }, 250)
    }
    
    // Filter bookings based on search and date filter
    const filteredBookings = bookings.filter(b => {
        // 1. Date Filter
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const checkIn = new Date(b.checkIn)

        if (bookingFilter === 'future' && checkIn < now) return false
        if (bookingFilter === 'past' && checkIn >= now) return false

        // 2. Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const fullName = b.name ? b.name.toLowerCase() : ''
            const fName = b.firstName ? b.firstName.toLowerCase() : ''
            const lName = b.lastName ? b.lastName.toLowerCase() : ''

            return fullName.includes(query) ||
                fName.includes(query) ||
                lName.includes(query) ||
                (b.email && b.email.toLowerCase().includes(query)) ||
                (b.phone && b.phone.includes(query))
        }
        return true
    })

    // Pagination calculations
    const totalItems = filteredBookings.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentBookings = filteredBookings.slice(startIndex, endIndex)

    // Reset to page 1 when filter changes
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, bookingFilter])

    const handleDeleteBooking = (id) => {
        if (confirm('Bu rezervasyonu silmek istediğinize emin misiniz?')) {
            adminSettings.deleteBooking(id)
            setBookings(adminSettings.getBookings())
        }
    }

    const renderPaginationControls = () => {
        if (totalPages <= 1) return null

        const pages = []
        const showPages = 5 // Maksimum 5 sayfa numarası göster
        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, startPage + showPages - 1)

        // Sayfa aralığını ayarla
        if (endPage - startPage + 1 < showPages) {
            startPage = Math.max(1, endPage - showPages + 1)
        }

        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '20px',
                padding: '15px 0',
                borderTop: '1px solid #eee'
            }}>
                <div style={{ color: '#666', fontSize: '14px' }}>
                    {totalItems} rezervasyondan {startIndex + 1}-{Math.min(endIndex, totalItems)} arası gösteriliyor
                </div>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                    {/* Previous button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: currentPage === 1 ? '#f5f5f5' : 'white',
                            color: currentPage === 1 ? '#999' : '#333',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ←
                    </button>

                    {/* Page numbers */}
                    {startPage > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentPage(1)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: 'white',
                                    color: '#333',
                                    cursor: 'pointer'
                                }}
                            >
                                1
                            </button>
                            {startPage > 2 && <span style={{ padding: '8px 4px', color: '#999' }}>...</span>}
                        </>
                    )}

                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                background: page === currentPage ? '#2d4a3e' : 'white',
                                color: page === currentPage ? 'white' : '#333',
                                cursor: 'pointer',
                                fontWeight: page === currentPage ? 'bold' : 'normal'
                            }}
                        >
                            {page}
                        </button>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <span style={{ padding: '8px 4px', color: '#999' }}>...</span>}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: 'white',
                                    color: '#333',
                                    cursor: 'pointer'
                                }}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    {/* Next button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: currentPage === totalPages ? '#f5f5f5' : 'white',
                            color: currentPage === totalPages ? '#999' : '#333',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        →
                    </button>
                </div>
            </div>
        )
    }

    return (
        <section className="bookings-section" style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="page-title" style={{ marginBottom: 0 }}>Rezervasyon Listesi</h2>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Rezervasyon Ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', minWidth: '250px' }}
                    />
                    <div style={{ display: 'flex', background: '#f0f2f5', padding: '4px', borderRadius: '6px' }}>
                        {['all', 'future', 'past'].map(type => (
                            <button
                                key={type}
                                onClick={() => setBookingFilter(type)}
                                style={{
                                    background: bookingFilter === type ? 'white' : 'transparent',
                                    color: bookingFilter === type ? '#2d4a3e' : '#666',
                                    border: 'none',
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: bookingFilter === type ? 'bold' : 'normal',
                                    boxShadow: bookingFilter === type ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {type === 'all' ? 'Tümü' : type === 'future' ? 'Gelecek' : 'Geçmiş'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2', textAlign: 'left', fontSize: '14px', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '12px' }}>Ad</th>
                        <th style={{ padding: '12px' }}>Soyad</th>
                        <th style={{ padding: '12px' }}>Telefon</th>
                        <th style={{ padding: '12px' }}>E-mail</th>
                        <th style={{ padding: '12px' }}>Oda No</th>
                        <th style={{ padding: '12px' }}>Giriş</th>
                        <th style={{ padding: '12px' }}>Çıkış</th>
                        <th style={{ padding: '12px' }}>Tutar</th>
                        <th style={{ padding: '12px' }}>Durum</th>
                        <th style={{ padding: '12px' }}>İşlem Tarihi</th>
                        <th style={{ padding: '12px' }}>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBookings.length === 0 ? (
                        <tr><td colSpan="11" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                            {searchQuery ? 'Arama kriterlerine uygun rezervasyon bulunamadı.' : 'Henüz rezervasyon yok.'}
                        </td></tr>
                    ) : currentBookings.map(b => {
                        // Handle name splitting if stored as old single string
                        let fName = b.firstName
                        let lName = b.lastName
                        if (!fName && b.name) {
                            const parts = b.name.split(' ')
                            lName = parts.pop()
                            fName = parts.join(' ')
                        }

                        return (
                            <tr key={b.id} style={{ borderBottom: '1px solid #eee', fontSize: '14px' }}>
                                <td style={{ padding: '12px' }}><strong>{fName || '-'}</strong></td>
                                <td style={{ padding: '12px' }}><strong>{lName || '-'}</strong></td>
                                <td style={{ padding: '12px' }}>{b.phone}</td>
                                <td style={{ padding: '12px' }}>{b.email || '-'}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <span style={{
                                        background: '#e0f2f1', color: '#00695c',
                                        padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold'
                                    }}>
                                        {b.roomNumber || '1'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>{new Date(b.checkIn).toLocaleDateString()}</td>
                                <td style={{ padding: '12px' }}>{new Date(b.checkOut).toLocaleDateString()}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{b.totalPrice?.toLocaleString()} ₺</td>
                                <td style={{ padding: '12px' }}><span style={{ background: '#e6f4ea', color: '#1e8e3e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>Onaylandı</span></td>
                                <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>
                                    {b.createdAt || b.created_at 
                                        ? new Date(b.createdAt || b.created_at).toLocaleString('tr-TR', { 
                                            day: '2-digit', 
                                            month: '2-digit', 
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                        : '-'}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            style={{ color: '#2d4a3e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                            onClick={() => handlePrintReservation(b)}
                                            title="Yazdır"
                                        >
                                            🖨️ Yazdır
                                        </button>
                                        <button
                                            style={{ color: '#d93025', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                            onClick={() => handleDeleteBooking(b.id)}
                                        >
                                            İptal Et
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            {renderPaginationControls()}
        </section>
    )
}

export default BookingsTab
