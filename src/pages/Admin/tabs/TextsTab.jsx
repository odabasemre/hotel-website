import React from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { HomeIcon } from '../components/Icons'

function TextsTab({ siteTexts, setSiteTexts }) {
    const handleUpdate = (section, field, value) => {
        const updated = {
            ...siteTexts,
            [section]: { ...siteTexts[section], [field]: value }
        }
        setSiteTexts(adminSettings.updateSiteTexts(updated))
    }

    return (
        <section className="texts-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
            <h2 className="page-title">Site Yazıları Yönetimi</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Web sitenizin farklı bölümlerindeki yazıları buradan düzenleyebilirsiniz. Değişiklikler anında kaydedilir.
            </p>

            <div style={{ display: 'grid', gap: '30px' }}>
                {/* Hero Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HomeIcon /> Ana Sayfa (Hero)
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.hero?.title || ''}
                            onChange={(e) => handleUpdate('hero', 'title', e.target.value)}
                            placeholder="Ayder Kuzey Houses"
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Alt Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.hero?.subtitle || ''}
                            onChange={(e) => handleUpdate('hero', 'subtitle', e.target.value)}
                            placeholder="Doğanın Kalbinde Lüks Konaklama"
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Açıklama</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={siteTexts.hero?.description || ''}
                            onChange={(e) => handleUpdate('hero', 'description', e.target.value)}
                            placeholder="Ana sayfa açıklama metni..."
                        />
                    </div>
                </div>

                {/* About Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        ℹ️ Hakkımızda Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.about?.title || ''}
                            onChange={(e) => handleUpdate('about', 'title', e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Alt Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.about?.subtitle || ''}
                            onChange={(e) => handleUpdate('about', 'subtitle', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Açıklama</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={siteTexts.about?.description || ''}
                            onChange={(e) => handleUpdate('about', 'description', e.target.value)}
                        />
                    </div>
                </div>

                {/* Services Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛎️ Hizmetler Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.services?.title || ''}
                            onChange={(e) => handleUpdate('services', 'title', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Alt Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.services?.subtitle || ''}
                            onChange={(e) => handleUpdate('services', 'subtitle', e.target.value)}
                        />
                    </div>
                </div>

                {/* Rooms Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛏️ Odalar Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.rooms?.title || ''}
                            onChange={(e) => handleUpdate('rooms', 'title', e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Alt Başlık</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.rooms?.subtitle || ''}
                            onChange={(e) => handleUpdate('rooms', 'subtitle', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Açıklama</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={siteTexts.rooms?.description || ''}
                            onChange={(e) => handleUpdate('rooms', 'description', e.target.value)}
                        />
                    </div>
                </div>

                {/* Contact Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        📞 İletişim Bilgileri
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Telefon</label>
                            <input
                                type="text"
                                className="form-control"
                                value={siteTexts.contact?.phone || ''}
                                onChange={(e) => handleUpdate('contact', 'phone', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>E-posta</label>
                            <input
                                type="email"
                                className="form-control"
                                value={siteTexts.contact?.email || ''}
                                onChange={(e) => handleUpdate('contact', 'email', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Adres</label>
                        <textarea
                            className="form-control"
                            rows="2"
                            value={siteTexts.contact?.address || ''}
                            onChange={(e) => handleUpdate('contact', 'address', e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        📝 Alt Bilgi (Footer)
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Açıklama</label>
                        <textarea
                            className="form-control"
                            rows="2"
                            value={siteTexts.footer?.description || ''}
                            onChange={(e) => handleUpdate('footer', 'description', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Telif Hakkı Metni</label>
                        <input
                            type="text"
                            className="form-control"
                            value={siteTexts.footer?.copyright || ''}
                            onChange={(e) => handleUpdate('footer', 'copyright', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', background: '#e8f5e9', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>✅</span>
                <span style={{ color: '#2e7d32', fontWeight: '500' }}>Değişiklikler otomatik olarak kaydedilmektedir.</span>
            </div>
        </section>
    )
}

export default TextsTab
