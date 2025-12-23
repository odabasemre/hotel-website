import { useState, useEffect } from 'react'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/admin-page.css'

// Professional Sidebar Icons
const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></svg>
const BookingIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
const LogoutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>

function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [settings, setSettings] = useState(adminSettings.getSettings())
    const [bookings, setBookings] = useState(adminSettings.getBookings())
    const [activeTab, setActiveTab] = useState('inventory')
    const [startDate, setStartDate] = useState(new Date())

    const [bulkEdit, setBulkEdit] = useState({
        startDate: '', endDate: '', price: '', inventory: '', status: 'open', show: false
    })

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === 'admin123') setIsLoggedIn(true)
        else alert('Hatalı Şifre!')
    }

    // 31 GÜN - YANA KAYAR DÜZEN
    const getTimelineDays = () => {
        const days = []
        for (let i = 0; i < 31; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            days.push(date)
        }
        return days
    }

    const handleDayUpdate = (dateStr, field, value) => {
        let finalValue = value;
        if (field === 'closed') finalValue = value === 'true';
        if (field === 'price' || field === 'inventory') finalValue = Number(value);
        adminSettings.updateDayData(dateStr, { [field]: finalValue });
        setSettings(adminSettings.getSettings());
    }

    const applyBulkUpdate = (e) => {
        e.preventDefault();
        let current = new Date(bulkEdit.startDate);
        const end = new Date(bulkEdit.endDate);
        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            const updateData = {};
            if (bulkEdit.price) updateData.price = Number(bulkEdit.price);
            if (bulkEdit.inventory) updateData.inventory = Number(bulkEdit.inventory);
            updateData.closed = bulkEdit.status === 'closed';
            adminSettings.updateDayData(dateStr, updateData);
            current.setDate(current.getDate() + 1);
        }
        setSettings(adminSettings.getSettings());
        setBulkEdit({ ...bulkEdit, show: false });
        alert("Toplu güncelleme başarılı!");
    }

    if (!isLoggedIn) {
        return (
            <div className="admin-login-page">
                <form className="login-form" onSubmit={handleLogin}>
                    <h1>Admin Girişi</h1>
                    <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Giriş Yap</button>
                </form>
            </div>
        )
    }

    const timelineDays = getTimelineDays();

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <h2>Kuzey Houses</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
                        <DashboardIcon /> <span>Envanter & Fiyat</span>
                    </button>
                    <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                        <BookingIcon /> <span>Rezervasyonlar</span>
                    </button>
                </nav>
                <div className="sidebar-bottom">
                    <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
                        <LogoutIcon /> <span>Çıkış</span>
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                {activeTab === 'inventory' && (
                    <section className="inventory-section">
                        <header className="content-header">
                            <div className="header-titles">
                                <h1>Profesyonel Envanter Yönetimi</h1>
                            </div>
                            <div className="header-actions">
                                <button className="bulk-btn-pro" onClick={() => setBulkEdit({ ...bulkEdit, show: true })}>⚡ Toplu Düzenleme</button>
                                <select className="month-selector-pro" onChange={(e) => setStartDate(new Date(e.target.value))}>
                                    {[...Array(12)].map((_, i) => {
                                        const d = new Date(); d.setMonth(d.getMonth() + i); d.setDate(1);
                                        return <option key={i} value={d.toISOString()}>{d.toLocaleDateString('tr', { month: 'long', year: 'numeric' })}</option>
                                    })}
                                </select>
                            </div>
                        </header>

                        <div className="pro-table-wrapper">
                            <table className="pro-inventory-table">
                                <thead>
                                    <tr>
                                        <th className="sticky-first bord-right">TARİH</th>
                                        {timelineDays.map(day => (
                                            <th key={day.toISOString()} className={day.getDay() === 0 || day.getDay() === 6 ? 'col-weekend' : ''}>
                                                <div className="th-day">{day.toLocaleDateString('tr', { weekday: 'short' })}</div>
                                                <div className="th-date">{day.getDate()} {day.toLocaleDateString('tr', { month: 'short' })}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="sticky-first bord-right row-label">Oda Durumu</td>
                                        {timelineDays.map(day => {
                                            const dStr = day.toISOString().split('T')[0];
                                            const data = adminSettings.getDayData(dStr);
                                            return (
                                                <td key={dStr}>
                                                    <select className={`pro-status-select ${data.closed ? 'closed' : 'open'}`} value={data.closed ? 'true' : 'false'} onChange={(e) => handleDayUpdate(dStr, 'closed', e.target.value)}>
                                                        <option value="false">AÇIK</option>
                                                        <option value="true">STOP</option>
                                                    </select>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td className="sticky-first bord-right row-label">Oda Sayısı</td>
                                        {timelineDays.map(day => {
                                            const dStr = day.toISOString().split('T')[0];
                                            const data = adminSettings.getDayData(dStr);
                                            return (
                                                <td key={dStr}>
                                                    <input className="pro-input-num" type="number" value={data.inventory} onChange={e => handleDayUpdate(dStr, 'inventory', e.target.value)} />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td className="sticky-first bord-right row-label">Fiyat (₺)</td>
                                        {timelineDays.map(day => {
                                            const dStr = day.toISOString().split('T')[0];
                                            const data = adminSettings.getDayData(dStr);
                                            return (
                                                <td key={dStr}>
                                                    <input className="pro-input-num price" type="number" value={data.price} onChange={e => handleDayUpdate(dStr, 'price', e.target.value)} />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {bulkEdit.show && (
                            <div className="pro-modal-overlay">
                                <form className="pro-modal" onSubmit={applyBulkUpdate}>
                                    <h3>Toplu Düzenleme</h3>
                                    <div className="modal-grid">
                                        <div className="m-field"><label>Başlangıç</label><input type="date" value={bulkEdit.startDate} onChange={e => setBulkEdit({ ...bulkEdit, startDate: e.target.value })} /></div>
                                        <div className="m-field"><label>Bitiş</label><input type="date" value={bulkEdit.endDate} onChange={e => setBulkEdit({ ...bulkEdit, endDate: e.target.value })} /></div>
                                        <div className="m-field"><label>Fiyat (₺)</label><input type="number" value={bulkEdit.price} onChange={e => setBulkEdit({ ...bulkEdit, price: e.target.value })} /></div>
                                        <div className="m-field"><label>Durum</label>
                                            <select value={bulkEdit.status} onChange={e => setBulkEdit({ ...bulkEdit, status: e.target.value })}>
                                                <option value="open">Açık</option>
                                                <option value="closed">Kapalı</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" onClick={() => setBulkEdit({ ...bulkEdit, show: false })}>İptal</button>
                                        <button type="submit" className="pro-save-btn">Uygula</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </section>
                )}

                {activeTab === 'bookings' && (
                    <section className="bookings-section">
                        <h1>Rezervasyonlar</h1>
                        <table className="admin-table">
                            <thead><tr><th>Misafir</th><th>Tarih</th><th>Tutar</th><th>İşlem</th></tr></thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b.id}>
                                        <td><strong>{b.name}</strong><br />{b.phone}</td>
                                        <td>{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</td>
                                        <td>{b.totalPrice?.toLocaleString()} TL</td>
                                        <td><button className="pro-delete-btn" onClick={() => { if (confirm('Silinsin mi?')) { adminSettings.deleteBooking(b.id); setBookings(adminSettings.getBookings()) } }}>Sil</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </main>
        </div>
    )
}

export default AdminPage
