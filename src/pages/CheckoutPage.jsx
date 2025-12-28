import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminSettings } from '../services/adminSettings'
import { useCustomAvailability } from '../hooks/useCustomAvailability'
import '../styles/pages/checkout-page.css'

function CheckoutPage() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const { getPriceForDate } = useCustomAvailability()

    const { bookingData } = location.state || {}
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        if (!bookingData) navigate('/rooms/bungalov')
        window.scrollTo(0, 0)
    }, [bookingData, navigate])

    if (!bookingData) return null

    // GÜNLÜK FİYATLAR ÜZERİNDEN TOPLAM HESAPLAMA
    const checkInDate = new Date(bookingData.checkIn)
    const checkOutDate = new Date(bookingData.checkOut)

    let totalPrice = 0
    let nights = 0
    let tempDate = new Date(checkInDate)

    while (tempDate < checkOutDate) {
        totalPrice += getPriceForDate(tempDate)
        nights++
        tempDate.setDate(tempDate.getDate() + 1)
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        setIsProcessing(true)
        setTimeout(async () => {
            await adminSettings.addBookingAsync({ ...bookingData, totalPrice, createdAt: new Date().toISOString() })
            setIsProcessing(false)
            alert("Ödeme Başarılı!")
            navigate('/')
        }, 1500)
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-grid">
                    <div className="payment-section">
                        <h2>{t('payment.title')}</h2>
                        <form className="payment-form" onSubmit={handlePayment}>
                            {/* ... Kart Bilgileri (Kısaltıldı) ... */}
                            <button type="submit" className="pay-btn" disabled={isProcessing}>
                                {isProcessing ? 'İşleniyor...' : `Ödemeyi Tamamla (${totalPrice.toLocaleString()} TL)`}
                            </button>
                        </form>
                    </div>
                    <div className="summary-section">
                        <h3>Rezervasyon Özeti</h3>
                        <div className="summary-row"><span>Giriş:</span> <b>{checkInDate.toLocaleDateString()}</b></div>
                        <div className="summary-row"><span>Çıkış:</span> <b>{checkOutDate.toLocaleDateString()}</b></div>
                        <div className="summary-row"><span>Gece:</span> <b>{nights}</b></div>
                        <div className="summary-row total"><span>TOPLAM:</span> <b>{totalPrice.toLocaleString()} TL</b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
