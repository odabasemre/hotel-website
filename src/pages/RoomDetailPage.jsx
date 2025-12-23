import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCustomAvailability } from '../hooks/useCustomAvailability'
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
    const [guests, setGuests] = useState(2)
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', note: '' })
    const [nameError, setNameError] = useState('')
    const [dateError, setDateError] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(false)

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
            if (pGuests) setGuests(Number(pGuests));
        }
        window.scrollTo(0, 0);
    }, [location.state]);

    // Toplam tutar hesabı
    const calculateTotal = () => {
        if (!checkIn || !checkOut) return 0;
        let total = 0;
        let temp = new Date(checkIn);
        while (temp < checkOut) {
            total += getPriceForDate(temp);
            temp.setDate(temp.getDate() + 1);
        }
        return total;
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

        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(selectedDate); setCheckOut(null);
        } else if (selectedDate > checkIn) {
            setCheckOut(selectedDate);
        } else {
            setCheckIn(selectedDate);
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

    // Name input handler: Only letters, spaces, and dots
    const handleNameChange = (e) => {
        const val = e.target.value;
        // Check for invalid characters before filtering
        if (/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s.]/.test(val)) {
            setNameError("İsimde özel karakter (? falan) olamaz.");
            return;
        }

        setNameError(""); // Clear error if typing valid chars
        setFormData(prev => ({ ...prev, name: val }));
    }

    const handlePhoneChange = (val) => {
        setFormData(prev => ({ ...prev, phone: val }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNameError("");
        setDateError("");

        // Name validation checks
        const name = formData.name.trim();

        if (name.length < 6) {
            setNameError("İsim daha uzun olmalı");
            return;
        }

        if (name.includes(' ')) {
            const parts = name.split(' ').filter(p => p.length > 0);
            if (parts.length < 2) {
                setNameError("Lütfen hem ad hem soyad giriniz.");
                return;
            }
        } else {
            setNameError("Lütfen ad ve soyad arasında boşluk bırakınız.");
            return;
        }

        if (!isPhoneValid) {
            // Error is already shown under the input, but we prevent submission
            return;
        }

        if (!checkIn || !checkOut) {
            setDateError(t('booking.selectDatesError'));
            return;
        }

        navigate('/checkout', { state: { bookingData: { ...formData, checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString(), guests } } })
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
                        <div className="calendar-section">
                            <div className="calendar-header">
                                <button onClick={prevMonth}><ChevronLeftIcon /></button>
                                <span>{currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}</span>
                                <button onClick={nextMonth}><ChevronRightIcon /></button>
                            </div>
                            <div className="calendar-grid detailed">
                                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => <div key={day} className="calendar-day-name">{day}</div>)}
                                {emptyDays.map(i => <div key={`empty-${i}`} className="calendar-day empty"></div>)}
                                {days.map(day => {
                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                    const isBusy = isDateBusy(date);
                                    const price = getPriceForDate(date);
                                    let className = `calendar-day ${isDateSelected(day) ? 'selected' : ''} ${isBusy ? 'busy' : ''}`;

                                    return (
                                        <div key={day} className={className} onClick={() => !isBusy && handleDateClick(day)}>
                                            <span className="day-num">{day}</span>
                                            {!isBusy && <span className="day-price">{price.toLocaleString()}₺</span>}
                                            {isBusy && <span className="day-price busy-label">DOLU</span>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="booking-form-section">
                            <form onSubmit={handleSubmit} className="booking-form">
                                <div className="reservation-summary-card">
                                    <h3>Rezervasyon Özeti</h3>
                                    <div className="summary-row">
                                        <span>Giriş - Çıkış:</span>
                                        <strong>{checkIn ? checkIn.toLocaleDateString('tr') : ' Seçiniz'} - {checkOut ? checkOut.toLocaleDateString('tr') : ' Seçiniz'}</strong>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Toplam Tutar:</span>
                                        <strong>{calculateTotal().toLocaleString()} TL</strong>
                                    </div>
                                    {dateError && (
                                        <div style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>
                                            {dateError}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>{t('booking.name')}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        required
                                        placeholder={t('booking.namePlaceholder')}
                                        className={nameError ? 'input-error' : ''}
                                    />
                                    {nameError && (
                                        <small style={{ display: 'block', marginTop: '5px', fontSize: '0.85rem', color: '#ff4d4d', fontWeight: '500' }}>
                                            {nameError}
                                        </small>
                                    )}
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
                                <div className="form-group">
                                    <label>{t('booking.guests')}</label>
                                    <div className="guests-input">
                                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                                        <span>{guests}</span>
                                        <button type="button" onClick={() => setGuests(Math.min(7, guests + 1))}>+</button>
                                    </div>
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
        </div>
    )
}

export default RoomDetailPage
