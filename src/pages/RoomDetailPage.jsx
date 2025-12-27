import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCustomAvailability } from '../hooks/useCustomAvailability'
import { adminSettings } from '../services/adminSettings'
import CustomPhoneInput from '../components/CustomPhoneInput'
import '../styles/pages/room-detail-page.css'

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
)
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
)
const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
)

function RoomDetailPage() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', note: '' })
    const [nameError, setNameError] = useState('')
    const [dateError, setDateError] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(false)

    // Promo Code State
    const [promoCode, setPromoCode] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState(null)
    const [promoError, setPromoError] = useState('')

    // Guest Flow State
    const [isGuestConfirmed, setIsGuestConfirmed] = useState(!!location.state?.preSelect)
    const [isGuestLocked, setIsGuestLocked] = useState(!!location.state?.preSelect)

    const { isDateBusy, getPriceForDate, settings } = useCustomAvailability();

    // Homepage'den gelen veriyi işle
    useEffect(() => {
        if (location.state?.preSelect) {
            const { checkIn: pIn, checkOut: pOut, guests: pGuests } = location.state.preSelect;
            if (pIn) {
                const cin = new Date(pIn);
                setCheckIn(cin);
                setCurrentDate(cin);
            }
            if (pOut) setCheckOut(new Date(pOut));
            if (location.state.preSelect.adults) setAdults(Number(location.state.preSelect.adults));
            if (location.state.preSelect.children !== undefined) setChildren(Number(location.state.preSelect.children));

            setIsGuestConfirmed(true);
            setIsGuestLocked(true);
        }
        window.scrollTo(0, 0);
    }, [location.state]);

    // Toplam tutar hesabı (İndirimsiz)
    const calculateRawTotal = () => {
        if (!checkIn || !checkOut) return 0;
        let total = 0;
        let temp = new Date(checkIn);
        while (temp < checkOut) {
            total += getPriceForDate(temp, adults, children);
            temp.setDate(temp.getDate() + 1);
        }
        return total;
    }

    // İndirimli toplam tutar
    const calculateFinalTotal = () => {
        const rawTotal = calculateRawTotal();
        if (!appliedDiscount) return rawTotal;
        return Math.max(0, rawTotal - appliedDiscount.amount);
    }

    // Promosyon Uygulama
    const handleApplyPromo = () => {
        setPromoError('');
        setAppliedDiscount(null);

        if (!promoCode.trim()) return;

        const promo = adminSettings.validatePromotion(promoCode.toUpperCase().trim());

        if (!promo) {
            setPromoError(t('booking.invalidPromo') || 'Geçersiz kupon kodu');
            return;
        }

        const rawTotal = calculateRawTotal();
        if (rawTotal === 0) {
            setPromoError('Lütfen önce tarih seçiniz');
            return;
        }

        let discountAmount = 0;
        if (promo.type === 'amount') {
            discountAmount = promo.value;
        } else if (promo.type === 'percent') {
            discountAmount = (rawTotal * promo.value) / 100;
        }

        setAppliedDiscount({
            code: promo.code,
            amount: discountAmount,
            type: promo.type,
            value: promo.value
        });
    }

    const nextMonth = () => {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        if (next <= new Date(2026, 9, 1)) setCurrentDate(next);
    }
    const prevMonth = () => {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        if (prev >= new Date()) setCurrentDate(prev);
    }

    const handleDateClick = (day) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        if (isDateBusy(selectedDate)) return;

        const today = new Date(); today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return;

        // Reset promo when dates change to re-calculate validation if needed (optional, keeping it simple)
        // setAppliedDiscount(null); 

        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(selectedDate); setCheckOut(null);
            setAppliedDiscount(null); // Reset promo on new selection
        } else if (selectedDate > checkIn) {
            setCheckOut(selectedDate);
            setAppliedDiscount(null); // Reset promo on new selection
        } else {
            setCheckIn(selectedDate);
            setAppliedDiscount(null); // Reset promo on new selection
        }
    }

    const isDateSelected = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        if (!checkIn) return false
        if (checkOut) return date >= checkIn && date <= checkOut
        return date.getTime() === checkIn.getTime()
    }

    const days = [...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).keys()].map(i => i + 1)
    const emptyDays = [...Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()).keys()]

    // Name/Surname input handler: Only letters
    const handleNameChange = (e) => {
        const { name, value } = e.target;
        if (/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s.]/.test(value)) {
            setNameError("İsim/Soyisimde özel karakter olamaz.");
            return;
        }
        setNameError("");
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handlePhoneChange = (val) => {
        setFormData(prev => ({ ...prev, phone: val }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNameError("");
        setDateError("");

        const fName = formData.firstName.trim();
        const lName = formData.lastName.trim();

        if (fName.length < 2 || lName.length < 2) {
            setNameError("Ad ve Soyad en az 2 karakter olmalıdır.");
            return;
        }


        if (!isPhoneValid) return;

        if (!isGuestConfirmed) {
            setDateError("Lütfen önce kişi sayısını onaylayın.");
            return;
        }

        if (!checkIn || !checkOut) {
            setDateError(t('booking.selectDatesError'));
            return;
        }

        navigate('/checkout', {
            state: {
                bookingData: {
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`, // Combine for backward compatibility
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

    return (
        <div className="room-detail-page">
            <div className="container">
                <div className="booking-container">
                    <div className="booking-header">
                        <Link to="/rooms" className="back-link"><ChevronLeftIcon /> {t('rooms.backToRooms')}</Link>
                        <h1>{t('booking.title')}</h1>
                        <p>{t('booking.subtitle')}</p>
                    </div>

                    <div className="booking-grid">
                        <div className={`calendar-section ${!isGuestConfirmed ? 'calendar-locked' : ''}`}>
                            {/* Calendar Section */}
                            <div className="calendar-header" style={{ opacity: isGuestConfirmed ? 1 : 0.4, pointerEvents: isGuestConfirmed ? 'auto' : 'none' }}>
                                <button type="button" onClick={prevMonth}><ChevronLeftIcon /></button>
                                <span>{currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}</span>
                                <button type="button" onClick={nextMonth}><ChevronRightIcon /></button>
                            </div>
                            <div className="calendar-grid detailed">
                                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => <div key={day} className="calendar-day-name">{day}</div>)}
                                {emptyDays.map(i => <div key={`empty-${i}`} className="calendar-day empty"></div>)}
                                {days.map(day => {
                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                    const today = new Date(); today.setHours(0, 0, 0, 0);
                                    const isPast = date < today;
                                    const isBusy = isDateBusy(date);
                                    const price = getPriceForDate(date, adults, children);
                                    let className = `calendar-day ${isDateSelected(day) ? 'selected' : ''} ${isBusy ? 'busy' : ''} ${isPast ? 'past-date' : ''}`;

                                    return (
                                        <div
                                            key={day}
                                            className={className}
                                            onClick={() => !isBusy && !isPast && isGuestConfirmed && handleDateClick(day)}
                                            style={isPast ? { cursor: 'default', opacity: 0.5 } : {}}
                                        >
                                            <span className="day-num">{day}</span>
                                            {!isBusy && !isPast && isGuestConfirmed && <span className="day-price">{price.toLocaleString()}₺</span>}
                                            {isBusy && !isPast && isGuestConfirmed && <span className="day-price busy-label">DOLU</span>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="booking-form-section">
                            {/* Guest Selection Card - Above Summary */}
                            <div className="guest-selection-card-floating" style={{
                                position: 'relative',
                                zIndex: isGuestConfirmed ? 1 : 10,
                                marginBottom: '24px',
                                background: isGuestConfirmed 
                                    ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
                                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                backdropFilter: 'blur(10px)',
                                border: isGuestConfirmed ? '2px solid #cbd5e1' : '3px solid #1a362d',
                                borderRadius: '20px',
                                padding: '28px',
                                boxShadow: isGuestConfirmed 
                                    ? '0 4px 12px rgba(0,0,0,0.08)' 
                                    : '0 12px 40px rgba(26, 54, 45, 0.25), 0 0 0 1px rgba(26, 54, 45, 0.1)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isGuestConfirmed ? 'scale(0.98)' : 'scale(1)'
                            }}>
                                <h3 style={{ 
                                    fontSize: '17px', 
                                    fontWeight: '800', 
                                    color: isGuestConfirmed ? '#475569' : '#1a362d',
                                    marginBottom: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    letterSpacing: '-0.3px'
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{
                                        filter: isGuestConfirmed ? 'none' : 'drop-shadow(0 2px 4px rgba(26, 54, 45, 0.2))'
                                    }}>
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    Kişi Sayısı Seçimi
                                </h3>
                                
                                {!isGuestConfirmed ? (
                                    <>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                                            <div>
                                                <label style={{ 
                                                    fontSize: '14px', 
                                                    color: '#1e293b', 
                                                    marginBottom: '10px', 
                                                    display: 'block', 
                                                    fontWeight: '600',
                                                    letterSpacing: '-0.2px'
                                                }}>
                                                    Yetişkin <span style={{color: '#94a3b8', fontWeight: '500'}}>(Maks 6)</span>
                                                </label>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between',
                                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '14px',
                                                    padding: '14px 18px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} disabled={adults <= 1} style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        background: adults <= 1 ? '#e2e8f0' : 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                                                        color: adults <= 1 ? '#94a3b8' : 'white',
                                                        fontSize: '22px',
                                                        fontWeight: '600',
                                                        cursor: adults <= 1 ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: adults <= 1 ? 'none' : '0 4px 12px rgba(26, 54, 45, 0.25)',
                                                        transform: adults <= 1 ? 'none' : 'translateY(0)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (adults > 1) {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(26, 54, 45, 0.35)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (adults > 1) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(26, 54, 45, 0.25)';
                                                        }
                                                    }}
                                                    >−</button>
                                                    <span style={{ 
                                                        fontWeight: '800', 
                                                        fontSize: '24px', 
                                                        color: '#1a362d',
                                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                    }}>{adults}</span>
                                                    <button type="button" onClick={() => (adults + children < 8) && adults < 6 && setAdults(adults + 1)} disabled={adults >= 6 || (adults + children >= 8)} style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        background: (adults >= 6 || adults + children >= 8) ? '#e2e8f0' : 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                                                        color: (adults >= 6 || adults + children >= 8) ? '#94a3b8' : 'white',
                                                        fontSize: '22px',
                                                        fontWeight: '600',
                                                        cursor: (adults >= 6 || adults + children >= 8) ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: (adults >= 6 || adults + children >= 8) ? 'none' : '0 4px 12px rgba(26, 54, 45, 0.25)',
                                                        transform: (adults >= 6 || adults + children >= 8) ? 'none' : 'translateY(0)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (adults < 6 && adults + children < 8) {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(26, 54, 45, 0.35)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (adults < 6 && adults + children < 8) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(26, 54, 45, 0.25)';
                                                        }
                                                    }}
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ 
                                                    fontSize: '14px', 
                                                    color: '#1e293b', 
                                                    marginBottom: '10px', 
                                                    display: 'block', 
                                                    fontWeight: '600',
                                                    letterSpacing: '-0.2px'
                                                }}>
                                                    Çocuk <span style={{color: '#94a3b8', fontWeight: '500'}}>(Maks 3)</span>
                                                </label>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between',
                                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '14px',
                                                    padding: '14px 18px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} disabled={children <= 0} style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        background: children <= 0 ? '#e2e8f0' : 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                                                        color: children <= 0 ? '#94a3b8' : 'white',
                                                        fontSize: '22px',
                                                        fontWeight: '600',
                                                        cursor: children <= 0 ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: children <= 0 ? 'none' : '0 4px 12px rgba(26, 54, 45, 0.25)',
                                                        transform: children <= 0 ? 'none' : 'translateY(0)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (children > 0) {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(26, 54, 45, 0.35)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (children > 0) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(26, 54, 45, 0.25)';
                                                        }
                                                    }}
                                                    >−</button>
                                                    <span style={{ 
                                                        fontWeight: '800', 
                                                        fontSize: '24px', 
                                                        color: '#1a362d',
                                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                    }}>{children}</span>
                                                    <button type="button" onClick={() => (adults + children < 8) && children < 3 && setChildren(children + 1)} disabled={children >= 3 || (adults + children >= 8)} style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        background: (children >= 3 || adults + children >= 8) ? '#e2e8f0' : 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                                                        color: (children >= 3 || adults + children >= 8) ? '#94a3b8' : 'white',
                                                        fontSize: '22px',
                                                        fontWeight: '600',
                                                        cursor: (children >= 3 || adults + children >= 8) ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: (children >= 3 || adults + children >= 8) ? 'none' : '0 4px 12px rgba(26, 54, 45, 0.25)',
                                                        transform: (children >= 3 || adults + children >= 8) ? 'none' : 'translateY(0)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (children < 3 && adults + children < 8) {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(26, 54, 45, 0.35)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (children < 3 && adults + children < 8) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(26, 54, 45, 0.25)';
                                                        }
                                                    }}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {(adults + children >= 8) && (
                                            <p style={{ 
                                                color: '#ea580c', 
                                                fontSize: '13px', 
                                                marginBottom: '18px', 
                                                fontWeight: '600', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px',
                                                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                                                padding: '12px 16px',
                                                borderRadius: '10px',
                                                border: '1px solid #fed7aa'
                                            }}>
                                                <span style={{ fontSize: '16px' }}>⚠️</span>
                                                Maksimum kapasite (8 kişi) dolmuştur.
                                            </p>
                                        )}
                                        
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsGuestConfirmed(true);
                                                setIsGuestLocked(true);
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '18px',
                                                background: 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '14px',
                                                fontSize: '16px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 8px 20px rgba(26, 54, 45, 0.3)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                letterSpacing: '0.3px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-3px)';
                                                e.target.style.boxShadow = '0 12px 28px rgba(26, 54, 45, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 8px 20px rgba(26, 54, 45, 0.3)';
                                            }}
                                        >
                                            <span style={{ position: 'relative', zIndex: 1 }}>
                                                Kişi Sayısını Onayla ve Devam Et →
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                                        borderRadius: '12px',
                                        border: '1px solid #86efac'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ 
                                                width: '32px', 
                                                height: '32px', 
                                                borderRadius: '50%', 
                                                background: '#22c55e',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '16px'
                                            }}>✓</div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a362d' }}>
                                                    {adults} Yetişkin{children > 0 ? `, ${children} Çocuk` : ''}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>
                                                    {location.state?.preSelect ? 'Ana sayfadan seçildi' : 'Seçim onaylandı'}
                                                </div>
                                            </div>
                                        </div>
                                        {!location.state?.preSelect && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsGuestConfirmed(false);
                                                    setIsGuestLocked(false);
                                                    setCheckIn(null);
                                                    setCheckOut(null);
                                                }}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: 'white',
                                                    color: '#64748b',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#f8fafc';
                                                    e.target.style.borderColor = '#cbd5e1';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'white';
                                                    e.target.style.borderColor = '#e2e8f0';
                                                }}
                                            >
                                                Değiştir
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="booking-form">
                                <div className="reservation-summary-card">
                                    <h3>Rezervasyon Özeti</h3>
                                    <div className="summary-row">
                                        <span>Giriş - Çıkış:</span>
                                        <strong>{checkIn ? checkIn.toLocaleDateString('tr') : ' Seçiniz'} - {checkOut ? checkOut.toLocaleDateString('tr') : ' Seçiniz'}</strong>
                                    </div>

                                    {/* Promosyon Kodu Alanı */}
                                    <div className="promo-code-section" style={{ margin: '15px 0', padding: '10px 0', borderTop: '1px dashed #eee', borderBottom: '1px dashed #eee' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                type="text"
                                                placeholder="İndirim Kodu / Promosyon"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px 12px',
                                                    border: promoError ? '1px solid #ff4d4d' : '1px solid #ddd',
                                                    borderRadius: '6px',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyPromo}
                                                style={{
                                                    background: '#333',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    padding: '0 15px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Uygula
                                            </button>
                                        </div>
                                        {promoError && <div style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{promoError}</div>}
                                        {appliedDiscount && (
                                            <div style={{ color: '#008234', fontSize: '13px', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>✓ Kod uygulandı ({appliedDiscount.code})</span>
                                                <span>-{appliedDiscount.amount.toLocaleString()} TL</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="summary-row total">
                                        <span>Toplam Tutar:</span>
                                        <strong>{calculateFinalTotal().toLocaleString()} TL</strong>
                                    </div>
                                    {appliedDiscount && calculateRawTotal() > 0 && (
                                        <div style={{ textAlign: 'right', fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
                                            {calculateRawTotal().toLocaleString()} TL
                                        </div>
                                    )}

                                    {dateError && (
                                        <div style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>
                                            {dateError}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label style={{ marginBottom: '5px', display: 'block' }}>{t('booking.name') || 'Ad'}</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleNameChange}
                                                required
                                                placeholder="Adınız"
                                                className={nameError ? 'input-error' : ''}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ marginBottom: '5px', display: 'block' }}>Soyad</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleNameChange}
                                                required
                                                placeholder="Soyadınız"
                                                className={nameError ? 'input-error' : ''}
                                            />
                                        </div>
                                    </div>
                                    {nameError && (
                                        <small style={{ display: 'block', marginTop: '5px', fontSize: '0.85rem', color: '#ff4d4d', fontWeight: '500' }}>
                                            {nameError}
                                        </small>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('booking.phone')}</label>
                                    <CustomPhoneInput
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        onValidation={setIsPhoneValid}
                                        placeholder={t('booking.phonePlaceholder')}
                                    />
                                </div>
                                <button type="submit" className="submit-booking-btn">
                                    <span className="icon"><CreditCardIcon /></span>
                                    {t('booking.submitPayment')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RoomDetailPage
