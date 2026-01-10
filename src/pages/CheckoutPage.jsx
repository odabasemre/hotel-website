import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminSettings } from '../services/adminSettings'
import { useCustomAvailability } from '../hooks/useCustomAvailability'
import CustomPhoneInput from '../components/CustomPhoneInput'
import '../styles/pages/checkout-page.css'

function CheckoutPage() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const { getPriceForDate } = useCustomAvailability()

    const { bookingData } = location.state || {}
    const [isProcessing, setIsProcessing] = useState(false)
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [distanceSalesAccepted, setDistanceSalesAccepted] = useState(false)
    const [privacyRead, setPrivacyRead] = useState(false)
    const [distanceSalesRead, setDistanceSalesRead] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)
    const [showDistanceSalesModal, setShowDistanceSalesModal] = useState(false)
    const [roomImage, setRoomImage] = useState('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400')

    // Kişisel bilgiler - bookingData'dan gelen değerleri kullan
    const [guestInfo, setGuestInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        note: ''
    })

    // Fatura bilgileri
    const [invoiceType, setInvoiceType] = useState('same')
    const [invoiceInfo, setInvoiceInfo] = useState({
        type: 'individual',
        firstName: '',
        lastName: '',
        tcNo: '',
        companyName: '',
        taxOffice: '',
        taxNo: '',
        address: '',
        city: '',
        district: ''
    })

    // Kredi kartı bilgileri
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    })

    // bookingData geldiğinde form alanlarını doldur
    useEffect(() => {
        if (bookingData) {
            setGuestInfo({
                firstName: bookingData.firstName || '',
                lastName: bookingData.lastName || '',
                email: bookingData.email || '',
                phone: bookingData.phone || '',
                note: bookingData.note || ''
            })
        }
    }, [bookingData])

    // Oda resmini site ayarlarından çek
    useEffect(() => {
        const fetchRoomImage = async () => {
            try {
                const data = await adminSettings.getSiteImages()
                if (data?.rooms?.slide1) {
                    setRoomImage(data.rooms.slide1)
                }
            } catch (error) {
                console.error('Oda resmi yüklenemedi:', error)
            }
        }
        fetchRoomImage()
    }, [])

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

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        return parts.length ? parts.join(' ') : value
    }

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4)
        }
        return v
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        
        if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone) {
            alert('Lütfen tüm kişisel bilgileri doldurunuz.')
            return
        }
        
        if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiry || !cardInfo.cvv) {
            alert('Lütfen tüm kredi kartı bilgilerini doldurunuz.')
            return
        }
        
        if (!privacyAccepted || !distanceSalesAccepted) {
            alert('Lütfen gizlilik sözleşmesi ve mesafeli satış sözleşmesini kabul ediniz.')
            return
        }

        setIsProcessing(true)
        
        const reservationData = {
            ...bookingData,
            totalPrice,
            guestName: `${guestInfo.firstName} ${guestInfo.lastName}`,
            guestEmail: guestInfo.email,
            guestPhone: guestInfo.phone,
            notes: guestInfo.note,
            invoiceType,
            invoiceInfo: invoiceType === 'different' ? invoiceInfo : null,
            createdAt: new Date().toISOString()
        }

        setTimeout(async () => {
            await adminSettings.addBookingAsync(reservationData)
            setIsProcessing(false)
            alert("Ödeme Başarılı! Rezervasyonunuz alınmıştır.")
            navigate('/')
        }, 1500)
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Güvenli Ödeme</h1>
                
                <div className="checkout-grid">
                    {/* Sol Taraf - Formlar */}
                    <div className="checkout-forms">
                        
                        {/* Kişisel Bilgiler */}
                        <div className="checkout-section">
                            <h2 className="section-title">
                                <span className="section-number">1</span>
                                Kişisel Bilgiler
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Ad *</label>
                                    <input
                                        type="text"
                                        value={guestInfo.firstName}
                                        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                                        placeholder="Adınız"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Soyad *</label>
                                    <input
                                        type="text"
                                        value={guestInfo.lastName}
                                        onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                                        placeholder="Soyadınız"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>E-posta *</label>
                                    <input
                                        type="email"
                                        value={guestInfo.email}
                                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                                        placeholder="ornek@email.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telefon *</label>
                                    <CustomPhoneInput
                                        value={guestInfo.phone}
                                        onChange={(value) => setGuestInfo({...guestInfo, phone: value})}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Tesise Not (İsteğe Bağlı)</label>
                                    <textarea
                                        value={guestInfo.note}
                                        onChange={(e) => setGuestInfo({...guestInfo, note: e.target.value})}
                                        placeholder="Özel isteklerinizi veya notlarınızı buraya yazabilirsiniz..."
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Fatura Bilgileri */}
                        <div className="checkout-section">
                            <h2 className="section-title">
                                <span className="section-number">2</span>
                                Fatura Bilgileri
                            </h2>
                            
                            <div className="invoice-toggle">
                                <label className={`toggle-option ${invoiceType === 'same' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="invoiceType"
                                        checked={invoiceType === 'same'}
                                        onChange={() => setInvoiceType('same')}
                                    />
                                    <span className="toggle-label">Kişisel bilgilerimle aynı</span>
                                </label>
                                <label className={`toggle-option ${invoiceType === 'different' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="invoiceType"
                                        checked={invoiceType === 'different'}
                                        onChange={() => setInvoiceType('different')}
                                    />
                                    <span className="toggle-label">Farklı fatura bilgisi girmek istiyorum</span>
                                </label>
                            </div>

                            {invoiceType === 'different' && (
                                <div className="invoice-form">
                                    <div className="invoice-type-toggle">
                                        <button
                                            type="button"
                                            className={`type-btn ${invoiceInfo.type === 'individual' ? 'active' : ''}`}
                                            onClick={() => setInvoiceInfo({...invoiceInfo, type: 'individual'})}
                                        >
                                            Bireysel
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-btn ${invoiceInfo.type === 'corporate' ? 'active' : ''}`}
                                            onClick={() => setInvoiceInfo({...invoiceInfo, type: 'corporate'})}
                                        >
                                            Kurumsal
                                        </button>
                                    </div>

                                    {invoiceInfo.type === 'individual' ? (
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Ad *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.firstName}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, firstName: e.target.value})}
                                                    placeholder="Adınız"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Soyad *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.lastName}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, lastName: e.target.value})}
                                                    placeholder="Soyadınız"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>T.C. Kimlik No *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.tcNo}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, tcNo: e.target.value.replace(/\D/g, '').slice(0, 11)})}
                                                    placeholder="12345678901"
                                                    maxLength="11"
                                                />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Adres *</label>
                                                <textarea
                                                    value={invoiceInfo.address}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})}
                                                    placeholder="Fatura adresi"
                                                    rows="2"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>İl *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.city}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, city: e.target.value})}
                                                    placeholder="İl"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>İlçe *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.district}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, district: e.target.value})}
                                                    placeholder="İlçe"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="form-grid">
                                            <div className="form-group full-width">
                                                <label>Şirket Unvanı *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.companyName}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, companyName: e.target.value})}
                                                    placeholder="Şirket unvanı"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Vergi Dairesi *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.taxOffice}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, taxOffice: e.target.value})}
                                                    placeholder="Vergi dairesi"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Vergi No *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.taxNo}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, taxNo: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                                                    placeholder="1234567890"
                                                    maxLength="10"
                                                />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Adres *</label>
                                                <textarea
                                                    value={invoiceInfo.address}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})}
                                                    placeholder="Fatura adresi"
                                                    rows="2"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>İl *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.city}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, city: e.target.value})}
                                                    placeholder="İl"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>İlçe *</label>
                                                <input
                                                    type="text"
                                                    value={invoiceInfo.district}
                                                    onChange={(e) => setInvoiceInfo({...invoiceInfo, district: e.target.value})}
                                                    placeholder="İlçe"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Kredi Kartı Bilgileri */}
                        <div className="checkout-section">
                            <h2 className="section-title">
                                <span className="section-number">3</span>
                                Ödeme Bilgileri
                            </h2>
                            <div className="card-icons">
                                <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" />
                                <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" />
                                <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="Amex" />
                            </div>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Kart Numarası *</label>
                                    <input
                                        type="text"
                                        value={cardInfo.cardNumber}
                                        onChange={(e) => setCardInfo({...cardInfo, cardNumber: formatCardNumber(e.target.value)})}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Kart Üzerindeki İsim *</label>
                                    <input
                                        type="text"
                                        value={cardInfo.cardName}
                                        onChange={(e) => setCardInfo({...cardInfo, cardName: e.target.value.toUpperCase()})}
                                        placeholder="AD SOYAD"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Son Kullanma Tarihi *</label>
                                    <input
                                        type="text"
                                        value={cardInfo.expiry}
                                        onChange={(e) => setCardInfo({...cardInfo, expiry: formatExpiry(e.target.value)})}
                                        placeholder="AA/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV *</label>
                                    <input
                                        type="password"
                                        value={cardInfo.cvv}
                                        onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                                        placeholder="•••"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                            <p className="security-note">
                                🔒 Ödeme bilgileriniz SSL ile şifrelenerek güvenli bir şekilde işlenmektedir.
                            </p>
                        </div>
                    </div>

                    {/* Sağ Taraf - Özet ve Ödeme */}
                    <div className="checkout-summary">
                        <div className="summary-card sticky">
                            <h3>Rezervasyon Özeti</h3>
                            
                            {/* Oda Bilgileri */}
                            <div className="summary-room">
                                <img 
                                    src={roomImage} 
                                    alt="Oda" 
                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'}
                                />
                                <div className="room-info">
                                    <h4>Nehir Manzaralı Bungalov</h4>
                                </div>
                            </div>

                            <div className="summary-divider"></div>

                            {/* Tarih Bilgileri */}
                            <div className="summary-dates">
                                <div className="date-item">
                                    <span className="date-label">Giriş</span>
                                    <span className="date-value">{checkInDate.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                                    <span className="date-time">14:00'den itibaren</span>
                                </div>
                                <div className="date-arrow">→</div>
                                <div className="date-item">
                                    <span className="date-label">Çıkış</span>
                                    <span className="date-value">{checkOutDate.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                                    <span className="date-time">12:00'ye kadar</span>
                                </div>
                            </div>

                            <div className="summary-divider"></div>

                            {/* Misafir Bilgileri */}
                            <div className="summary-guests">
                                <div className="guest-row">
                                    <span>Yetişkin</span>
                                    <span>{bookingData.adults || 2} kişi</span>
                                </div>
                                {bookingData.children > 0 && (
                                    <div className="guest-row">
                                        <span>Çocuk</span>
                                        <span>{bookingData.children} kişi</span>
                                    </div>
                                )}
                                <div className="guest-row">
                                    <span>Konaklama</span>
                                    <span>{nights} gece</span>
                                </div>
                            </div>

                            <div className="summary-divider"></div>

                            {/* Fiyat Detayları */}
                            <div className="summary-pricing">
                                <div className="price-row">
                                    <span>{nights} gece konaklama</span>
                                    <span>{totalPrice.toLocaleString()} TL</span>
                                </div>
                                {bookingData.discount && (
                                    <div className="price-row discount">
                                        <span>İndirim ({bookingData.discount.code})</span>
                                        <span>-{bookingData.discount.amount?.toLocaleString()} TL</span>
                                    </div>
                                )}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total">
                                <span>TOPLAM</span>
                                <span>{totalPrice.toLocaleString()} TL</span>
                            </div>

                            <div className="summary-divider"></div>

                            {/* Sözleşmeler - Özet içinde */}
                            <div className="summary-contracts">
                                <div className="contract-checkbox">
                                    <input
                                        type="checkbox"
                                        id="privacyContract"
                                        checked={privacyAccepted}
                                        onChange={(e) => privacyRead ? setPrivacyAccepted(e.target.checked) : null}
                                        disabled={!privacyRead}
                                    />
                                    <label htmlFor="privacyContract">
                                        <button 
                                            type="button" 
                                            className="contract-link-btn"
                                            onClick={() => setShowPrivacyModal(true)}
                                        >
                                            Gizlilik Sözleşmesi
                                        </button>'ni okudum ve kabul ediyorum
                                        {!privacyRead && <span className="must-read">(Önce okuyunuz)</span>}
                                    </label>
                                </div>
                                
                                <div className="contract-checkbox">
                                    <input
                                        type="checkbox"
                                        id="distanceSalesContract"
                                        checked={distanceSalesAccepted}
                                        onChange={(e) => distanceSalesRead ? setDistanceSalesAccepted(e.target.checked) : null}
                                        disabled={!distanceSalesRead}
                                    />
                                    <label htmlFor="distanceSalesContract">
                                        <button 
                                            type="button" 
                                            className="contract-link-btn"
                                            onClick={() => setShowDistanceSalesModal(true)}
                                        >
                                            Mesafeli Satış Sözleşmesi
                                        </button>'ni okudum ve kabul ediyorum
                                        {!distanceSalesRead && <span className="must-read">(Önce okuyunuz)</span>}
                                    </label>
                                </div>
                            </div>
                            
                            {/* Ödeme Butonu - Özet içinde */}
                            <button 
                                type="button"
                                onClick={handlePayment}
                                className="pay-btn" 
                                disabled={isProcessing || !privacyAccepted || !distanceSalesAccepted}
                            >
                                {isProcessing ? 'İşleniyor...' : `Ödemeyi Tamamla`}
                            </button>
                            
                            <p className="summary-note">
                                * Fiyatlara KDV dahildir
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gizlilik Sözleşmesi Modal */}
            {showPrivacyModal && (
                <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Gizlilik Sözleşmesi</h2>
                            <button className="modal-close" onClick={() => setShowPrivacyModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="contract-text">
                                <h3>GİZLİLİK SÖZLEŞMESİ</h3>
                                
                                <p>
                                    Ayder Kuzey Evleri olarak misafirlerimize üstün ürün ve hizmet sunmayı hedeflemekteyiz. 
                                    Misafirlerimizin memnuniyeti, sadakati ve gizliliği bizim için büyük önem taşımaktadır.
                                </p>
                                
                                <p>
                                    "Ayder Kuzey Evleri Gizlilik Beyanı", gerek https://ayderkuzey.com internet sitesi üzerinden 
                                    gerekse bizimle kurduğunuz yazılı ve sözlü iletişimler aracılığıyla sizden veya sizin hakkınızda 
                                    toplanan kişisel bilgilerin hangi amaçlarla ve nasıl kullanıldığı konusunda sizleri bilgilendirmek 
                                    amacıyla hazırlanmıştır.
                                </p>

                                <h4>Kişisel Bilgilerin Toplanması ve Kullanımı</h4>
                                <p>
                                    https://ayderkuzey.com internet sitesine üye olurken veya rezervasyon işlemleri sırasında 
                                    talep edilen kişisel bilgileriniz; ilgi alanlarınıza yönelik yenilikler, kampanyalar ve etkinlikler 
                                    hakkında sizleri bilgilendirmek, hizmet kalitemizi artırmak ve internet sitemizi tercihleriniz 
                                    doğrultusunda geliştirmek amacıyla kullanılabilir.
                                </p>
                                
                                <h4>Bilgi Güvenliği</h4>
                                <p>
                                    Ayder Kuzey Evleri, kişisel bilgileri gizli tutmayı bir yükümlülük olarak kabul eder ve 
                                    bu bilgilerin yetkisiz erişime, ifşaya veya kullanıma karşı korunması için gerekli tüm 
                                    teknik ve idari tedbirleri alır.
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => {setShowPrivacyModal(false); setPrivacyRead(true); setPrivacyAccepted(true);}}>Okudum, Kabul Ediyorum</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mesafeli Satış Sözleşmesi Modal */}
            {showDistanceSalesModal && (
                <div className="modal-overlay" onClick={() => setShowDistanceSalesModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Mesafeli Satış Sözleşmesi</h2>
                            <button className="modal-close" onClick={() => setShowDistanceSalesModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="contract-text">
                                <h3>MESAFELİ SATIŞ SÖZLEŞMESİ</h3>
                                
                                <p>
                                    İşbu Mesafeli Satış Sözleşmesi; bir tarafta "Müşteri" olarak anılacak olan gerçek ve/veya tüzel kişi ile, 
                                    diğer tarafta Kaplıca Mahallesi, Ayder Yukarı Ambarlık Küme Evler No:282, Çamlıhemşin/Rize adresinde 
                                    faaliyet gösteren "Ayder Kuzey Evleri" arasında akdedilmiştir.
                                </p>

                                <h4>1. SÖZLEŞMENİN KONUSU</h4>
                                <p>İşbu sözleşmenin konusu; Ayder Kuzey Evleri tarafından işletilen tesiste, Müşteri'nin talebi doğrultusunda konaklama hizmetinin sunulmasına ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>

                                <h4>2. KONAKLAMA REZERVASYONUNUN ŞEKLİ</h4>
                                <p>Rezervasyonlar; +90 530 428 93 55 numaralı telefon hattı üzerinden veya https://ayderkuzey.com internet sitesinde yer alan rezervasyon formu doldurularak yapılabilir.</p>
                                <p>Konaklama tarihine 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz.</p>

                                <h4>3. ÖDEME ŞEKLİ</h4>
                                <p>Ödemeler tek çekim veya bankaların sunduğu taksit seçenekleri ile yapılabilir.</p>

                                <h4>4. KONAKLAMA ŞEKLİ</h4>
                                <p>Giriş saati 14:00, çıkış saati en geç 12:00'dir.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => {setShowDistanceSalesModal(false); setDistanceSalesRead(true); setDistanceSalesAccepted(true);}}>Okudum, Kabul Ediyorum</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutPage
