import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Calendar icon for date inputs
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

function Hero() {
    const { t } = useTranslation()
    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        adults: '2',
        children: '0'
    })

    const handleChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Booking logic would go here
        console.log('Booking data:', bookingData)
        alert('Reservation request submitted!')
    }

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0]

    return (
        <section className="hero" id="home">
            {/* Background Image */}
            <div className="hero-background">
                <img
                    src="/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png"
                    alt="Hotel with mountain view"
                />
                <div className="hero-overlay"></div>
            </div>

            {/* Hero Content */}
            <div className="hero-content">
                <h1 className="hero-title">{t('hero.title')}</h1>
                <p className="hero-subtitle">{t('hero.subtitle')}</p>
                <a href="#about" className="hero-cta">
                    {t('hero.cta')}
                </a>
            </div>

            {/* Booking Form */}
            <div className="booking-section" id="booking">
                <div className="container">
                    <form className="booking-form" onSubmit={handleSubmit}>
                        {/* Check In */}
                        <div className="booking-field">
                            <label className="booking-label">{t('booking.checkIn')}</label>
                            <input
                                type="date"
                                name="checkIn"
                                className="booking-input"
                                value={bookingData.checkIn}
                                onChange={handleChange}
                                min={today}
                                required
                            />
                        </div>

                        {/* Check Out */}
                        <div className="booking-field">
                            <label className="booking-label">{t('booking.checkOut')}</label>
                            <input
                                type="date"
                                name="checkOut"
                                className="booking-input"
                                value={bookingData.checkOut}
                                onChange={handleChange}
                                min={bookingData.checkIn || today}
                                required
                            />
                        </div>

                        {/* Adults */}
                        <div className="booking-field">
                            <label className="booking-label">{t('booking.adults')}</label>
                            <select
                                name="adults"
                                className="booking-select"
                                value={bookingData.adults}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        {/* Children */}
                        <div className="booking-field">
                            <label className="booking-label">{t('booking.children')}</label>
                            <select
                                name="children"
                                className="booking-select"
                                value={bookingData.children}
                                onChange={handleChange}
                            >
                                {[0, 1, 2, 3, 4].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="booking-submit">
                            {t('booking.search')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Hero
