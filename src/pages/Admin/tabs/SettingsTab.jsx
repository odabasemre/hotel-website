import React from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { SettingsIcon, EditIcon, TrashIcon } from '../components/Icons'

function SettingsTab({
    pricing,
    setPricing,
    propertyData,
    setPropertyData
}) {
    const handleAddAmenity = (input) => {
        if (input.value) {
            const updated = [...propertyData.amenities, { id: Date.now(), name: input.value, icon: 'info' }]
            setPropertyData(adminSettings.updatePropertyData({ amenities: updated }))
            input.value = ''
        }
    }

    const handleRemoveAmenity = (id) => {
        const updated = propertyData.amenities.filter(a => a.id !== id)
        setPropertyData(adminSettings.updatePropertyData({ amenities: updated }))
    }

    const handleAddPhoto = (input) => {
        if (input.value) {
            const updated = [...propertyData.photos, input.value]
            setPropertyData(adminSettings.updatePropertyData({ photos: updated }))
            input.value = ''
        }
    }

    const handleRemovePhoto = (idx) => {
        const updated = propertyData.photos.filter((_, i) => i !== idx)
        setPropertyData(adminSettings.updatePropertyData({ photos: updated }))
    }

    return (
        <section className="settings-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
            <h2 className="page-title">Tesis ve İçerik Yönetimi</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

                {/* 1. Geniş Kapsamlı Ayarlar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                    <div className="settings-card" style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}><SettingsIcon /> Kapasite ve Genel Bilgiler</h3>
                        <div className="form-group">
                            <label>Tesis Adı</label>
                            <input type="text" className="form-control" defaultValue="Ayder Kuzey Houses" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="form-group">
                                <label>Maks. Yetişkin</label>
                                <input type="number" className="form-control" value={pricing.maxAdults} onChange={(e) => setPricing(adminSettings.updatePricingConfig({ maxAdults: Number(e.target.value) }))} />
                            </div>
                            <div className="form-group">
                                <label>Maks. Çocuk</label>
                                <input type="number" className="form-control" value={pricing.maxChildren} onChange={(e) => setPricing(adminSettings.updatePricingConfig({ maxChildren: Number(e.target.value) }))} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Telefon</label>
                            <input type="text" className="form-control" defaultValue="+90 532 123 45 67" />
                        </div>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label>Ana Sayfa Kapak Fotoğrafı (Hero)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={propertyData.heroImage}
                                    onChange={(e) => setPropertyData(adminSettings.updatePropertyData({ heroImage: e.target.value }))}
                                    placeholder="Resim URL'si"
                                />
                                {propertyData.heroImage && (
                                    <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                                        <img src={propertyData.heroImage} alt="Hero Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="settings-card" style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}><EditIcon /> Tesis Açıklaması</h3>
                        <textarea
                            className="form-control"
                            rows="6"
                            style={{ resize: 'none' }}
                            value={propertyData.description}
                            onChange={(e) => setPropertyData(adminSettings.updatePropertyData({ description: e.target.value }))}
                        ></textarea>
                        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '10px' }}>Arama sonuçları ve ana sayfa üzerinde görünecek karşılama metni.</p>
                    </div>
                </div>

                {/* 2. Olanaklar Yönetimi */}
                <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>Öne Çıkan Olanaklar (Aminities)</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                        {propertyData.amenities.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '8px 15px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{item.name}</span>
                                <button
                                    onClick={() => handleRemoveAmenity(item.id)}
                                    style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                                >&times;</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            id="newAmenity"
                            className="form-control"
                            placeholder="Yeni olanak (örn: Kahvaltı)"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddAmenity(e.target)
                                }
                            }}
                        />
                        <button
                            className="btn-primary"
                            onClick={() => {
                                const input = document.getElementById('newAmenity')
                                handleAddAmenity(input)
                            }}
                        >Ekle</button>
                    </div>
                </div>

                {/* 3. Fotoğraf Galerisi */}
                <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '18px', color: '#1a362d', margin: 0 }}>Site Fotoğraf Galerisi</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                id="newPhotoUrl"
                                placeholder="Fotoğraf URL'si ekleyin..."
                                className="form-control"
                                style={{ minWidth: '300px' }}
                            />
                            <button
                                className="btn-primary"
                                onClick={() => {
                                    const input = document.getElementById('newPhotoUrl')
                                    handleAddPhoto(input)
                                }}
                            >Fotoğraf Ekle</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                        {propertyData.photos.map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '140px', border: '1px solid #eee' }}>
                                <img src={url} alt={`Property ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    onClick={() => handleRemovePhoto(idx)}
                                    style={{
                                        position: 'absolute', top: '5px', right: '5px',
                                        background: 'rgba(212, 17, 30, 0.8)', color: 'white',
                                        border: 'none', borderRadius: '50%', width: '24px', height: '24px',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SettingsTab
