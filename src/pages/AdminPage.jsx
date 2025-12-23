import { useState, useEffect } from 'react'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/admin-page.css'

// --- Icons ---
const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
const TagIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
const ListIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
const SettingsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
const InfoIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
const ChevronRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
const AlertCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4111e" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>

function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [settings, setSettings] = useState(adminSettings.getSettings())
    const [bookings, setBookings] = useState(adminSettings.getBookings())
    const [promotions, setPromotions] = useState(adminSettings.getPromotions())
    const [activeTab, setActiveTab] = useState('inventory')

    // Calendar State
    const [startDate, setStartDate] = useState(new Date())
    const [daysToShow] = useState(31)

    // Bulk Edit State
    const [bulkEdit, setBulkEdit] = useState({
        startDate: '', endDate: '', price: '', inventory: '', status: 'open', show: false
    })

    // New Promo State
    const [newPromo, setNewPromo] = useState({
        code: '', type: 'amount', value: '', status: 'active'
    })

    // Booking Filter State
    const [bookingFilter, setBookingFilter] = useState('all') // all, past, future
    const [searchQuery, setSearchQuery] = useState('')

    // Edit Promo State
    const [editPromo, setEditPromo] = useState({
        id: null, code: '', type: 'amount', value: '', status: 'active', show: false
    })

    useEffect(() => {
        // Force refresh when component updates
        setSettings(adminSettings.getSettings())
        setBookings(adminSettings.getBookings())
        setPromotions(adminSettings.getPromotions())
    }, [activeTab])

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === 'admin123') setIsLoggedIn(true)
        else alert('Hatalı Şifre!')
    }

    // --- Date Helpers ---
    const getTimelineDays = () => {
        const days = []
        for (let i = 0; i < daysToShow; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            days.push(date)
        }
        return days
    }

    const formatDate = (date) => date.toISOString().split('T')[0]

    // --- Actions ---
    const handleValueChange = (dateStr, field, value) => {
        let finalValue = value;
        if (field === 'price' || field === 'inventory') finalValue = Number(value);
        if (field === 'closed') finalValue = value === 'true';

        adminSettings.updateDayData(dateStr, { [field]: finalValue });
        setSettings(adminSettings.getSettings());
    }

    const applyBulkUpdate = (e) => {
        e.preventDefault();
        let current = new Date(bulkEdit.startDate);
        const end = new Date(bulkEdit.endDate);

        if (isNaN(current.getTime()) || isNaN(end.getTime())) {
            alert('Lütfen geçerli tarih aralığı seçiniz.');
            return;
        }

        while (current <= end) {
            const dateStr = formatDate(current);
            const updateData = {};
            if (bulkEdit.price) updateData.price = Number(bulkEdit.price);
            if (bulkEdit.inventory) updateData.inventory = Number(bulkEdit.inventory);
            updateData.closed = bulkEdit.status === 'closed';

            adminSettings.updateDayData(dateStr, updateData);
            current.setDate(current.getDate() + 1);
        }
        setSettings(adminSettings.getSettings());
        setBulkEdit({ ...bulkEdit, show: false });
        alert("Toplu güncelleme başarıyla uygulandı.");
    }

    const handleAddPromo = (e) => {
        e.preventDefault();
        if (!newPromo.code || !newPromo.value) {
            alert('Kod ve değer alanları zorunludur.');
            return;
        }

        const success = adminSettings.addPromotion({
            code: newPromo.code.toUpperCase(),
            type: newPromo.type,
            value: Number(newPromo.value),
            status: newPromo.status
        });

        if (success) {
            setPromotions(adminSettings.getPromotions());
            setNewPromo({ code: '', type: 'amount', value: '', status: 'active' });
            alert('Promosyon kodu eklendi.');
        } else {
            alert('Bu kod zaten mevcut.');
        }
    }

    const handleDeletePromo = (id) => {
        if (confirm('Bu promosyonu silmek istediğinize emin misiniz?')) {
            adminSettings.deletePromotion(id);
            setPromotions(adminSettings.getPromotions());
        }
    }

    const handleEditPromo = (promo) => {
        setEditPromo({
            id: promo.id,
            code: promo.code,
            type: promo.type,
            value: promo.value,
            status: promo.status,
            show: true
        });
    }

    const saveEditedPromo = (e) => {
        e.preventDefault();
        const success = adminSettings.updatePromotion(editPromo.id, {
            code: editPromo.code.toUpperCase(),
            type: editPromo.type,
            value: Number(editPromo.value),
            status: editPromo.status
        });

        if (success) {
            setPromotions(adminSettings.getPromotions());
            setEditPromo({ ...editPromo, show: false });
            alert('Promosyon güncellendi.');
        } else {
            alert('Güncelleme sırasında bir hata oluştu.');
        }
    }

    // --- Render Login ---
    if (!isLoggedIn) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
                <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ marginBottom: '20px', color: '#003580' }}>Admin Paneli</h2>
                    <input
                        type="password"
                        placeholder="Şifre (admin123)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '12px', background: '#006ce4', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Giriş Yap</button>
                </form>
            </div>
        )
    }

    const timelineDays = getTimelineDays();
    const months = [...new Set(timelineDays.map(d => d.toLocaleDateString('tr', { month: 'long', year: 'numeric' })))];

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="header-top">
                    <div className="header-logo">
                        <h1>Admin Extranet</h1>
                    </div>
                    <div>
                        <button className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
                    </div>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><button onClick={() => setActiveTab('rooms')}><HomeIcon /> Ana sayfa</button></li>
                        <li><button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}><CalendarIcon /> Fiyatlar ve Kontenjan ▾</button></li>
                        <li><button className={activeTab === 'promotions' ? 'active' : ''} onClick={() => setActiveTab('promotions')}><TagIcon /> Promosyonlar</button></li>
                        <li><button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}><ListIcon /> Rezervasyonlar</button></li>
                        <li><button><SettingsIcon /> Tesis ▾</button></li>
                    </ul>
                </nav>
            </header>

            <main className="admin-main">
                {activeTab === 'inventory' && (
                    <>
                        <div className="page-header">
                            <h2 className="page-title">Takvim</h2>
                            <div className="view-selector">
                                <select className="view-mode-selector">
                                    <option>Liste görünümü</option>
                                    <option>Aylık görünüm</option>
                                </select>
                            </div>
                        </div>

                        <div className="controls-bar">
                            <div className="date-range-picker">
                                <input
                                    type="date"
                                    value={formatDate(startDate)}
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                />
                                <span>-</span>
                                <input
                                    type="date"
                                    disabled
                                    value={formatDate(timelineDays[timelineDays.length - 1])}
                                    style={{ background: '#f9f9f9', color: '#888' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><input type="checkbox" defaultChecked /> Konuk başına fiyat</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><input type="checkbox" /> Kısıtlamalar</label>
                            </div>
                            <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setBulkEdit({ ...bulkEdit, show: true })}>Toplu düzenleme</button>
                        </div>

                        {/* --- CALENDAR TABLE --- */}
                        <div className="calendar-container">
                            <div className="calendar-scroll-wrapper">
                                <table className="calendar-table">
                                    <thead>
                                        {/* Row 1: Months */}
                                        <tr className="th-month-row">
                                            <th className="sticky-col th-room-header">
                                                İki Yatak Odalı Dağ Evi
                                                <span style={{ fontSize: '12px', fontWeight: '400', color: '#666', display: 'block', marginTop: '4px' }}>(ID: 123456)</span>
                                                <div style={{ marginTop: '5px', fontSize: '12px', color: '#d4111e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <AlertCircle /> Olası sorunlar (3)
                                                </div>
                                            </th>
                                            {/* Logic to span months across columns */}
                                            {months.map((m, idx) => {
                                                const count = timelineDays.filter(d => d.toLocaleDateString('tr', { month: 'long', year: 'numeric' }) === m).length;
                                                return <th key={idx} colSpan={count}>{m} <ChevronRight style={{ width: 14, verticalAlign: 'middle' }} /></th>
                                            })}
                                        </tr>
                                        {/* Row 2: Days */}
                                        <tr className="th-date-row">
                                            <th className="sticky-col" style={{ background: '#fff', borderBottom: '1px solid #e7e7e7' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 15px' }}>
                                                    <span>Oda durumu</span>
                                                </div>
                                            </th>
                                            {timelineDays.map((day, i) => (
                                                <th key={i} className={day.getDay() === 0 || day.getDay() === 6 ? 'weekend' : ''}>
                                                    <span className="th-day-name">{day.toLocaleDateString('tr', { weekday: 'short' })}</span>
                                                    <span className="th-day-date">{day.getDate()}</span>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Row 1: Status (Open/Closed) */}
                                        <tr>
                                            <td className="sticky-col row-label-cell">
                                                <span className="row-label-text">Oda durumu</span>
                                                <InfoIcon style={{ width: 14, color: '#888' }} />
                                            </td>
                                            {timelineDays.map(day => {
                                                const dStr = formatDate(day);
                                                // Use CALCULATED data for display
                                                const data = adminSettings.getCalculatedDayData(dStr);
                                                return (
                                                    <td key={dStr} className={`data-cell ${data.closed ? 'status-closed' : 'status-open'}`}>
                                                        <select
                                                            className="cell-select"
                                                            value={data.closed ? "true" : "false"}
                                                            onChange={(e) => handleValueChange(dStr, 'closed', e.target.value)}
                                                            style={{ color: data.closed ? '#d4111e' : '#008234' }}
                                                        >
                                                            <option value="false">Açık</option>
                                                            <option value="true">Kapalı</option>
                                                        </select>
                                                    </td>
                                                )
                                            })}
                                        </tr>

                                        {/* Row 2: Inventory */}
                                        <tr>
                                            <td className="sticky-col row-label-cell">
                                                <span className="row-label-text">Satılacak odalar</span>
                                            </td>
                                            {timelineDays.map(day => {
                                                const dStr = formatDate(day);
                                                const data = adminSettings.getCalculatedDayData(dStr);
                                                return (
                                                    <td key={dStr} className={`data-cell ${data.inventory === 0 ? 'cell-sold-out' : ''}`}>
                                                        {data.inventory === 0 ? (
                                                            'TÜKENDİ'
                                                        ) : (
                                                            <input
                                                                type="number"
                                                                className="cell-input"
                                                                value={data.inventory}
                                                                // Note: Editing inventory here changes the BASE capacity
                                                                onChange={(e) => handleValueChange(dStr, 'inventory', e.target.value)}
                                                            />
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>

                                        {/* Row 3: Price */}
                                        <tr>
                                            <td className="sticky-col row-label-cell">
                                                <span className="row-label-text">Standart Fiyat</span>
                                                <span style={{ fontSize: '11px', color: '#666', background: '#eee', padding: '2px 4px', borderRadius: '3px' }}>₺</span>
                                            </td>
                                            {timelineDays.map(day => {
                                                const dStr = formatDate(day);
                                                const data = adminSettings.getDayData(dStr); // Price can stay raw or calculated, usually same
                                                return (
                                                    <td key={dStr} className="data-cell">
                                                        <input
                                                            type="number"
                                                            className="cell-input"
                                                            value={data.price}
                                                            onChange={(e) => handleValueChange(dStr, 'price', e.target.value)}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>

                                        <tr style={{ height: '10px', background: '#f9f9f9' }}>
                                            <td className="sticky-col" style={{ background: '#f9f9f9', border: 'none' }}></td>
                                            <td colSpan={timelineDays.length} style={{ border: 'none' }}></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'bookings' && (
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
                                                color: bookingFilter === type ? '#003580' : '#666',
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
                                {bookings.filter(b => {
                                    // 1. Date Filter
                                    const now = new Date();
                                    now.setHours(0, 0, 0, 0);
                                    const checkIn = new Date(b.checkIn);

                                    if (bookingFilter === 'future' && checkIn < now) return false;
                                    if (bookingFilter === 'past' && checkIn >= now) return false;

                                    // 2. Search Filter
                                    if (searchQuery) {
                                        const query = searchQuery.toLowerCase();
                                        const fullName = b.name ? b.name.toLowerCase() : '';
                                        const fName = b.firstName ? b.firstName.toLowerCase() : '';
                                        const lName = b.lastName ? b.lastName.toLowerCase() : '';

                                        return fullName.includes(query) ||
                                            fName.includes(query) ||
                                            lName.includes(query) ||
                                            (b.email && b.email.toLowerCase().includes(query)) ||
                                            (b.phone && b.phone.includes(query));
                                    }
                                    return true;
                                }).length === 0 ? (
                                    <tr><td colSpan="10" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                        {searchQuery ? 'Arama kriterlerine uygun rezervasyon bulunamadı.' : 'Henüz rezervasyon yok.'}
                                    </td></tr>
                                ) : bookings.filter(b => {
                                    const now = new Date();
                                    now.setHours(0, 0, 0, 0);
                                    const checkIn = new Date(b.checkIn);
                                    if (bookingFilter === 'future' && checkIn < now) return false;
                                    if (bookingFilter === 'past' && checkIn >= now) return false;
                                    if (searchQuery) {
                                        const query = searchQuery.toLowerCase();
                                        const fullName = b.name ? b.name.toLowerCase() : '';
                                        const fName = b.firstName ? b.firstName.toLowerCase() : '';
                                        const lName = b.lastName ? b.lastName.toLowerCase() : '';
                                        return fullName.includes(query) || fName.includes(query) || lName.includes(query) || (b.email && b.email.toLowerCase().includes(query)) || (b.phone && b.phone.includes(query));
                                    }
                                    return true;
                                }).map(b => {
                                    // Handle name splitting if stored as old single string
                                    let fName = b.firstName;
                                    let lName = b.lastName;
                                    if (!fName && b.name) {
                                        const parts = b.name.split(' ');
                                        lName = parts.pop();
                                        fName = parts.join(' ');
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
                                                    onClick={() => { if (confirm('Bu rezervasyonu silmek istediğinize emin misiniz?')) { adminSettings.deleteBooking(b.id); setBookings(adminSettings.getBookings()) } }}
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
                )}

                {activeTab === 'promotions' && (
                    <section className="promotions-section" style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <h2 className="page-title">Promosyon Kodları</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                            {/* Form */}
                            <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
                                <h3 style={{ marginTop: 0, fontSize: '16px' }}>Yeni Kod Ekle</h3>
                                <form onSubmit={handleAddPromo}>
                                    <div className="form-group">
                                        <label>Promosyon Kodu</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Örn: YAZ2025"
                                            value={newPromo.code}
                                            onChange={e => setNewPromo({ ...newPromo, code: e.target.value })}
                                            required
                                            style={{ textTransform: 'uppercase' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>İndirim Tipi</label>
                                        <select
                                            className="form-control"
                                            value={newPromo.type}
                                            onChange={e => setNewPromo({ ...newPromo, type: e.target.value })}
                                        >
                                            <option value="amount">Tutar (TL)</option>
                                            <option value="percent">Yüzde (%)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Değer</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={newPromo.type === 'amount' ? '1000' : '10'}
                                            value={newPromo.value}
                                            onChange={e => setNewPromo({ ...newPromo, value: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Durum</label>
                                        <select
                                            className="form-control"
                                            value={newPromo.status}
                                            onChange={e => setNewPromo({ ...newPromo, status: e.target.value })}
                                        >
                                            <option value="active">Aktif</option>
                                            <option value="inactive">Pasif</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Oluştur</button>
                                </form>
                            </div>

                            {/* List */}
                            <div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
                                            <th style={{ padding: '12px' }}>Kod</th>
                                            <th style={{ padding: '12px' }}>İndirim</th>
                                            <th style={{ padding: '12px' }}>Durum</th>
                                            <th style={{ padding: '12px' }}>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {promotions.length === 0 ? (
                                            <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Kayıtlı promosyon kodu yok.</td></tr>
                                        ) : promotions.map(p => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '12px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '15px' }}>{p.code}</td>
                                                <td style={{ padding: '12px' }}>
                                                    {p.type === 'percent' ? `%${p.value}` : `${p.value} TL`}
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{
                                                        background: p.status === 'active' ? '#e6f4ea' : '#fce8e6',
                                                        color: p.status === 'active' ? '#1e8e3e' : '#c5221f',
                                                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px'
                                                    }}>
                                                        {p.status === 'active' ? 'Aktif' : 'Pasif'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    <button
                                                        onClick={() => handleEditPromo(p)}
                                                        style={{ color: '#006ce4', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                                                        title="Düzenle"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePromo(p.id)}
                                                        style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}
                                                        title="Sil"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* --- Modals --- */}
            {editPromo.show && (
                <div className="modal-overlay">
                    <form className="modal-content" onSubmit={saveEditedPromo}>
                        <div className="modal-header">
                            <h3>Promosyon Düzenle</h3>
                            <button type="button" onClick={() => setEditPromo({ ...editPromo, show: false })} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Promosyon Kodu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editPromo.code}
                                    onChange={e => setEditPromo({ ...editPromo, code: e.target.value })}
                                    required
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>İndirim Tipi</label>
                                <select
                                    className="form-control"
                                    value={editPromo.type}
                                    onChange={e => setEditPromo({ ...editPromo, type: e.target.value })}
                                >
                                    <option value="amount">Tutar (TL)</option>
                                    <option value="percent">Yüzde (%)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Değer</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={editPromo.value}
                                    onChange={e => setEditPromo({ ...editPromo, value: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Durum</label>
                                <select
                                    className="form-control"
                                    value={editPromo.status}
                                    onChange={e => setEditPromo({ ...editPromo, status: e.target.value })}
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Pasif</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-secondary" onClick={() => setEditPromo({ ...editPromo, show: false })}>İptal</button>
                            <button type="submit" className="btn-primary">Kaydet</button>
                        </div>
                    </form>
                </div>
            )}

            {bulkEdit.show && (
                <div className="modal-overlay">
                    <form className="modal-content" onSubmit={applyBulkUpdate}>
                        <div className="modal-header">
                            <h3>Toplu Güncelleme Aracı</h3>
                            <button type="button" onClick={() => setBulkEdit({ ...bulkEdit, show: false })} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Tarih Aralığı</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="date" required className="form-control" value={bulkEdit.startDate} onChange={e => setBulkEdit({ ...bulkEdit, startDate: e.target.value })} />
                                    <input type="date" required className="form-control" value={bulkEdit.endDate} onChange={e => setBulkEdit({ ...bulkEdit, endDate: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label>Fiyat (₺)</label>
                                    <input type="number" className="form-control" placeholder="Örn: 5000" value={bulkEdit.price} onChange={e => setBulkEdit({ ...bulkEdit, price: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Oda Stok Sayısı</label>
                                    <input type="number" className="form-control" placeholder="Örn: 5" value={bulkEdit.inventory} onChange={e => setBulkEdit({ ...bulkEdit, inventory: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Satış Durumu</label>
                                <select className="form-control" value={bulkEdit.status} onChange={e => setBulkEdit({ ...bulkEdit, status: e.target.value })}>
                                    <option value="open">Satışa Açık (Open)</option>
                                    <option value="closed">Satışa Kapalı (Stop Sale)</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-secondary" onClick={() => setBulkEdit({ ...bulkEdit, show: false })}>İptal</button>
                            <button type="submit" className="btn-primary">Değişiklikleri Uygula</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AdminPage
