import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCustomAvailability } from '../hooks/useCustomAvailability'
import { adminSettings } from '../services/adminSettings'
import CustomPhoneInput from '../components/CustomPhoneInput'
import roomData from '../data/roomsData'
import '../styles/pages/room-detail-page.css'

// SVG Icons
const Icons = {
    ChevronLeft: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    ),
    ChevronRight: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
        </svg>
    ),
    Users: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Bed: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" /><path d="M6 8v9" />
        </svg>
    ),
    Bath: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
            <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" />
            <path d="M4 21h16" />
        </svg>
    ),
    Maximize: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
    ),
    Calendar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
        </svg>
    ),
    CreditCard: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    Mountain: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    ),
    Wifi: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" />
        </svg>
    ),
    Tv: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="15" rx="2" />
            <polyline points="17 2 12 7 7 2" />
        </svg>
    ),
    Flame: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
    ),
    Utensils: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
        </svg>
    ),
    Car: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
        </svg>
    ),
    Sunset: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 10V2" /><path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" /><path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" />
            <path d="m8 6 4-4 4 4" /><path d="M16 18a4 4 0 0 0-8 0" />
        </svg>
    ),
    Wind: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </svg>
    ),
    Shirt: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
    )
}

// Feature icon mapping
const featureIconMap = {
    riverView: Icons.Mountain,
    privateBalcony: Icons.Sunset,
    kitchen: Icons.Utensils,
    heating: Icons.Flame,
    wifi: Icons.Wifi,
    tv: Icons.Tv,
    hairDryer: Icons.Wind,
    towels: Icons.Shirt,
    parking: Icons.Car
}

