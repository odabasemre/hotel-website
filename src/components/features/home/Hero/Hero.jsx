import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCustomAvailability } from '@hooks'
import { adminSettings } from '@services'
import './Hero.css'

function Hero() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const { isDateBusy } = useCustomAvailability()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [siteTexts, setSiteTexts] = useState(adminSettings.getSiteTexts())

    // Calendar states
    const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
    const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
    const [checkInMonth, setCheckInMonth] = useState(new Date())
    const [checkOutMonth, setCheckOutMonth] = useState(new Date())

    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const guestPanelRef = useRef(null)

    useEffect(() => {
        // Fetch data silently - fallback to localStorage on error
        const fetchData = async () => {
            try {
                const property = await adminSettings.getPropertyDataAsync()
                if (property) setPropertyData(property)
            } catch (e) { /* Silent fallback */ }
            
            try {
                const texts = await adminSettings.getSiteTextsAsync()
                if (texts) setSiteTexts(texts)
            } catch (e) { /* Silent fallback */ }
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

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (guestPanelRef.current && !guestPanelRef.current.contains(event.target)) {
                setShowGuestPanel(false)
            }
            if (checkInRef.current && !checkInRef.current.contains(event.target)) {
                setShowCheckInCalendar(false)
            }
            if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
                setShowCheckOutCalendar(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const updateCount = (type, action) => {
        setBookingData(prev => {
            const current = Number(prev[type])
            let next = action === 'inc' ? current + 1 : current - 1

            if (type === 'adults' && next < 1) next = 1
            if (type === 'children' && next < 0) next = 0
            if (type === 'adults' && next > 6) next = 6
            if (type === 'children' && next > 3) next = 3

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
            if (isDateBusy(temp)) { hasConflict = true; break }
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

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]

    const formatDate = (dateStr) => {
        if (!dateStr) return t('booking.selectDate') || 'Gün / Ay / Yıl'
        const date = new Date(dateStr)
        return date.toLocaleDateString(i18n.language, { day: '2-digit', month: 'long', year: 'numeric' })
    }

    // Calendar helper functions - language aware
    const getDayNames = () => {
        const days = []
        const baseDate = new Date(2024, 0, 1) // Monday
        for (let i = 0; i < 7; i++) {
            const date = new Date(baseDate)
            date.setDate(baseDate.getDate() + i)
            days.push(date.toLocaleDateString(i18n.language, { weekday: 'short' }).slice(0, 2))
        }
        return days
    }

    const getMonthName = (date) => {
        return date.toLocaleDateString(i18n.language, { month: 'long', year: 'numeric' })
    }

    const renderCalendar = (currentMonth, setCurrentMonth, selectedDate, onSelect, minDateStr) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDay = new Date(year, month, 1).getDay()
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1

        const minDate = minDateStr ? new Date(minDateStr) : today
        const dayNames = getDayNames()

        return (
            <div className="hero-calendar-dropdown">
                <div className="hero-calendar-header">
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(new Date(year, month - 1, 1)) }}>◀</button>
                    <span>{getMonthName(currentMonth)}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(new Date(year, month + 1, 1)) }}>▶</button>
                </div>
                <div className="hero-calendar-days-header">
                    {dayNames.map((d, i) => <span key={i}>{d}</span>)}
                </div>
                <div className="hero-calendar-grid">
                    {[...Array(adjustedFirstDay)].map((_, i) => <span key={`e-${i}`} className="hero-cal-day empty"></span>)}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1
                        const date = new Date(year, month, day)
                        const dateStr = date.toISOString().split('T')[0]
                        const isPast = date < today
                        const isBusy = isDateBusy(date)
                        const isBeforeMin = date < minDate
                        const isSelected = selectedDate === dateStr
                        const isToday = date.toDateString() === today.toDateString()
                        const isDisabled = isPast || isBusy || isBeforeMin

                        return (
                            <span
                                key={day}
                                className={`hero-cal-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${isBusy ? 'busy' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (!isDisabled) onSelect(dateStr)
                                }}
                            >
                                {day}
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    }

    const heroBg = propertyData.heroImage || "/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png"
    const heroBgWithCache = heroBg.startsWith('/uploads') ? `${heroBg}?t=${Date.now()}` : heroBg

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

                <div className="booking-bar-container">
                    <form className="booking-bar-form" onSubmit={handleSubmit}>
                        {/* Giriş Tarihi */}
                        <div className="bar-field date-field-wrapper" ref={checkInRef}>
                            <label>{t('booking.checkIn')}</label>
                            <div 
                                className="date-selector"
                                onClick={() => {
                                    setShowCheckOutCalendar(false)
                                    setShowGuestPanel(false)
                                    setShowCheckInCalendar(prev => !prev)
                                }}
                            >
                                <span className="date-text">{formatDate(bookingData.checkIn)}</span>
                                <span className="date-icon">📅</span>
                            </div>
                            {showCheckInCalendar && renderCalendar(
                                checkInMonth,
                                setCheckInMonth,
                                bookingData.checkIn,
                                (date) => {
                                    setBookingData(prev => ({
                                        ...prev,
                                        checkIn: date,
                                        checkOut: prev.checkOut && new Date(prev.checkOut) <= new Date(date) ? '' : prev.checkOut
                                    }))
                                    setShowCheckInCalendar(false)
                                    setTimeout(() => setShowCheckOutCalendar(true), 150)
                                },
                                todayStr
                            )}
                        </div>

                        {/* Çıkış Tarihi */}
                        <div className="bar-field date-field-wrapper" ref={checkOutRef}>
                            <label>{t('booking.checkOut')}</label>
                            <div 
                                className="date-selector"
                                onClick={() => {
                                    setShowCheckInCalendar(false)
                                    setShowGuestPanel(false)
                                    setShowCheckOutCalendar(prev => !prev)
                                }}
                            >
                                <span className="date-text">{formatDate(bookingData.checkOut)}</span>
                                <span className="date-icon">📅</span>
                            </div>
                            {showCheckOutCalendar && renderCalendar(
                                checkOutMonth,
                                setCheckOutMonth,
                                bookingData.checkOut,
                                (date) => {
                                    setBookingData(prev => ({ ...prev, checkOut: date }))
                                    setShowCheckOutCalendar(false)
                                },
                                bookingData.checkIn || todayStr
                            )}
                        </div>

                        {/* Kişi Sayısı */}
                        <div className="bar-field guest-field-wrapper" ref={guestPanelRef}>
                            <label>{t('booking.guests')}</label>
                            <div className="guest-trigger" onClick={() => { setShowCheckInCalendar(false); setShowCheckOutCalendar(false); setShowGuestPanel(prev => !prev) }}>
                                <span className="guest-text">{bookingData.adults + bookingData.children} Kişi ▼</span>
                            </div>
                            {showGuestPanel && (
                                <div className="guest-panel">
                                    <div className="guest-row">
                                        <span>{t('booking.adults')}</span>
                                        <div className="guest-controls">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('adults', 'dec') }} disabled={bookingData.adults <= 1}>−</button>
                                            <span>{bookingData.adults}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('adults', 'inc') }} disabled={bookingData.adults >= 6}>+</button>
                                        </div>
                                    </div>
                                    <div className="guest-row">
                                        <span>{t('booking.children')}</span>
                                        <div className="guest-controls">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'dec') }} disabled={bookingData.children <= 0}>−</button>
                                            <span>{bookingData.children}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); updateCount('children', 'inc') }} disabled={bookingData.children >= 3}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="bar-submit-btn">{t('booking.search')}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Hero
