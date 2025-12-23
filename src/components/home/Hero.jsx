import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCustomAvailability } from '../../hooks/useCustomAvailability'

function Hero() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { isDateBusy } = useCustomAvailability()

    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        adults: '2',
        children: '0'
    })

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
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

    return (
        <section className="hero" id="home">
            <div className="hero-background">
                <img src="/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png" alt="Hotel View" />
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

                        <div className="bar-field">
                            <label>{t('booking.adults')}</label>
                            <select name="adults" value={bookingData.adults} onChange={handleChange}>
                                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
                        </div>

                        <div className="bar-field">
                            <label>{t('booking.children')}</label>
                            <select name="children" value={bookingData.children} onChange={handleChange}>
                                {[0, 1, 2, 3, 4].map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
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
