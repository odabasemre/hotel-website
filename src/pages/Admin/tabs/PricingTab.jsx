import React from 'react'
import { adminSettings } from '../../../services/adminSettings'

function PricingTab({ pricing, setPricing }) {
    // Bugünün baz fiyatını al
    const todayStr = new Date().toISOString().split('T')[0];
    const todayBasePrice = adminSettings.getDayData(todayStr).price;

    return (
        <section className="pricing-section" style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ maxWidth: '800px' }}>
                <h2 className="page-title">Kişi Başına Fiyat Ayarları</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Tesiste konaklayacak misafir tipine göre ek ücretleri buradan belirleyebilirsiniz.
                    1-2 Yetişkin konaklaması <strong>baz fiyat (Takvimdeki Fiyat)</strong> olarak kabul edilir.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eef0f2' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2d4a3e' }}>
                            Yetişkin Farkı (3. Kişiden İtibaren)
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="number"
                                className="form-control"
                                style={{ fontSize: '20px', fontWeight: 'bold', padding: '10px' }}
                                value={pricing.perAdultIncrement}
                                onChange={(e) => setPricing(adminSettings.updatePricingConfig({ perAdultIncrement: Number(e.target.value) }))}
                            />
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d4a3e' }}>₺</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>2 yetişkinden sonraki her yetişkin için gecelik ek ücret.</p>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eef0f2' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2d4a3e' }}>
                            Çocuk Farkı (Her Çocuk İçin)
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="number"
                                className="form-control"
                                style={{ fontSize: '20px', fontWeight: 'bold', padding: '10px' }}
                                value={pricing.perChildIncrement}
                                onChange={(e) => setPricing(adminSettings.updatePricingConfig({ perChildIncrement: Number(e.target.value) }))}
                            />
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d4a3e' }}>₺</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>Yaş sınırına bakılmaksızın her çocuk için gecelik sabit ücret.</p>
                    </div>
                </div>

                <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                    <strong>Bugünün Baz Fiyatı:</strong> {todayBasePrice.toLocaleString()} ₺ (2 Yetişkin için)
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '15px' }}>Misafir Tipi</th>
                            <th style={{ padding: '15px' }}>Hesaplama Formülü</th>
                            <th style={{ padding: '15px' }}>Gecelik Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#eaf2ee' }}>
                            <td style={{ padding: '15px', fontWeight: 'bold' }}>2 Yetişkin</td>
                            <td style={{ padding: '15px', color: '#666' }}>Baz Fiyat</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>{todayBasePrice.toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px' }}>3 Yetişkin</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>{(todayBasePrice + pricing.perAdultIncrement).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px' }}>4 Yetişkin</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement * 2} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>{(todayBasePrice + pricing.perAdultIncrement * 2).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px' }}>5 Yetişkin</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement * 3} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>{(todayBasePrice + pricing.perAdultIncrement * 3).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '15px' }}>6 Yetişkin</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement * 4} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d4a3e' }}>{(todayBasePrice + pricing.perAdultIncrement * 4).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#f0f7ff' }}>
                            <td style={{ padding: '15px' }}>2 Yetişkin + 1 Çocuk</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perChildIncrement} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#1565c0' }}>{(todayBasePrice + pricing.perChildIncrement).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#f0f7ff' }}>
                            <td style={{ padding: '15px' }}>2 Yetişkin + 2 Çocuk</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perChildIncrement * 2} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#1565c0' }}>{(todayBasePrice + pricing.perChildIncrement * 2).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#f0f7ff' }}>
                            <td style={{ padding: '15px' }}>2 Yetişkin + 3 Çocuk</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perChildIncrement * 3} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#1565c0' }}>{(todayBasePrice + pricing.perChildIncrement * 3).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fff8e1' }}>
                            <td style={{ padding: '15px' }}>3 Yetişkin + 2 Çocuk</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement} + {pricing.perChildIncrement * 2} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#f57c00' }}>{(todayBasePrice + pricing.perAdultIncrement + pricing.perChildIncrement * 2).toLocaleString()} ₺</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fff8e1' }}>
                            <td style={{ padding: '15px' }}>4 Yetişkin + 2 Çocuk</td>
                            <td style={{ padding: '15px', color: '#666' }}>{todayBasePrice.toLocaleString()} + {pricing.perAdultIncrement * 2} + {pricing.perChildIncrement * 2} ₺</td>
                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#f57c00' }}>{(todayBasePrice + pricing.perAdultIncrement * 2 + pricing.perChildIncrement * 2).toLocaleString()} ₺</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PricingTab
