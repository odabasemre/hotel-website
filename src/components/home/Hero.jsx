import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCustomAvailability } from '../../hooks/useCustomAvailability'
import { adminSettings } from '../../services/adminSettings'

function Hero() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { isDateBusy } = useCustomAvailability()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())

    useEffect(() => {
        // Refresh property data when component mounts
        setPropertyData(adminSettings.getPropertyData())
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

            if (type === 'adults' && next < 1) next = 1
            if (type === 'children' && next < 0) next = 0
            if (next > 10) next = 10

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

    return (
        <section className="hero" id="home">
            <div className="hero-background">
                <img src={heroBg} alt="Hotel View" />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-center-content">
                <div className="hero-text-block">
                    <h1 className="hero-title-premium">{t('hero.title')}</h1>
                    <p className="hero-subtitle-premium">{t('hero.subtitle')}</p>
                </div>

                {/* Yatay, İnce ve Şeffaf Arama Çubuğu */}
                <div className="booking-bar-container">
                    <form className="booking-bar-form" onSubmit={handleSubmit}>
                        <div className="bar-field">
                            <label>{t('booking.checkIn')}</label>
                            <input type="date" name="checkIn" value={bookingData.checkIn} onChange={handleChange} min={today} required />
                        </div>

                        <div className="bar-field">
                            <label>{t('booking.checkOut')}</label>
                            <input type="date" name="checkOut" value={bookingData.checkOut} onChange={handleChange} min={bookingData.checkIn || today} required />
                        </div>

                        <div className="bar-field guest-field-wrapper" ref={guestPanelRef}>
                            <div className="guest-trigger" onClick={() => setShowGuestPanel(!showGuestPanel)}>
                                <label>{t('booking.guests')}</label>
                                <div className="guest-summary">
                                    {bookingData.adults} {t('booking.adults')}, {bookingData.children} {t('booking.children')}
                                </div>
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
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('adults', 'inc'); }}>+</button>
                                        </div>
                                    </div>

                                    <div className="guest-row">
                                        <div className="guest-label-group">
                                            <span className="main-lab">{t('booking.children')}</span>
                                        </div>
                                        <div className="guest-controls">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'dec'); }} disabled={bookingData.children <= 0}>−</button>
                                            <span>{bookingData.children}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'inc'); }}>+</button>
                                        </div>
                                    </div>

                                    <button type="button" className="guest-panel-close" onClick={() => setShowGuestPanel(false)}>
                                        {t('common.done') || 'Tamam'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="bar-submit-btn">
                            {t('booking.search')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Hero
