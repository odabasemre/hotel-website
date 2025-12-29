import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/pages/legal-pages.css'

function DistanceSalesContractPage() {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="legal-page">
            <div className="container">
                <h1>Mesafeli Satış Sözleşmesi</h1>
                
                <div className="legal-content">
                    <h2>MESAFELİ SATIŞ SÖZLEŞMESİ</h2>
                    
                    <p>İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"); bir tarafta iletilerven maddelerde "Müşteri" olarak anılacak olan _______ kişi/kuruluş (Adı-Soyadı/Unvanı) (Vergi Kimlik Numarası), diğer tarafta kaplıca Mahallesi, Ayder Yukarı Ambarlık Küme Evler No:82, Çamlıhemşin/artvin adresinde faaliyet gösteren, Vergi Kimlik Numarası: 6301235373 olan ve ayderkuzeyhouses@gmail.com e-posta adresi üzerinden iletişime geçilebilen, iletilerden maddelerde "Ayder Kuzey Evleri" olarak anılacak işletme arasında, aşağıda belirtilen hukumve şartlar çerçevesinde elektronik ortamda akdedilmiştir.</p>

                    <p>Taraflar, işbu sözleşmenin resmi bir teklif niteliğinde olduğunu, ücretli konaklama hizmetinin sunulmasına ilişkin tüm şartları içerdiğini, sözleşme hükümlerinin kendileri açısından bağlayıcı ve kesin olduğunu, sözleşmenin https://ayderkuzey.com internet sitesinde yayımlandığını ve Müşteri tarafından tek sureli olarak değerlendirildiğini kabul, beyan ve taahhüt ederler.</p>

                    <h2>1. SÖZLEŞMENİN KONUSU</h2>
                    <p><strong>1.1.</strong> İşbu sözleşmenin konusu; Ayder Kuzey Evleri tarafından işletilen tesiste, Müşteri'nin talebi doğrultusunda konaklama hizmetinin sunulmasına ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
                    <p><strong>1.2.</strong> Müşteri, işbu sözleşmenin kurulmasıyla birlikte Ayder Kuzey Evleri'nin konaklama, rezervasyon, ücretlendirme ve tesis kuralları hakkında bilgilendirildiğini kabul eder.</p>
                    <p><strong>1.3.</strong> Ayder Kuzey Evleri, sözleşmenin kurulmasıyla ücretlendirme artırılabilir. Müşteri'nin rezervasyon talebini teyit eder.</p>

                    <h2>2. KONAKLAMA REZERVASYONUNUN ŞEKLİ</h2>
                    <p><strong>2.1.</strong> Rezervasyonlar; +90 530 428 93 95 numaralı telefon hattı üzerinden veya https://ayderkuzey.com internet sitesinde yer alan rezervasyon formu doldurularak yapılabilir.</p>
                    <p><strong>2.2.</strong> Müşteri, rezervasyon iptali veya değişiklik taleplerini telefon yoluyla ya da ayderkuzeyhouses@gmail.com e-posta adresi üzerinden yazılı olarak iletebilir.</p>
                    <p><strong>2.3.</strong> Rezervasyon iptal taleplerinin, konaklama başlangıç tarihinden en geç 15 gün önce yapılması gerekmektedir.</p>
                    <p><strong>2.4.</strong> Konaklama tarihine 15 günden az süre kala yapılan iptallerde ücret iadesi yapılmaz. 15 gün ve daha önce yapılan iptallerde toplam ödemenin %50'si kesilerek kalan tutar Müşteri'ye iade edilir.</p>
                    <p><strong>2.5.</strong> Rezervasyon değişiklikleri (kişi sayısı, oda tipi, tarih vb.), değişiklik talebinin yapıldığı tarihe geçerli olan fiyatlar üzerinden uygulanır.</p>
                    <p><strong>2.6.</strong> Özel indırimli dönemlerde yapılan rezervasyonlarda, değişiklik talep edilmesi halinde indırimli fiyatlar geçerliliğini yitirer; güncel fiyatlar esas alınır.</p>
                    <p><strong>2.7.</strong> Çocuklara yönelik indırimler, çocukların ebeveynleriyle aynı odada konaklaması halinde uygulanır. Rezervasyon sırasında beyan edilmiş esas alınır. Sonradan yapılan değişikliklerden Müşteri sorumludur.</p>

                    <h2>3. ÖDEME ŞEKLİ</h2>
                    <p><strong>3.1.</strong> Müşteri, online rezervasyon sırasında ödeme için kendi kredi kartı bilgilerini sisteme girer.</p>
                    <p><strong>3.2.</strong> Ödemeler tek çekim veya bankaların sunduğu taksit seçenekleri ile yapılabilir. Taksitli ödemelerde herhangi bir ek vade farkı hesaplanmayacak olup taksit tutarları internet sitesinden görülebilir.</p>

                    <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
                </div>
            </div>
        </div>
    )
}

export default DistanceSalesContractPage