import React from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { EditIcon, TrashIcon } from '../components/Icons'

function PromotionsTab({
    promotions,
    setPromotions,
    newPromo,
    setNewPromo
}) {
    const handleAddPromo = (e) => {
        e.preventDefault()
        const promo = {
            id: Date.now(),
            code: newPromo.code.toUpperCase(),
            type: newPromo.type,
            value: Number(newPromo.value),
            status: newPromo.status
        }
        setPromotions(adminSettings.addPromotion(promo))
        setNewPromo({ code: '', type: 'amount', value: '', status: 'active' })
    }

    const handleEditPromo = (promo) => {
        setNewPromo({
            code: promo.code,
            type: promo.type,
            value: promo.value,
            status: promo.status
        })
        // Delete old one first
        setPromotions(adminSettings.deletePromotion(promo.id))
    }

    const handleDeletePromo = (id) => {
        if (confirm('Bu promosyon kodunu silmek istediğinize emin misiniz?')) {
            setPromotions(adminSettings.deletePromotion(id))
        }
    }

    return (
        <section className="promotions-section" style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h2 className="page-title">Promosyon Kodları</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Form */}
                <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
                    <h3 style={{ marginTop: 0, fontSize: '16px' }}>Yeni Kod Ekle</h3>
                    <form onSubmit={handleAddPromo}>
                        <div className="form-group">
                            <label>Promosyon Kodu</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Örn: YAZ2025"
                                value={newPromo.code}
                                onChange={e => setNewPromo({ ...newPromo, code: e.target.value })}
                                required
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>İndirim Tipi</label>
                            <select
                                className="form-control"
                                value={newPromo.type}
                                onChange={e => setNewPromo({ ...newPromo, type: e.target.value })}
                            >
                                <option value="amount">Tutar (TL)</option>
                                <option value="percent">Yüzde (%)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Değer</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder={newPromo.type === 'amount' ? '1000' : '10'}
                                value={newPromo.value}
                                onChange={e => setNewPromo({ ...newPromo, value: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Durum</label>
                            <select
                                className="form-control"
                                value={newPromo.status}
                                onChange={e => setNewPromo({ ...newPromo, status: e.target.value })}
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Pasif</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Oluştur</button>
                    </form>
                </div>

                {/* List */}
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>Kod</th>
                                <th style={{ padding: '12px' }}>İndirim</th>
                                <th style={{ padding: '12px' }}>Durum</th>
                                <th style={{ padding: '12px' }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.length === 0 ? (
                                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Kayıtlı promosyon kodu yok.</td></tr>
                            ) : promotions.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '15px' }}>{p.code}</td>
                                    <td style={{ padding: '12px' }}>
                                        {p.type === 'percent' ? `%${p.value}` : `${p.value} TL`}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            background: p.status === 'active' ? '#e6f4ea' : '#fce8e6',
                                            color: p.status === 'active' ? '#1e8e3e' : '#c5221f',
                                            padding: '4px 8px', borderRadius: '12px', fontSize: '12px'
                                        }}>
                                            {p.status === 'active' ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => handleEditPromo(p)}
                                            style={{ color: '#006ce4', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                                            title="Düzenle"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePromo(p.id)}
                                            style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}
                                            title="Sil"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default PromotionsTab
