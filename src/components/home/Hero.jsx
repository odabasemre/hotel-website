import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCustomAvailability } from '../../hooks/useCustomAvailability'
import { adminSettings } from '../../services/adminSettings'

// Custom Calendar Component
const CustomCalendar = ({ selectedDate, onDateSelect, minDate, isOpen, onClose, label }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const calendarRef = useRef(null)
    const { isDateBusy } = useCustomAvailability()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                onClose()
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Monday first

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    const dayNames = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa']

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const handleDayClick = (day) => {
        const date = new Date(year, month, day)
        if (date < today) return
        if (minDate && date < new Date(minDate)) return
        if (isDateBusy(date)) return
        onDateSelect(date.toISOString().split('T')[0])
        onClose()
    }

    return (
        <div className="custom-calendar-dropdown" ref={calendarRef}>
            <div className="calendar-header-nav">
                <button type="button" onClick={prevMonth} className="cal-nav-btn">◀</button>
                <span className="cal-month-year">{monthNames[month]} {year}</span>
                <button type="button" onClick={nextMonth} className="cal-nav-btn">▶</button>
            </div>
            <div className="calendar-day-names">
                {dayNames.map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="calendar-days-grid">
                {[...Array(adjustedFirstDay)].map((_, i) => <span key={`empty-${i}`} className="cal-day empty"></span>)}
                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1
                    const date = new Date(year, month, day)
                    const isPast = date < today
                    const isBusy = isDateBusy(date)
                    const isSelected = selectedDate === date.toISOString().split('T')[0]
                    const isToday = date.toDateString() === today.toDateString()
                    const isDisabled = isPast || isBusy || (minDate && date < new Date(minDate))
                    
                    return (
                        <span 
                            key={day}
                            className={`cal-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${isBusy ? 'busy' : ''}`}
                            onClick={() => !isDisabled && handleDayClick(day)}
                        >
                            {day}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

function Hero() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { isDateBusy } = useCustomAvailability()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const siteTexts = adminSettings.getSiteTexts()

    // Helper function to get text styles
    const getTextStyle = (section, field) => {
        const styles = siteTexts[section]?.[`${field}Style`] || {}
        return {
            fontSize: styles.fontSize ? `${styles.fontSize}px` : undefined,
            fontWeight: styles.fontWeight || undefined,
            fontStyle: styles.fontStyle || undefined,
            textAlign: styles.textAlign || undefined,
            fontFamily: styles.fontFamily || undefined
        }
    }

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
    const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
    const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
    const guestPanelRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)

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
        
        if (!bookingData.checkIn || !bookingData.checkOut) {
            alert('Lütfen giriş ve çıkış tarihlerini seçiniz.')
            return
        }
        
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

    // Get hero background from siteImages or fallback to heroImage
    const heroBg = propertyData.siteImages?.hero?.background || propertyData.heroImage || "/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png";

    return (
        <section className="hero" id="home">
            <div className="hero-background">
                <img src={heroBg} alt="Hotel View" />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-center-content">
                <div className="hero-text-block">
                    <h1 className="hero-title-premium" style={getTextStyle('hero', 'title')}>
                        {siteTexts.hero?.title || t('hero.title')}
                    </h1>
                    <p className="hero-subtitle-premium" style={getTextStyle('hero', 'subtitle')}>
                        {siteTexts.hero?.subtitle || t('hero.subtitle')}
                    </p>
                </div>

                {/* Yatay, İnce ve Şeffaf Arama Çubuğu */}
                <div className="booking-bar-container">
                    <form className="booking-bar-form" onSubmit={handleSubmit}>
                        <div className="bar-field date-field-wrapper" ref={checkInRef}>
                            <div className="date-trigger" onClick={() => { setShowCheckInCalendar(!showCheckInCalendar); setShowCheckOutCalendar(false); }}>
                                <label>{t('booking.checkIn')}</label>
                                <div className="date-display">
                                    {bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Tarih Seçin'}
                                    <span className="calendar-icon">📅</span>
                                </div>
                            </div>
                            <CustomCalendar
                                selectedDate={bookingData.checkIn}
                                onDateSelect={(date) => setBookingData(prev => ({ ...prev, checkIn: date, checkOut: prev.checkOut && new Date(prev.checkOut) <= new Date(date) ? '' : prev.checkOut }))}
                                minDate={today}
                                isOpen={showCheckInCalendar}
                                onClose={() => setShowCheckInCalendar(false)}
                                label="Giriş Tarihi"
                            />
                        </div>

                        <div className="bar-field date-field-wrapper" ref={checkOutRef}>
                            <div className="date-trigger" onClick={() => { setShowCheckOutCalendar(!showCheckOutCalendar); setShowCheckInCalendar(false); }}>
                                <label>{t('booking.checkOut')}</label>
                                <div className="date-display">
                                    {bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Tarih Seçin'}
                                    <span className="calendar-icon">📅</span>
                                </div>
                            </div>
                            <CustomCalendar
                                selectedDate={bookingData.checkOut}
                                onDateSelect={(date) => setBookingData(prev => ({ ...prev, checkOut: date }))}
                                minDate={bookingData.checkIn || today}
                                isOpen={showCheckOutCalendar}
                                onClose={() => setShowCheckOutCalendar(false)}
                                label="Çıkış Tarihi"
                            />
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
