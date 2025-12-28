import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCustomAvailability } from '@hooks'
import { adminSettings } from '@services'
import './Hero.css'

function Hero() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { isDateBusy } = useCustomAvailability()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [siteTexts, setSiteTexts] = useState(adminSettings.getSiteTexts())

    useEffect(() => {
        // Refresh property data when component mounts and fetch from API
        const fetchData = async () => {
            try {
                const property = await adminSettings.getPropertyDataAsync()
                const texts = await adminSettings.getSiteTextsAsync()
                setPropertyData(property)
                setSiteTexts(texts)
            } catch (error) {
                console.error('Error fetching data:', error)
                setPropertyData(adminSettings.getPropertyData())
                setSiteTexts(adminSettings.getSiteTexts())
            }
        }
        fetchData()
    }, [])

    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0
    })

    const [showGuestPanel, setShowGuestPanel] = useState(false)
    const guestPanelRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (guestPanelRef.current && !guestPanelRef.current.contains(event.target)) {
                setShowGuestPanel(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // ... rest of state stays same ...

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    }

    const updateCount = (type, action) => {
        setBookingData(prev => {
            const current = Number(prev[type])
            let next = action === 'inc' ? current + 1 : current - 1

            // Minimum limitler
            if (type === 'adults' && next < 1) next = 1
            if (type === 'children' && next < 0) next = 0
            
            // Maximum limitler: 6 yetişkin, 3 çocuk, toplam 8 kişi
            if (type === 'adults' && next > 6) next = 6
            if (type === 'children' && next > 3) next = 3
            
            // Toplam kişi kontrolü (max 8)
            const otherType = type === 'adults' ? 'children' : 'adults'
            const otherCount = prev[otherType]
            if (next + otherCount > 8) {
                next = 8 - otherCount
            }

            return { ...prev, [type]: next }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const start = new Date(bookingData.checkIn)
        const end = new Date(bookingData.checkOut)

        let hasConflict = false
        let temp = new Date(start)
        while (temp < end) {
            if (isDateBusy(temp)) { hasConflict = true; break; }
            temp.setDate(temp.getDate() + 1)
        }

        if (hasConflict) {
            alert(t('booking.rangeBusy') || 'Seçtiğiniz tarihler arasında dolu günler bulunmaktadır.')
            return
        }

        navigate('/rooms/bungalov', {
            state: { preSelect: { ...bookingData, guests: Number(bookingData.adults) + Number(bookingData.children) } }
        })
    }

    const today = new Date().toISOString().split('T')[0]

    const heroBg = propertyData.heroImage || "/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png";
    // Cache-busting: Add timestamp to uploaded images
    const heroBgWithCache = heroBg.startsWith('/uploads') ? `${heroBg}?t=${Date.now()}` : heroBg;

    return (
        <section className="hero" id="home">
            <div className="hero-background">
                <img src={heroBgWithCache} alt="Hotel View" key={heroBgWithCache} />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-center-content">
                <div className="hero-text-block">
                    <h1 className="hero-title-premium">{siteTexts.hero?.title || t('hero.title')}</h1>
                    <p className="hero-subtitle-premium">{siteTexts.hero?.subtitle || t('hero.subtitle')}</p>
                </div>

                {/* Modern Yarı-Saydam Arama Çubuğu */}
                <div className="booking-bar-container">
                    <form className="booking-bar-form" onSubmit={handleSubmit}>
                        {/* Giriş Tarihi */}
                        <div className="bar-field">
                            <label>GİRİŞ TARİHİ</label>
                            <div className="date-input-wrapper">
                                <span className="date-icon">📅</span>
                                <input
                                    type="date"
                                    name="checkIn"
                                    value={bookingData.checkIn}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                    placeholder="gg.aa.yyyy"
                                />
                            </div>
                        </div>

                        <div className="bar-divider"></div>

                        {/* Çıkış Tarihi */}
                        <div className="bar-field">
                            <label>ÇIKIŞ TARİHİ</label>
                            <div className="date-input-wrapper">
                                <span className="date-icon">📅</span>
                                <input
                                    type="date"
                                    name="checkOut"
                                    value={bookingData.checkOut}
                                    onChange={handleChange}
                                    min={bookingData.checkIn || today}
                                    required
                                    placeholder="gg.aa.yyyy"
                                />
                            </div>
                        </div>

                        <div className="bar-divider"></div>

                        {/* Kişi Sayısı */}
                        <div className="bar-field guest-field-wrapper" ref={guestPanelRef}>
                            <label>KİŞİ SAYISI</label>
                            <div className="guest-select-trigger" onClick={() => setShowGuestPanel(!showGuestPanel)}>
                                <span className="guest-value">{bookingData.adults + bookingData.children} Kişi</span>
                                <span className="dropdown-arrow">▼</span>
                            </div>

                            {showGuestPanel && (
                                <div className="guest-panel">
                                    <div className="guest-row">
                                        <div className="guest-label-group">
                                            <span className="main-lab">{t('booking.adults')}</span>
                                        </div>
                                        <div className="guest-controls">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('adults', 'dec'); }} disabled={bookingData.adults <= 1}>−</button>
                                            <span>{bookingData.adults}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('adults', 'inc'); }} disabled={bookingData.adults >= 6 || (bookingData.adults + bookingData.children) >= 8}>+</button>
                                        </div>
                                    </div>

                                    <div className="guest-row">
                                        <div className="guest-label-group">
                                            <span className="main-lab">{t('booking.children')}</span>
                                        </div>
                                        <div className="guest-controls">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'dec'); }} disabled={bookingData.children <= 0}>−</button>
                                            <span>{bookingData.children}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'inc'); }} disabled={bookingData.children >= 3 || (bookingData.adults + bookingData.children) >= 8}>+</button>
                                        </div>
                                    </div>

                                    <button type="button" className="guest-panel-close" onClick={() => setShowGuestPanel(false)}>
                                        {t('common.done') || 'Tamam'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Ara Butonu */}
                        <button type="submit" className="bar-submit-btn">
                            Ara
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Hero
