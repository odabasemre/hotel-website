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
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [distanceSalesAccepted, setDistanceSalesAccepted] = useState(false)
    const [privacyRead, setPrivacyRead] = useState(false)
    const [distanceSalesRead, setDistanceSalesRead] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)
    const [showDistanceSalesModal, setShowDistanceSalesModal] = useState(false)

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
        if (!privacyAccepted || !distanceSalesAccepted) {
            alert('Lütfen gizlilik sözleşmesi ve mesafeli satış sözleşmesini kabul ediniz.')
            return
        }
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
                            
                            {/* Sözleşme Onay Checkboxları */}
                            <div className="contracts-section">
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
                            
                            <button 
                                type="submit" 
                                className="pay-btn" 
                                disabled={isProcessing || !privacyAccepted || !distanceSalesAccepted}
                            >
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
                                    "Ayder Kuzey Evleri Gizlilik Beyanı", gerek <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> internet sitesi üzerinden 
                                    gerekse bizimle kurduğunuz yazılı ve sözlü iletişimler aracılığıyla sizden veya sizin hakkınızda 
                                    toplanan kişisel bilgilerin hangi amaçlarla ve nasıl kullanıldığı konusunda sizleri bilgilendirmek 
                                    amacıyla hazırlanmıştır.
                                </p>

                                <h4>Kişisel Bilgilerin Toplanması ve Kullanımı</h4>
                                <p>
                                    <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> internet sitesine üye olurken veya rezervasyon işlemleri sırasında 
                                    talep edilen kişisel bilgileriniz; ilgi alanlarınıza yönelik yenilikler, kampanyalar ve etkinlikler 
                                    hakkında sizleri bilgilendirmek, hizmet kalitemizi artırmak ve internet sitemizi tercihleriniz 
                                    doğrultusunda geliştirmek amacıyla kullanılabilir.
                                </p>
                                
                                <p>
                                    Ayder Kuzey Evleri, kullanıcılarına daha iyi hizmet sunabilmek amacıyla bazı kişisel bilgileri 
                                    (isim, e-posta adresi, telefon numarası vb.) internet sitesi üzerindeki formlar aracılığıyla 
                                    talep etmektedir. Bu bilgiler, firmamız bünyesinde güvenli ortamlarda saklanmakta olup;
                                </p>
                                <ul>
                                    <li>Dönemsel kampanya ve promosyon çalışmaları</li>
                                    <li>Kullanıcı profillerine yönelik özel hizmetlerin planlanması</li>
                                    <li>İstenmeyen e-posta gönderimlerinin önlenmesi amacıyla yapılan sınıflandırma çalışmaları</li>
                                </ul>
                                <p>kapsamında yalnızca Ayder Kuzey Evleri bünyesinde kullanılmaktadır.</p>
                                
                                <p>
                                    Bu bilgilerin paylaşılması ve e-posta gönderim listelerine dahil olunması tamamen kullanıcıların 
                                    kendi istek ve onayları doğrultusunda gerçekleşmektedir.
                                </p>

                                <h4>Bilgilerin Doğruluğu ve Saklanması</h4>
                                <p>
                                    Tarafımıza iletilen e-posta adresinin ve diğer kişisel bilgilerin doğru ve güncel olması 
                                    kullanıcının sorumluluğundadır. Yanlış veya eksik bilgi verilmesinden kaynaklanabilecek 
                                    zararlardan Ayder Kuzey Evleri sorumlu tutulamaz.
                                </p>
                                <p>
                                    Toplanan kişisel veriler, Ayder Kuzey Evleri'nin veri tabanlarında güvenli bir şekilde 
                                    muhafaza edilmektedir.
                                </p>

                                <h4>Web Sitesi Hakları ve Üçüncü Kişilerle Paylaşım</h4>
                                <p>
                                    <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> alan adlı internet sitesinin tüm hakları Ayder Kuzey Evleri'ne aittir. 
                                    Ayder Kuzey Evleri, kullanıcılar tarafından elektronik ortamda kendisine iletilen kişisel bilgileri;
                                </p>
                                <ul>
                                    <li>İnsan kaynakları süreçleri (iş başvuruları)</li>
                                    <li>Müşteriler ve kullanıcılarla yapılan sözleşmeler</li>
                                    <li>İşbu Gizlilik Politikası'nda belirtilen amaçlar</li>
                                </ul>
                                <p>dışında üçüncü kişilerle paylaşmaz.</p>
                                <p>
                                    İnsan kaynakları kapsamında toplanan kişisel bilgiler yalnızca Ayder Kuzey Evleri 
                                    bünyesinde kullanılmakta ve saklanmaktadır.
                                </p>

                                <h4>Tanıtım ve Bildirim İletişimleri</h4>
                                <p>
                                    Ayder Kuzey Evleri bünyesinde toplanan kişisel bilgiler; dönemsel kampanyalar, tanıtım 
                                    faaliyetleri ve müşteri profiline uygun bilgilendirmeler amacıyla kullanılabilir. 
                                    Kullanıcılar, bu tür bildirimleri almak istememeleri halinde diledikleri zaman e-posta 
                                    yoluyla talepte bulunarak bu iletişimleri durdurabilirler.
                                </p>
                                <p>
                                    Kişisel bilgiler, gerektiğinde kullanıcı ile iletişime geçmek amacıyla da kullanılabilir.
                                </p>

                                <h4>Üçüncü Taraf Bağlantılar</h4>
                                <p>
                                    Ayder Kuzey Evleri internet sitesi üzerinden başka internet sitelerine bağlantılar (linkler) 
                                    verilebilir. Bu bağlantılar aracılığıyla erişilen sitelerin gizlilik uygulamaları ve 
                                    içeriklerinden Ayder Kuzey Evleri sorumlu değildir.
                                </p>

                                <h4>Kişisel Bilgilerin Açıklanabileceği Haller</h4>
                                <p>Ayder Kuzey Evleri, aşağıdaki istisnai durumlar dışında kullanıcı bilgilerini üçüncü kişilerle paylaşmaz:</p>
                                <ul>
                                    <li>Yürürlükte bulunan mevzuat hükümlerinin gerektirdiği hallerde</li>
                                    <li>Kullanıcılar ile yapılan sözleşmelerin gereğinin yerine getirilmesi amacıyla</li>
                                    <li>Yetkili idari veya adli merciler tarafından usulüne uygun olarak talep edilmesi halinde</li>
                                    <li>Kullanıcıların veya üçüncü kişilerin hak ve güvenliğini korumak amacıyla gerekli olması durumunda</li>
                                </ul>

                                <h4>Bilgi Güvenliği</h4>
                                <p>
                                    Ayder Kuzey Evleri, kişisel bilgileri gizli tutmayı bir yükümlülük olarak kabul eder ve 
                                    bu bilgilerin yetkisiz erişime, ifşaya veya kullanıma karşı korunması için gerekli tüm 
                                    teknik ve idari tedbirleri alır.
                                </p>
                                <p>
                                    Bununla birlikte, gerekli güvenlik önlemleri alınmış olmasına rağmen, internet sitesine 
                                    veya sistemlere yapılan saldırılar sonucunda kişisel verilerin zarar görmesi veya 
                                    üçüncü kişilerin eline geçmesi halinde Ayder Kuzey Evleri sorumlu tutulamaz.
                                </p>

                                <h4>Değişiklikler</h4>
                                <p>
                                    Ayder Kuzey Evleri, işbu Gizlilik Politikası hükümlerini dilediği zaman internet sitesinde 
                                    yayımlamak suretiyle tek taraflı olarak değiştirme hakkını saklı tutar. Yapılan değişiklikler, 
                                    <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> internet sitesinde yayımlandığı tarihte yürürlüğe girer.
                                </p>
                                <p>
                                    İşbu Gizlilik Sözleşmesi, web sitesinde yer alan Kullanım Koşulları'nın ayrılmaz bir parçasıdır.
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => {setShowPrivacyModal(false); setPrivacyRead(true); setPrivacyAccepted(true);}}>Kabul Et ve Devam Et</button>
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
                                    İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"); bir tarafta ilerleyen maddelerde "Müşteri" olarak 
                                    anılacak olan gerçek ve/veya tüzel kişi ile, diğer tarafta Kaplıca Mahallesi, Ayder Yukarı 
                                    Ambarlık Küme Evler No:282, Çamlıhemşin/Rize adresinde faaliyet gösteren, Vergi Kimlik Numarası 
                                    6330123973 olan ve ayderkuzeyhouses@gmail.com e-posta adresi üzerinden iletişime geçilebilen, 
                                    ilerleyen maddelerde "Ayder Kuzey Evleri" olarak anılacak işletme arasında, aşağıda belirtilen 
                                    hüküm ve şartlar çerçevesinde elektronik ortamda akdedilmiştir.
                                </p>
                                
                                <p>
                                    Taraflar; işbu sözleşmenin resmi bir teklif niteliğinde olduğunu, ücretli konaklama hizmetinin 
                                    sunulmasına ilişkin tüm şartları içerdiğini, sözleşme hükümlerinin kendileri açısından bağlayıcı 
                                    ve kesin olduğunu, sözleşmenin <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> internet 
                                    sitesinde yayımlandığını ve Müşteri tarafından tek taraflı olarak değiştirilemeyeceğini kabul, 
                                    beyan ve taahhüt ederler.
                                </p>

                                <h4>1. SÖZLEŞMENİN KONUSU</h4>
                                <p>1.1. İşbu sözleşmenin konusu; Ayder Kuzey Evleri tarafından işletilen tesiste, Müşteri'nin talebi doğrultusunda konaklama hizmetinin sunulmasına ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
                                <p>1.2. Müşteri, işbu sözleşmenin kurulmasıyla birlikte Ayder Kuzey Evleri'nin konaklama, rezervasyon, ücretlendirme ve tesis kuralları hakkında bilgilendirildiğini kabul eder.</p>
                                <p>1.3. Ayder Kuzey Evleri, sözleşmenin kurulmasının ardından Müşteri'nin rezervasyon talebini teyit eder.</p>

                                <h4>2. KONAKLAMA REZERVASYONUNUN ŞEKLİ</h4>
                                <p>2.1. Rezervasyonlar; +90 530 428 93 55 numaralı telefon hattı üzerinden veya <a href="https://ayderkuzey.com">https://ayderkuzey.com</a> internet sitesinde yer alan rezervasyon formu doldurularak yapılabilir.</p>
                                <p>2.2. Müşteri, rezervasyon iptali veya değişiklik taleplerini telefon yoluyla ya da ayderkuzeyhouses@gmail.com e-posta adresi üzerinden yazılı olarak iletebilir.</p>
                                <p>2.3. Rezervasyon iptal taleplerinin, konaklama başlangıç tarihinden en geç 15 gün önce yapılması gerekmektedir.</p>
                                <p>2.4. Konaklama tarihine 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz. 15 gün ve daha önce yapılan iptallerde toplam ödemenin %50'si kesilerek kalan tutar Müşteri'ye iade edilir.</p>
                                <p>2.5. Rezervasyon değişiklikleri (kişi sayısı, oda tipi, tarih vb.), değişiklik talebinin yapıldığı tarihte geçerli olan fiyatlar üzerinden uygulanır.</p>
                                <p>2.6. Özel indirimli dönemlerde yapılan rezervasyonlarda, değişiklik talep edilmesi halinde indirimli fiyatlar geçerliliğini yitirir; güncel fiyatlar esas alınır.</p>
                                <p>2.7. Çocuklara yönelik indirimler, çocukların ebeveynleriyle aynı odada konaklaması halinde uygulanır. Rezervasyon sırasında beyan edilen yaş esas alınır; yanlış beyan halinde doğacak fark Müşteri tarafından ödenir.</p>

                                <h4>3. ÖDEME ŞEKLİ</h4>
                                <p>3.1. Müşteri, online rezervasyon sırasında ödeme için kendi kredi kartı bilgilerini sisteme girer.</p>
                                <p>3.2. Ödemeler tek çekim veya bankaların sunduğu taksit seçenekleri ile yapılabilir. Taksitli ödemelerde oluşabilecek vade farkları Müşteri tarafından kabul edilmiş sayılır.</p>
                                <p>3.3. Ayder Kuzey Evleri, kredi kartı bilgilerinin güvenliği için gerekli teknik tedbirleri alır; Müşteri'nin kendi cihazından veya üçüncü kişilerin müdahalesinden kaynaklanan ihlallerden sorumlu tutulamaz.</p>
                                <p>3.4. Müşteri, tesise giriş sırasında rezervasyonda kullanılan kredi kartını ibraz etmekle yükümlüdür.</p>
                                <p>3.5. Fatura, Ayder Kuzey Evleri tarafından Müşteri'ye teslim edilir.</p>

                                <h4>4. ÖDEMENİN İADESİ</h4>
                                <p>4.1. Konaklama başlangıç tarihinden 15 gün ve daha önce yapılan iptallerde toplam bedelin %50'si kesilerek kalan tutar iade edilir. 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz (No-Show).</p>
                                <p>4.2. İade işlemleri, ödemenin yapıldığı kredi kartına veya Müşteri'nin bildirdiği banka hesabına yapılır.</p>
                                <p>4.3. Doğal afet, terör, ölüm (1. ve 2. derece yakınlar), kaza veya hastalık (resmî sağlık kurulu raporu ile belgelenmek kaydıyla) gibi mücbir sebepler halinde ücretin tamamı iade edilir.</p>
                                <p>4.4. Kredi kartı ile yapılan ödemelerde banka komisyonları düşüldükten sonra kalan tutar iade edilir.</p>

                                <h4>5. KONAKLAMA ŞEKLİ</h4>
                                <p>5.1. Tesise giriş sırasında Müşteri'nin kimlik bilgileri kontrol edilir.</p>
                                <p>5.2. Giriş saati 14:00, çıkış saati en geç 12:00'dir.</p>
                                <p>5.3. Konaklama bedelinin tamamı rezervasyon aşamasında tahsil edilir.</p>
                                <p>5.4. Tesise evcil hayvan kabul edilmez.</p>
                                <p>5.5. Ayder Kuzey Evleri'nin kusuru dışında Müşteri'nin hizmetten vazgeçmesi halinde ücret iadesi yapılmaz.</p>

                                <h4>6. TARAFLARIN SORUMLULUKLARI</h4>
                                <p>6.1. Hizmete ilişkin şikâyetler, konaklama süresi içerisinde yazılı olarak bildirilmelidir. Aksi halde hizmet kusursuz şekilde sunulmuş kabul edilir.</p>
                                <p>6.2. Müşteri'nin işbu sözleşme hükümlerine aykırı davranması halinde, Ayder Kuzey Evleri'nin uğrayacağı her türlü zarar Müşteri tarafından karşılanır.</p>
                                <p>6.3. Tesiste düzeni bozucu davranışlarda bulunan misafir, ücret iadesi yapılmaksızın tesisten çıkarılabilir.</p>
                                <p>6.4. Dışarıdan ziyaretçi kabulü işletme yönetiminin kararına tabidir; gerekli hallerde ücretli günlük kullanım uygulanır.</p>

                                <h4>7. DİĞER HÜKÜMLER</h4>
                                <p>7.1. Grev, lokavt, terör, doğal afet, sel, yangın, askeri harekât gibi mücbir sebepler halinde Ayder Kuzey Evleri hizmet vermeyi durdurabilir; bu durumda ödeme iadesi yapılır.</p>
                                <p>7.2. Özel gün ve programlarda, işletme dışı sebeplerle sanatçı veya etkinlik değişikliği yapılabilir.</p>
                                <p>7.3. İşbu sözleşmeden doğacak uyuşmazlıklarda Rize Mahkemeleri yetkilidir.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => {setShowDistanceSalesModal(false); setDistanceSalesRead(true); setDistanceSalesAccepted(true);}}>Kabul Et ve Devam Et</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutPage
