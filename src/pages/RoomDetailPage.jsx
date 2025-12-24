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
                            {!isGuestConfirmed && (
                                <div className="calendar-lock-overlay">
                                    <p>Lütfen devam etmek için önce kişi sayısını seçip onaylayın.</p>
                                </div>
                            )}
                            <div className="calendar-header">
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
                            {/* Amenities / Olanaklar Section */}
                            <div className="amenities-summary-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '16px', color: '#1a362d', marginBottom: '15px', fontWeight: '700' }}>Tesis Olanakları</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {adminSettings.getPropertyData().amenities.map(amenity => (
                                        <div key={amenity.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569' }}>
                                            <span style={{ color: '#22c55e', fontSize: '16px' }}>✓</span>
                                            {amenity.name}
                                        </div>
                                    ))}
                                </div>
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
                                <div className={`form-group guest-selection-box ${isGuestLocked ? 'locked' : ''} ${!isGuestConfirmed ? 'highlight' : ''}`} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <div className="guest-sub-selection">
                                            <label style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', display: 'block' }}>Yetişkin (Maks 6)</label>
                                            <div className="guests-input" style={{ width: '100%', justifyContent: 'space-between' }}>
                                                <button type="button" onClick={() => !isGuestLocked && setAdults(Math.max(1, adults - 1))} disabled={isGuestLocked || adults <= 1}>-</button>
                                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{adults}</span>
                                                <button type="button" onClick={() => !isGuestLocked && (adults + children < 8) && adults < 6 && setAdults(adults + 1)} disabled={isGuestLocked || adults >= 6 || (adults + children >= 8)}>+</button>
                                            </div>
                                        </div>
                                        <div className="guest-sub-selection">
                                            <label style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', display: 'block' }}>Çocuk (Maks 3)</label>
                                            <div className="guests-input" style={{ width: '100%', justifyContent: 'space-between' }}>
                                                <button type="button" onClick={() => !isGuestLocked && setChildren(Math.max(0, children - 1))} disabled={isGuestLocked || children <= 0}>-</button>
                                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{children}</span>
                                                <button type="button" onClick={() => !isGuestLocked && (adults + children < 8) && children < 3 && setChildren(children + 1)} disabled={isGuestLocked || children >= 3 || (adults + children >= 8)}>+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: isGuestConfirmed ? '#f8fafc' : '#f0fdf4', borderRadius: '12px', border: isGuestConfirmed ? '1px solid #e2e8f0' : '2px solid #22c55e' }}>
                                        {!isGuestConfirmed && (
                                            <button
                                                type="button"
                                                className="confirm-guests-btn"
                                                onClick={() => {
                                                    setIsGuestConfirmed(true);
                                                    setIsGuestLocked(true);
                                                }}
                                                style={{ flex: 1 }}
                                            >
                                                Kişi Sayısını Onayla
                                            </button>
                                        )}
                                        {isGuestConfirmed && (
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <span style={{ fontSize: '12px', color: '#1a362d', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></span>
                                                    {location.state?.preSelect ? 'Ana sayfada seçildi' : 'Seçildi'}
                                                </span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{adults} Yetişkin, {children} Çocuk</span>
                                            </div>
                                        )}
                                        {isGuestLocked && !location.state?.preSelect && isGuestConfirmed && (
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Kilitlendi</span>
                                        )}
                                    </div>
                                    {(adults + children >= 8) && !isGuestLocked && (
                                        <p style={{ color: '#f59e0b', fontSize: '11px', marginTop: '8px', fontWeight: '500' }}>⚠️ Maksimum kapasite (8 kişi) dolmuştur.</p>
                                    )}
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
