import React, { useState, useEffect, useRef } from 'react'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/admin-page.css'

// Import Tab Components
import {
    DashboardTab,
    InventoryTab,
    PricingTab,
    PromotionsTab,
    BookingsTab,
    PhotosTab,
    TextsTab
} from './Admin/tabs'

// Import Icons
import {
    HomeIcon, CalendarIcon, TagIcon, ListIcon, SettingsIcon,
    ImageIcon, TextIcon
} from './Admin/components/Icons'

function AdminPage() {
    // === Authentication State ===
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')

    // === Tab State ===
    const [activeTab, setActiveTab] = useState('rooms')

    // === Data States ===
    const [settings, setSettings] = useState(adminSettings.getSettings())
    const [bookings, setBookings] = useState(adminSettings.getBookings())
    const [promotions, setPromotions] = useState(adminSettings.getPromotions())
    const [pricing, setPricing] = useState(adminSettings.getPricing())
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [siteTexts, setSiteTexts] = useState(adminSettings.getSiteTexts())

    // === Dashboard State ===
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    // === Inventory Tab State ===
    const [startDate, setStartDate] = useState(new Date())
    const [showGuestPricing, setShowGuestPricing] = useState(false)
    const [bulkEdit, setBulkEdit] = useState({
        show: false,
        startDate: '',
        endDate: '',
        price: '',
        inventory: '',
        status: 'open'
    })

    // === Bookings Tab State ===
    const [searchQuery, setSearchQuery] = useState('')
    const [bookingFilter, setBookingFilter] = useState('all')

    // === Promotions Tab State ===
    const [newPromo, setNewPromo] = useState({
        code: '',
        type: 'amount',
        value: '',
        status: 'active'
    })
    const [editPromo, setEditPromo] = useState({
        show: false,
        id: null,
        code: '',
        type: 'amount',
        value: '',
        status: 'active'
    })

    // === Photos Tab State ===
    const [pendingImages, setPendingImages] = useState(null)
    const [hasImageChanges, setHasImageChanges] = useState(false)
    const [showConfirmPopup, setShowConfirmPopup] = useState(false)

    // === Helper Functions ===
    const formatDate = (d) => d.toISOString().split('T')[0]
    const daysToShow = 31

    const getTimelineDays = () => {
        const days = []
        for (let i = 0; i < daysToShow; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            days.push(date)
        }
        return days
    }

    // === Data Handlers ===
    const handleValueChange = (date, field, value) => {
        adminSettings.setDayData(date, field, value === 'true' ? true : value === 'false' ? false : value)
        setSettings({ ...settings })
    }

    const applyBulkUpdate = (e) => {
        e.preventDefault()
        adminSettings.applyBulkUpdate({
            startDate: bulkEdit.startDate,
            endDate: bulkEdit.endDate,
            price: bulkEdit.price ? Number(bulkEdit.price) : null,
            inventory: bulkEdit.inventory ? Number(bulkEdit.inventory) : null,
            closed: bulkEdit.status === 'closed'
        })
        setBulkEdit({ ...bulkEdit, show: false })
        setSettings({ ...settings })
    }

    const handleAddPromo = (e) => {
        e.preventDefault()
        const promo = {
            id: Date.now(),
            code: newPromo.code.toUpperCase(),
            type: newPromo.type,
            value: Number(newPromo.value),
            status: newPromo.status
        }
        setPromotions(adminSettings.addPromotion(promo))
        setNewPromo({ code: '', type: 'amount', value: '', status: 'active' })
    }

    const handleDeletePromo = (id) => {
        if (confirm('Bu promosyon kodunu silmek istediğinize emin misiniz?')) {
            setPromotions(adminSettings.deletePromotion(id))
        }
    }

    const handleEditPromo = (promo) => {
        setEditPromo({
            show: true,
            id: promo.id,
            code: promo.code,
            type: promo.type,
            value: promo.value,
            status: promo.status
        })
    }

    const saveEditedPromo = (e) => {
        e.preventDefault()
        const updated = {
            id: editPromo.id,
            code: editPromo.code.toUpperCase(),
            type: editPromo.type,
            value: Number(editPromo.value),
            status: editPromo.status
        }
        setPromotions(adminSettings.editPromotion(editPromo.id, updated))
        setEditPromo({ ...editPromo, show: false })
    }

    // === Login Handler ===
    const handleLogin = (e) => {
        e.preventDefault()
        if (password === 'admin123') {
            setIsLoggedIn(true)
        } else {
            alert('Yanlış şifre!')
        }
    }

    // === Effects ===
    useEffect(() => {
        setSettings(adminSettings.getSettings())
        setBookings(adminSettings.getBookings())
        setPromotions(adminSettings.getPromotions())
        setPricing(adminSettings.getPricing())
        setPropertyData(adminSettings.getPropertyData())
        setSiteTexts(adminSettings.getSiteTexts())
    }, [activeTab])

    // === Render Login ===
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

    const timelineDays = getTimelineDays()

    // === Main Render ===
    return (
        <div className="admin-layout">
            {/* Navigation Header */}
            <header className="admin-header">
                <nav className="header-nav">
                    <ul>
                        <li><button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}><HomeIcon /> Ana sayfa</button></li>
                        <li><button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}><CalendarIcon /> Fiyatlar ve Kontenjan ▾</button></li>
                        <li><button className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}><TagIcon /> Kişi Başına Fiyat</button></li>
                        <li><button className={activeTab === 'promotions' ? 'active' : ''} onClick={() => setActiveTab('promotions')}><TagIcon /> Promosyonlar</button></li>
                        <li><button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}><ListIcon /> Rezervasyonlar</button></li>
                        <li><button className={activeTab === 'photos' ? 'active' : ''} onClick={() => setActiveTab('photos')}><ImageIcon /> Fotoğraflar</button></li>
                        <li><button className={activeTab === 'texts' ? 'active' : ''} onClick={() => setActiveTab('texts')}><TextIcon /> Yazılar</button></li>
                    </ul>
                    <div className="nav-actions">
                        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="admin-main">
                {/* Dashboard Tab */}
                {activeTab === 'rooms' && (
                    <DashboardTab
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                    />
                )}

                {/* Inventory Tab */}
                {activeTab === 'inventory' && (
                    <InventoryTab
                        startDate={startDate}
                        setStartDate={setStartDate}
                        showGuestPricing={showGuestPricing}
                        setShowGuestPricing={setShowGuestPricing}
                        bulkEdit={bulkEdit}
                        setBulkEdit={setBulkEdit}
                        handleValueChange={handleValueChange}
                        formatDate={formatDate}
                    />
                )}

                {/* Pricing Tab */}
                {activeTab === 'pricing' && (
                    <PricingTab
                        pricing={pricing}
                        setPricing={setPricing}
                    />
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <BookingsTab
                        bookings={bookings}
                        setBookings={setBookings}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        bookingFilter={bookingFilter}
                        setBookingFilter={setBookingFilter}
                    />
                )}

                {/* Promotions Tab */}
                {activeTab === 'promotions' && (
                    <PromotionsTab
                        promotions={promotions}
                        setPromotions={setPromotions}
                        newPromo={newPromo}
                        setNewPromo={setNewPromo}
                    />
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                    <PhotosTab
                        propertyData={propertyData}
                        setPropertyData={setPropertyData}
                        pendingImages={pendingImages}
                        setPendingImages={setPendingImages}
                        hasImageChanges={hasImageChanges}
                        setHasImageChanges={setHasImageChanges}
                        showConfirmPopup={showConfirmPopup}
                        setShowConfirmPopup={setShowConfirmPopup}
                    />
                )}

                {/* Texts Tab */}
                {activeTab === 'texts' && (
                    <TextsTab
                        siteTexts={siteTexts}
                        setSiteTexts={setSiteTexts}
                    />
                )}
            </main>

            {/* Modals */}
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
