import React from 'react'
import { adminSettings } from '../../../services/adminSettings'

function BookingsTab({
    bookings,
    setBookings,
    searchQuery,
    setSearchQuery,
    bookingFilter,
    setBookingFilter
}) {
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

    const handleDeleteBooking = (id) => {
        if (confirm('Bu rezervasyonu silmek istediğinize emin misiniz?')) {
            adminSettings.deleteBooking(id)
            setBookings(adminSettings.getBookings())
        }
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
                        <th style={{ padding: '12px' }}>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.length === 0 ? (
                        <tr><td colSpan="10" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                            {searchQuery ? 'Arama kriterlerine uygun rezervasyon bulunamadı.' : 'Henüz rezervasyon yok.'}
                        </td></tr>
                    ) : filteredBookings.map(b => {
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
                                <td style={{ padding: '12px' }}>
                                    <button
                                        style={{ color: '#d93025', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                        onClick={() => handleDeleteBooking(b.id)}
                                    >
                                        İptal Et
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default BookingsTab