function RoomDetailPage() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    // States
    const [currentDate, setCurrentDate] = useState(new Date())
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', note: '' })
    const [nameError, setNameError] = useState('')
    const [dateError, setDateError] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [promoCode, setPromoCode] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState(null)
    const [promoError, setPromoError] = useState('')
    const [isGuestConfirmed, setIsGuestConfirmed] = useState(!!location.state?.preSelect)
    const [isGuestLocked, setIsGuestLocked] = useState(!!location.state?.preSelect)

    // Load property data
    useEffect(() => {
        const loadData = async () => {
            const data = await adminSettings.getPropertyDataAsync()
            setPropertyData(data)
        }
        loadData()
    }, [])

    const { isDateBusy, isDateAlmostFull, getPriceForDate } = useCustomAvailability()

    // Get room images
    const rooms = propertyData?.siteImages?.rooms || {}
    const roomImages = Object.keys(rooms)
        .filter(key => key.startsWith('slide') && rooms[key])
        .sort((a, b) => parseInt(a.replace('slide', '')) - parseInt(b.replace('slide', '')))
        .map(key => rooms[key])

    // Room features
    const featuresList = roomData?.features ? [
        'riverView', 'privateBalcony', 'kitchen', 'heating', 'wifi', 'tv', 'hairDryer', 'towels', 'parking'
    ].filter(key => roomData.features.includes(key)) : []

    // Process homepage preselect data
    useEffect(() => {
        if (location.state?.preSelect) {
            const { checkIn: pIn, checkOut: pOut } = location.state.preSelect
            if (pIn) {
                const cin = new Date(pIn)
                setCheckIn(cin)
                setCurrentDate(cin)
            }
            if (pOut) setCheckOut(new Date(pOut))
            if (location.state.preSelect.adults) setAdults(Number(location.state.preSelect.adults))
            if (location.state.preSelect.children !== undefined) setChildren(Number(location.state.preSelect.children))
            setIsGuestConfirmed(true)
            setIsGuestLocked(true)
        }
        window.scrollTo(0, 0)
    }, [location.state])

    // Price calculations
    const calculateRawTotal = () => {
        if (!checkIn || !checkOut) return 0
        let total = 0
        let temp = new Date(checkIn)
        while (temp < checkOut) {
            total += getPriceForDate(temp, adults, children)
            temp.setDate(temp.getDate() + 1)
        }
        return total
    }

    const calculateFinalTotal = () => {
        const rawTotal = calculateRawTotal()
        if (!appliedDiscount) return rawTotal
        return Math.max(0, rawTotal - appliedDiscount.amount)
    }

    const handleApplyPromo = () => {
        setPromoError('')
        setAppliedDiscount(null)
        if (!promoCode.trim()) return

        const promo = adminSettings.validatePromotion(promoCode.toUpperCase().trim())
        if (!promo) {
            setPromoError(t('booking.invalidPromo') || 'Geçersiz kupon kodu')
            return
        }

        const rawTotal = calculateRawTotal()
        if (rawTotal === 0) {
            setPromoError('Lütfen önce tarih seçiniz')
            return
        }

        let discountAmount = promo.type === 'amount' ? promo.value : (rawTotal * promo.value) / 100
        setAppliedDiscount({ code: promo.code, amount: discountAmount, type: promo.type, value: promo.value })
    }

    // Calendar navigation
    const nextMonth = () => {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        setCurrentDate(next)
    }

    const prevMonth = () => {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        // Sadece geçmiş ayları (bugünden önceki ayları) engelle
        // Ama bugünün içinde olduğu ayı ve gelecekteki ayları göster
        const lastDayOfPrevMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 0)
        if (lastDayOfPrevMonth >= today) {
            setCurrentDate(prev)
        }
    }

    const handleDateClick = (day) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        selectedDate.setHours(0, 0, 0, 0) // Saati sıfırla
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) return

        if (!checkIn || (checkIn && checkOut)) {
            if (isDateBusy(selectedDate)) return
            setCheckIn(selectedDate)
            setCheckOut(null)
            setAppliedDiscount(null)
        } else if (selectedDate > checkIn) {
            let hasConflict = false
            let temp = new Date(checkIn)
            temp.setDate(temp.getDate() + 1)
            while (temp < selectedDate) {
                if (isDateBusy(temp)) { hasConflict = true; break }
                temp.setDate(temp.getDate() + 1)
            }
            if (hasConflict) {
                alert('Seçtiğiniz tarihler arasında dolu günler bulunmaktadır.')
                return
            }
            setCheckOut(selectedDate)
            setAppliedDiscount(null)
        } else {
            if (isDateBusy(selectedDate)) return
            setCheckIn(selectedDate)
            setAppliedDiscount(null)
        }
    }

    const isDateSelected = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        date.setHours(0, 0, 0, 0) // Saati sıfırla
        if (!checkIn) return false
        if (checkOut) return date >= checkIn && date < checkOut // Çıkış günü dahil değil (o gün çıkıyorsun)
        return date.getTime() === checkIn.getTime()
    }

    const days = [...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).keys()].map(i => i + 1)
    // Pazartesi = 0, Pazar = 6 olacak şekilde ayarla (takvim Pazartesi ile başlıyor)
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    const emptyDays = [...Array(adjustedFirstDay).keys()]

    // Form handlers
    const handleNameChange = (e) => {
        const { name, value } = e.target
        if (/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s.]/.test(value)) {
            setNameError("İsim/Soyisimde özel karakter olamaz.")
            return
        }
        setNameError("")
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setNameError("")
        setDateError("")

        if (formData.firstName.trim().length < 2 || formData.lastName.trim().length < 2) {
            setNameError("Ad ve Soyad en az 2 karakter olmalıdır.")
            return
        }

        if (!isPhoneValid) return

        if (!isGuestConfirmed) {
            setDateError("Lütfen önce kişi sayısını onaylayın.")
            return
        }

        if (!checkIn || !checkOut) {
            setDateError(t('booking.selectDatesError'))
            return
        }

        navigate('/checkout', {
            state: {
                bookingData: {
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`,
                    checkIn: checkIn.toISOString(),
                    checkOut: checkOut.toISOString(),
                    adults,
                    children,
                    guests: adults + children,
                    discount: appliedDiscount,
                    totalPrice: calculateFinalTotal()
                }
            }
        })
    }

    const nightCount = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0

    return (
        <div className="rdp">
            {/* Main Content */}
            <main className="rdp-main">
                <div className="rdp-container">
                    <div className="rdp-booking-title-header">
                        <h1>Rezervasyon</h1>
                        <p>Giriş ve çıkış tarihlerinizi belirleyerek anında müsaitlik kontrolü yapabilir ve rezervasyonunuzu tamamlayabilirsiniz.</p>
                    </div>

                    <div className="rdp-layout-two-column">
                        {/* Left: Calendar */}
                        <div className="rdp-calendar-column">
                            <div className="rdp-calendar-card">
                                <div className={`rdp-calendar-section ${!isGuestConfirmed ? 'locked' : ''}`}>
                                    <div className="rdp-calendar-header">
                                        <button onClick={prevMonth}><Icons.ChevronLeft /></button>
                                        <span>{currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}</span>
                                        <button onClick={nextMonth}><Icons.ChevronRight /></button>
                                    </div>

                                    <div className="rdp-calendar">
                                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
                                            <div key={d} className="rdp-cal-day-name">{d}</div>
                                        ))}
                                        {emptyDays.map(i => <div key={`e-${i}`} className="rdp-cal-day empty" />)}
                                        {days.map(day => {
                                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                                            const today = new Date(); today.setHours(0, 0, 0, 0)
                                            const isPast = date < today
                                            const isBusy = isDateBusy(date)
                                            const isAlmostFull = isDateAlmostFull(date)
                                            const price = getPriceForDate(date, adults, children)
                                            const canSelectAsCheckout = checkIn && !checkOut && date > checkIn && isBusy
                                            const isClickable = !isPast && isGuestConfirmed && (!isBusy || canSelectAsCheckout)

                                            return (
                                                <div
                                                    key={day}
                                                    className={`rdp-cal-day ${isDateSelected(day) ? 'selected' : ''} ${isBusy && !canSelectAsCheckout ? 'busy' : ''} ${isPast ? 'past' : ''}`}
                                                    onClick={() => isClickable && handleDateClick(day)}
                                                >
                                                    {isAlmostFull && !isBusy && !isPast && (
                                                        <span className="rdp-cal-almost">Dolmak Üzere !</span>
                                                    )}
                                                    <span className="rdp-cal-num">{day}</span>
                                                    {!isBusy && !isPast && isGuestConfirmed && (
                                                        <span className="rdp-cal-price">{price.toLocaleString('tr-TR')} ₺</span>
                                                    )}
                                                    {isBusy && !isPast && <span className="rdp-cal-busy">Dolu</span>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Booking Info */}
                        <div className="rdp-booking-column">
                            <div className="rdp-booking-card">
                                {/* Guest Selection */}
                                <div className={`rdp-guest-section ${isGuestConfirmed ? 'confirmed' : ''}`}>
                                    <div className="rdp-guest-header">
                                        <Icons.Users />
                                        <span>Misafir Sayısı</span>
                                    </div>

                                    {!isGuestConfirmed ? (
                                        <>
                                            <div className="rdp-guest-controls">
                                                <div className="rdp-guest-control">
                                                    <label>Yetişkin</label>
                                                    <div className="rdp-counter-control">
                                                        <button onClick={() => setAdults(Math.max(1, adults - 1))} disabled={adults <= 1}>−</button>
                                                        <span>{adults}</span>
                                                        <button onClick={() => adults + children < 8 && adults < 6 && setAdults(adults + 1)} disabled={adults >= 6 || adults + children >= 8}>+</button>
                                                    </div>
                                                </div>
                                                <div className="rdp-guest-control">
                                                    <label>Çocuk</label>
                                                    <div className="rdp-counter-control">
                                                        <button onClick={() => setChildren(Math.max(0, children - 1))} disabled={children <= 0}>−</button>
                                                        <span>{children}</span>
                                                        <button onClick={() => adults + children < 8 && children < 3 && setChildren(children + 1)} disabled={children >= 3 || adults + children >= 8}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {adults + children >= 8 && (
                                                <p className="rdp-warning">Maksimum kapasite (8 kişi) dolmuştur.</p>
                                            )}
                                            <button className="rdp-btn rdp-btn-primary" onClick={() => { setIsGuestConfirmed(true); setIsGuestLocked(true) }}>
                                                Onayla ve Devam Et
                                            </button>
                                        </>
                                    ) : (
                                        <div className="rdp-guest-confirmed">
                                            <div className="rdp-guest-info">
                                                <div className="rdp-check-icon"><Icons.Check /></div>
                                                <span>{adults} Yetişkin{children > 0 ? `, ${children} Çocuk` : ''}</span>
                                            </div>
                                            {!location.state?.preSelect && (
                                                <button className="rdp-btn-link" onClick={() => { setIsGuestConfirmed(false); setIsGuestLocked(false); setCheckIn(null); setCheckOut(null) }}>
                                                    Değiştir
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                {checkIn && checkOut && (
                                    <div className="rdp-summary">
                                        <div className="rdp-summary-row">
                                            <span><Icons.Calendar /> Giriş</span>
                                            <strong>{checkIn.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</strong>
                                        </div>
                                        <div className="rdp-summary-row">
                                            <span><Icons.Calendar /> Çıkış</span>
                                            <strong>{checkOut.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</strong>
                                        </div>
                                        <div className="rdp-summary-row">
                                            <span>{nightCount} gece</span>
                                            <strong>{calculateRawTotal().toLocaleString()}₺</strong>
                                        </div>

                                        {/* Promo Code */}
                                        <div className="rdp-promo">
                                            <input
                                                type="text"
                                                placeholder="İndirim kodu"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            <button onClick={handleApplyPromo}>Uygula</button>
                                        </div>
                                        {promoError && <p className="rdp-error">{promoError}</p>}
                                        {appliedDiscount && (
                                            <div className="rdp-discount">
                                                <span>✓ {appliedDiscount.code}</span>
                                                <span>-{appliedDiscount.amount.toLocaleString()}₺</span>
                                            </div>
                                        )}

                                        <div className="rdp-total">
                                            <span>Toplam</span>
                                            <div>
                                                <strong>{calculateFinalTotal().toLocaleString()}₺</strong>
                                                {appliedDiscount && <del>{calculateRawTotal().toLocaleString()}₺</del>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Booking Form */}
                                <form className="rdp-form" onSubmit={handleSubmit}>
                                    <div className="rdp-form-row">
                                        <div className="rdp-form-group">
                                            <label>Ad</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleNameChange} placeholder="Adınız" required />
                                        </div>
                                        <div className="rdp-form-group">
                                            <label>Soyad</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleNameChange} placeholder="Soyadınız" required />
                                        </div>
                                    </div>
                                    {nameError && <p className="rdp-error">{nameError}</p>}

                                    <div className="rdp-form-group">
                                        <label>E-posta</label>
                                        <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="ornek@email.com" required />
                                    </div>

                                    <div className="rdp-form-group">
                                        <label>Telefon</label>
                                        <CustomPhoneInput
                                            value={formData.phone}
                                            onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                                            onValidation={setIsPhoneValid}
                                            placeholder={t('booking.phonePlaceholder')}
                                        />
                                    </div>

                                    {dateError && <p className="rdp-error">{dateError}</p>}

                                    <button type="submit" className="rdp-btn rdp-btn-submit">
                                        <Icons.CreditCard />
                                        {t('booking.submitPayment')}
                                    </button>
                                </form>
                            </div>

                            <Link to="/rooms" className="rdp-back">
                                <Icons.ChevronLeft />
                                {t('rooms.backToRooms')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RoomDetailPage
