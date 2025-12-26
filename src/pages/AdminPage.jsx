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
const TrendingUpIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
const UsersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
const DollarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
const ActivityIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>

function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [settings, setSettings] = useState(adminSettings.getSettings())
    const [bookings, setBookings] = useState(adminSettings.getBookings())
    const [promotions, setPromotions] = useState(adminSettings.getPromotions())
    const [pricing, setPricing] = useState(adminSettings.getPricing())
    const [activeTab, setActiveTab] = useState('rooms')
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())

    // Calendar State
    const [startDate, setStartDate] = useState(new Date())
    const [daysToShow] = useState(31)
    const [showGuestPricing, setShowGuestPricing] = useState(true)

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
        setPricing(adminSettings.getPricing())
        setPropertyData(adminSettings.getPropertyData())
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

        const updateObj = { [field]: finalValue };

        // Requirement: If closed is true, inventory must be 0
        if (field === 'closed' && finalValue === true) {
            updateObj.inventory = 0;
        }

        // Requirement: Inventory can only be 0, 1, or 2
        if (field === 'inventory') {
            updateObj.inventory = Math.max(0, Math.min(2, finalValue));
        }

        adminSettings.updateDayData(dateStr, updateObj);
        setSettings(adminSettings.getSettings());
    }

    const handlePricingUpdate = (basePrice) => {
        adminSettings.updateBasePriceForGuests(Number(basePrice));
        setPricing(adminSettings.getPricing());
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
                    <h2 style={{ marginBottom: '20px', color: '#2d4a3e' }}>Admin Paneli</h2>
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
                <nav className="header-nav">
                    <ul>
                        <li><button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}><HomeIcon /> Ana sayfa</button></li>
                        <li><button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}><CalendarIcon /> Fiyatlar ve Kontenjan ▾</button></li>
                        <li><button className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}><TagIcon /> Kişi Başına Fiyat</button></li>
                        <li><button className={activeTab === 'promotions' ? 'active' : ''} onClick={() => setActiveTab('promotions')}><TagIcon /> Promosyonlar</button></li>
                        <li><button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}><ListIcon /> Rezervasyonlar</button></li>
                        <li><button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><SettingsIcon /> Tesis ▾</button></li>
                    </ul>
                    <div className="nav-actions">
                        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
                    </div>
                </nav>
            </header>

            <main className="admin-main">
                {activeTab === 'rooms' && (() => {
                    const stats = adminSettings.getAnalytics(selectedYear);
                    const totalDaysInYear = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ? 366 : 365;
                    // Max occupancy potential: 2 rooms * days
                    const occupancyRate = stats.totalNights > 0
                        ? ((stats.totalNights / (2 * totalDaysInYear)) * 100).toFixed(1)
                        : "0.0";

                    const adr = stats.totalBookings > 0
                        ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString('tr-TR')
                        : "0";

                    const maxMonthlyRev = Math.max(...stats.monthlyData.map(d => d.revenue), 1000);

                    return (
                        <div className="dashboard-container">
                            <header className="page-header">
                                <div>
                                    <h2 className="page-title">Yönetim Paneli Özeti</h2>
                                    <p className="page-subtitle">Tesisinizin performansına dair genel bakış.</p>
                                </div>
                                <div className="year-selector">
                                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>Yıl Seçin:</label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontWeight: 'bold' }}
                                    >
                                        {stats.availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </header>

                            <div className="stats-grid">
                                <div className="stats-card">
                                    <div className="stats-icon revenue"><DollarIcon /></div>
                                    <div className="stats-info">
                                        <span className="stats-label">Toplam Hasılat ({selectedYear})</span>
                                        <h3 className="stats-value">{stats.totalRevenue.toLocaleString('tr-TR')} ₺</h3>
                                        <span className="stats-trend positive"><TrendingUpIcon /> Gerçekleşen Veri</span>
                                    </div>
                                </div>
                                <div className="stats-card">
                                    <div className="stats-icon guests"><UsersIcon /></div>
                                    <div className="stats-info">
                                        <span className="stats-label">Toplam Rezervasyon</span>
                                        <h3 className="stats-value">{stats.totalBookings} Kayıt</h3>
                                        <span className="stats-trend positive"><TrendingUpIcon /> Net Satış</span>
                                    </div>
                                </div>
                                <div className="stats-card">
                                    <div className="stats-icon occupancy"><ActivityIcon /></div>
                                    <div className="stats-info">
                                        <span className="stats-label">Yıllık Doluluk Oranı</span>
                                        <h3 className="stats-value">{occupancyRate} %</h3>
                                        <span className="stats-trend neutral">Kapasite Kullanımı</span>
                                    </div>
                                </div>
                                <div className="stats-card">
                                    <div className="stats-icon adr"><TagIcon /></div>
                                    <div className="stats-info">
                                        <span className="stats-label">Ortalama Satış Fiyatı</span>
                                        <h3 className="stats-value">{adr} ₺</h3>
                                        <span className="stats-trend positive"><TrendingUpIcon /> ADR Skoru</span>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-charts">
                                <div className="chart-large">
                                    <div className="chart-header">
                                        <h3>{selectedYear} Aylık Hasılat Trendi</h3>
                                        <div className="chart-legend">
                                            <span className="legend-item"><span className="dot dot-revenue"></span> Aylık Kazanç</span>
                                        </div>
                                    </div>
                                    <div className="visual-chart">
                                        {stats.monthlyData.map((d, i) => {
                                            const height = (d.revenue / maxMonthlyRev) * 100;
                                            return (
                                                <div key={i} className="bar-wrapper">
                                                    <div className="bar" style={{ height: `${Math.max(height, 2)}%`, opacity: d.revenue > 0 ? 1 : 0.3 }}>
                                                        <div className="bar-tooltip">{d.revenue.toLocaleString('tr-TR')} ₺</div>
                                                    </div>
                                                    <span className="bar-label">{['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][i]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="chart-small">
                                    <div className="chart-header">
                                        <h3>Oda Bazlı Performans</h3>
                                    </div>
                                    <div className="dist-chart">
                                        <div className="room-occupancy-pill">
                                            <div className="pill-info">
                                                <span>Oda 1</span>
                                                <span>{stats.roomOccupancy[1]} Gece</span>
                                            </div>
                                            <div className="pill-bar-bg">
                                                <div className="pill-bar-fill" style={{
                                                    width: `${Math.min((stats.roomOccupancy[1] / totalDaysInYear) * 100, 100)}%`,
                                                    background: '#2d4a3e'
                                                }}></div>
                                            </div>
                                        </div>
                                        <div className="room-occupancy-pill">
                                            <div className="pill-info">
                                                <span>Oda 2</span>
                                                <span>{stats.roomOccupancy[2]} Gece</span>
                                            </div>
                                            <div className="pill-bar-bg">
                                                <div className="pill-bar-fill" style={{
                                                    width: `${Math.min((stats.roomOccupancy[2] / totalDaysInYear) * 100, 100)}%`,
                                                    background: '#6c8a7b'
                                                }}></div>
                                            </div>
                                        </div>
                                        <div className="insight-box">
                                            <InfoIcon />
                                            <p>Bu veriler {selectedYear} yılına aittir. {selectedYear === new Date().getFullYear() ? "Yıl sonu projeksiyonu için mevcut trendleri takip edin." : "Geçmiş yıl verileri arşivlenmiş ve korunmuştur."}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
                {activeTab === 'inventory' && (
                    <>
                        <div className="page-header">
                            <div>
                                <h2 className="page-title">📅 Fiyat & Kontenjan Takvimi</h2>
                                <p className="page-subtitle">Günlük fiyatları ve oda durumlarını bu ekrandan yönetebilirsiniz.</p>
                            </div>
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
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        checked={showGuestPricing}
                                        onChange={(e) => setShowGuestPricing(e.target.checked)}
                                    />
                                    Konuk başına fiyat
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><input type="checkbox" /> Kısıtlamalar</label>
                            </div>
                            <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setBulkEdit({ ...bulkEdit, show: true })}>Toplu düzenleme</button>
                        </div>

                        {/* --- CALENDAR TABLE --- */}
                        <div className="calendar-container">
                            <div className="calendar-scroll-wrapper">
                                <table className="calendar-table">
                                    <colgroup>
                                        <col style={{ width: '280px' }} />
                                        {timelineDays.map((_, i) => <col key={i} style={{ width: '60px' }} />)}
                                    </colgroup>
                                    <thead>
                                        {/* Room Info Row */}
                                        <tr className="th-room-info-row">
                                            <th className="sticky-col th-room-header">
                                                İki Yatak Odalı Dağ Evi
                                                <span style={{ fontSize: '12px', fontWeight: '400', color: '#666', display: 'block', marginTop: '4px' }}>(ID: 123456)</span>
                                                <div style={{ marginTop: '5px', fontSize: '11px', color: '#d4111e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <AlertCircle style={{ width: 12 }} /> Olası sorunlar (3)
                                                </div>
                                            </th>
                                            {months.map((m, idx) => {
                                                const count = timelineDays.filter(d => d.toLocaleDateString('tr', { month: 'long', year: 'numeric' }) === m).length;
                                                return <th key={idx} colSpan={count} className="month-group-header">{m} <ChevronRight style={{ width: 14, verticalAlign: 'middle' }} /></th>
                                            })}
                                        </tr>
                                        {/* Days Row */}
                                        <tr className="th-date-row">
                                            <th className="sticky-col sub-label-header">Takvim Günleri</th>
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
                                                const data = adminSettings.getCalculatedDayData(dStr);
                                                return (
                                                    <td key={dStr} className={`data-cell ${data.closed ? 'status-closed' : 'status-open'}`}>
                                                        <select
                                                            className="cell-select"
                                                            value={data.closed ? "true" : "false"}
                                                            onChange={(e) => handleValueChange(dStr, 'closed', e.target.value)}
                                                            style={{
                                                                color: data.isSoldOut ? '#fff' : (data.closed ? '#d4111e' : '#2d4a3e'),
                                                                background: data.isSoldOut ? '#d4111e' : 'transparent',
                                                                height: '100%',
                                                                width: '100%'
                                                            }}
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
                                                    <td key={dStr} className={`data-cell ${data.isSoldOut ? 'cell-sold-out' : ''}`} style={{ position: 'relative' }}>
                                                        <select
                                                            className="cell-select"
                                                            value={data.rawInventory}
                                                            onChange={(e) => handleValueChange(dStr, 'inventory', e.target.value)}
                                                            style={{
                                                                color: data.isSoldOut ? 'white' : 'inherit',
                                                                fontWeight: 'bold',
                                                                height: '100%',
                                                                width: '100%',
                                                                paddingTop: data.isSoldOut ? '10px' : '0'
                                                            }}
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                        {data.isSoldOut && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                left: 0,
                                                                right: 0,
                                                                fontSize: '9px',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                textTransform: 'uppercase',
                                                                pointerEvents: 'none'
                                                            }}>
                                                                Tükendi
                                                            </div>
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>

                                        {/* Row 3: Price */}
                                        <tr className={showGuestPricing ? 'parent-row' : ''}>
                                            <td className="sticky-col row-label-cell">
                                                <span className="row-label-text">{showGuestPricing ? 'Standart Fiyat (2x)' : 'Standart Fiyat'}</span>
                                                <span style={{ fontSize: '11px', color: '#666', background: '#eee', padding: '2px 4px', borderRadius: '3px' }}>₺</span>
                                            </td>
                                            {timelineDays.map(day => {
                                                const dStr = formatDate(day);
                                                const data = adminSettings.getDayData(dStr);
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

                                        {/* Dynamic Guest Pricing Rows (Adults) */}
                                        {showGuestPricing && [3, 4, 5, 6].map(num => (
                                            <tr key={`adult-${num}`} className="guest-price-row" style={{ background: '#fdfdfd' }}>
                                                <td className="sticky-col row-label-cell" style={{ paddingLeft: '30px' }}>
                                                    <span className="row-label-text" style={{ fontSize: '13px', color: '#666' }}>{num} Yetişkin</span>
                                                </td>
                                                {timelineDays.map(day => {
                                                    const dStr = formatDate(day);
                                                    const finalGuestPrice = adminSettings.getCalculateSplitPrice(dStr, num, 0);
                                                    return (
                                                        <td key={dStr} className="data-cell" style={{ color: '#888', fontSize: '13px' }}>
                                                            {finalGuestPrice.toLocaleString()}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))}

                                        {/* Dynamic Guest Pricing Rows (Children) */}
                                        {showGuestPricing && [1, 2, 3].map(num => (
                                            <tr key={`child-${num}`} className="guest-price-row" style={{ background: '#fdfdfd' }}>
                                                <td className="sticky-col row-label-cell" style={{ paddingLeft: '30px' }}>
                                                    <span className="row-label-text" style={{ fontSize: '13px', color: '#446688' }}>+ {num} Çocuk</span>
                                                </td>
                                                {timelineDays.map(day => {
                                                    const dStr = formatDate(day);
                                                    const finalGuestPrice = adminSettings.getCalculateSplitPrice(dStr, 2, num);
                                                    return (
                                                        <td key={dStr} className="data-cell" style={{ color: '#446688', fontSize: '13px', opacity: 0.8 }}>
                                                            {finalGuestPrice.toLocaleString()}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))}

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

                {activeTab === 'pricing' && (
                    <section className="pricing-section" style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h2 className="page-title">Kişi Başına Fiyat Ayarları</h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                Tesiste konaklayacak misafir tipine göre ek ücretleri buradan belirleyebilirsiniz.
                                1-2 Yetişkin konaklaması <strong>baz fiyat (Takvimdeki Fiyat)</strong> olarak kabul edilir.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eef0f2' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2d4a3e' }}>
                                        Yetişkin Farkı (3. Kişiden İtibaren)
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ fontSize: '20px', fontWeight: 'bold', padding: '10px' }}
                                            value={pricing.perAdultIncrement}
                                            onChange={(e) => setPricing(adminSettings.updatePricingConfig({ perAdultIncrement: Number(e.target.value) }))}
                                        />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d4a3e' }}>₺</span>
                                    </div>
                                    <p style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>2 yetişkinden sonraki her yetişkin için gecelik ek ücret.</p>
                                </div>

                                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eef0f2' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2d4a3e' }}>
                                        Çocuk Farkı (Her Çocuk İçin)
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ fontSize: '20px', fontWeight: 'bold', padding: '10px' }}
                                            value={pricing.perChildIncrement}
                                            onChange={(e) => setPricing(adminSettings.updatePricingConfig({ perChildIncrement: Number(e.target.value) }))}
                                        />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d4a3e' }}>₺</span>
                                    </div>
                                    <p style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>Yaş sınırına bakılmaksızın her çocuk için gecelik sabit ücret.</p>
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                        <th style={{ padding: '15px' }}>Örnek Senaryo</th>
                                        <th style={{ padding: '15px' }}>Hesaplama Formülü</th>
                                        <th style={{ padding: '15px' }}>Ek Ücret</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#eaf2ee' }}>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>2 Yetişkin</td>
                                        <td style={{ padding: '15px', color: '#666' }}>Baz Fiyat</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>-</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '15px' }}>3 Yetişkin</td>
                                        <td style={{ padding: '15px', color: '#666' }}>Baz + {pricing.perAdultIncrement} ₺</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>+{pricing.perAdultIncrement} ₺</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '15px' }}>4 Yetişkin</td>
                                        <td style={{ padding: '15px', color: '#666' }}>Baz + {pricing.perAdultIncrement * 2} ₺</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>+{pricing.perAdultIncrement * 2} ₺</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '15px' }}>2 Yetişkin + 1 Çocuk</td>
                                        <td style={{ padding: '15px', color: '#666' }}>Baz + {pricing.perChildIncrement} ₺</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>+{pricing.perChildIncrement} ₺</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '15px' }}>3 Yetişkin + 1 Çocuk</td>
                                        <td style={{ padding: '15px', color: '#666' }}>Baz + {pricing.perAdultIncrement} ₺ + {pricing.perChildIncrement} ₺</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>+{pricing.perAdultIncrement + pricing.perChildIncrement} ₺</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
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

                {activeTab === 'settings' && (
                    <section className="settings-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
                        <h2 className="page-title">Tesis ve İçerik Yönetimi</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

                            {/* 1. Geniş Kapsamlı Ayarlar */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                                <div className="settings-card" style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}><SettingsIcon /> Kapasite ve Genel Bilgiler</h3>
                                    <div className="form-group">
                                        <label>Tesis Adı</label>
                                        <input type="text" className="form-control" defaultValue="Ayder Kuzey Houses" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div className="form-group">
                                            <label>Maks. Yetişkin</label>
                                            <input type="number" className="form-control" value={pricing.maxAdults} onChange={(e) => setPricing(adminSettings.updatePricingConfig({ maxAdults: Number(e.target.value) }))} />
                                        </div>
                                        <div className="form-group">
                                            <label>Maks. Çocuk</label>
                                            <input type="number" className="form-control" value={pricing.maxChildren} onChange={(e) => setPricing(adminSettings.updatePricingConfig({ maxChildren: Number(e.target.value) }))} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Telefon</label>
                                        <input type="text" className="form-control" defaultValue="+90 532 123 45 67" />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '20px' }}>
                                        <label>Ana Sayfa Kapak Fotoğrafı (Hero)</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={propertyData.heroImage}
                                                onChange={(e) => setPropertyData(adminSettings.updatePropertyData({ heroImage: e.target.value }))}
                                                placeholder="Resim URL'si"
                                            />
                                            {propertyData.heroImage && (
                                                <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                                                    <img src={propertyData.heroImage} alt="Hero Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-card" style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}><EditIcon /> Tesis Açıklaması</h3>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        style={{ resize: 'none' }}
                                        value={propertyData.description}
                                        onChange={(e) => setPropertyData(adminSettings.updatePropertyData({ description: e.target.value }))}
                                    ></textarea>
                                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '10px' }}>Arama sonuçları ve ana sayfa üzerinde görünecek karşılama metni.</p>
                                </div>
                            </div>

                            {/* 2. Olanaklar Yönetimi */}
                            <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>Öne Çıkan Olanaklar (Aminities)</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                                    {propertyData.amenities.map(item => (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '8px 15px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{item.name}</span>
                                            <button
                                                onClick={() => {
                                                    const updated = propertyData.amenities.filter(a => a.id !== item.id);
                                                    setPropertyData(adminSettings.updatePropertyData({ amenities: updated }));
                                                }}
                                                style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                                            >&times;</button>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
                                    <input
                                        type="text"
                                        id="newAmenity"
                                        className="form-control"
                                        placeholder="Yeni olanak (örn: Kahvaltı)"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = e.target.value;
                                                if (val) {
                                                    const updated = [...propertyData.amenities, { id: Date.now(), name: val, icon: 'info' }];
                                                    setPropertyData(adminSettings.updatePropertyData({ amenities: updated }));
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        className="btn-primary"
                                        onClick={() => {
                                            const input = document.getElementById('newAmenity');
                                            if (input.value) {
                                                const updated = [...propertyData.amenities, { id: Date.now(), name: input.value, icon: 'info' }];
                                                setPropertyData(adminSettings.updatePropertyData({ amenities: updated }));
                                                input.value = '';
                                            }
                                        }}
                                    >Ekle</button>
                                </div>
                            </div>

                            {/* 3. Fotoğraf Galerisi */}
                            <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '18px', color: '#1a362d', margin: 0 }}>Site Fotoğraf Galerisi</h3>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            type="text"
                                            id="newPhotoUrl"
                                            placeholder="Fotoğraf URL'si ekleyin..."
                                            className="form-control"
                                            style={{ minWidth: '300px' }}
                                        />
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                const input = document.getElementById('newPhotoUrl');
                                                if (input.value) {
                                                    const updated = [...propertyData.photos, input.value];
                                                    setPropertyData(adminSettings.updatePropertyData({ photos: updated }));
                                                    input.value = '';
                                                }
                                            }}
                                        >Fotoğraf Ekle</button>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                                    {propertyData.photos.map((url, idx) => (
                                        <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '140px', border: '1px solid #eee' }}>
                                            <img src={url} alt={`Property ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'crop' }} />
                                            <button
                                                onClick={() => {
                                                    const updated = propertyData.photos.filter((_, i) => i !== idx);
                                                    setPropertyData(adminSettings.updatePropertyData({ photos: updated }));
                                                }}
                                                style={{
                                                    position: 'absolute', top: '5px', right: '5px',
                                                    background: 'rgba(212, 17, 30, 0.8)', color: 'white',
                                                    border: 'none', borderRadius: '50%', width: '24px', height: '24px',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    ))}
                                </div>
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
