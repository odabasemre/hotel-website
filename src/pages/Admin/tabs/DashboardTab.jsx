import React, { useState, useEffect } from 'react'
import { adminSettings } from '../../../services/adminSettings'
import {
    HomeIcon, TagIcon, TrendingUpIcon, UsersIcon,
    DollarIcon, ActivityIcon, InfoIcon
} from '../components/Icons'

function DashboardTab({ selectedYear, setSelectedYear }) {
    const stats = adminSettings.getAnalytics(selectedYear)
    const totalDaysInYear = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ? 366 : 365

    const occupancyRate = stats.totalNights > 0
        ? ((stats.totalNights / (2 * totalDaysInYear)) * 100).toFixed(1)
        : "0.0"

    const adr = stats.totalBookings > 0
        ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString('tr-TR')
        : "0"

    const maxMonthlyRev = Math.max(...stats.monthlyData.map(d => d.revenue), 1000)

    return (
        <div className="dashboard-container">
            <header className="page-header">
                <div>
                    <h2 className="page-title">Yönetim Paneli Özeti</h2>
                    <p className="page-subtitle">Tesisinizin performansına dair genel bakış.</p>
                </div>
                <div className="year-selector">
                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>Yıl Seçin:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontWeight: 'bold' }}
                    >
                        {stats.availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-icon revenue"><DollarIcon /></div>
                    <div className="stats-info">
                        <span className="stats-label">Toplam Hasılat ({selectedYear})</span>
                        <h3 className="stats-value">{stats.totalRevenue.toLocaleString('tr-TR')} ₺</h3>
                        <span className="stats-trend positive"><TrendingUpIcon /> Gerçekleşen Veri</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon guests"><UsersIcon /></div>
                    <div className="stats-info">
                        <span className="stats-label">Toplam Rezervasyon</span>
                        <h3 className="stats-value">{stats.totalBookings} Kayıt</h3>
                        <span className="stats-trend positive"><TrendingUpIcon /> Net Satış</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon occupancy"><ActivityIcon /></div>
                    <div className="stats-info">
                        <span className="stats-label">Yıllık Doluluk Oranı</span>
                        <h3 className="stats-value">{occupancyRate} %</h3>
                        <span className="stats-trend neutral">Kapasite Kullanımı</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon adr"><TagIcon /></div>
                    <div className="stats-info">
                        <span className="stats-label">Ortalama Satış Fiyatı</span>
                        <h3 className="stats-value">{adr} ₺</h3>
                        <span className="stats-trend positive"><TrendingUpIcon /> ADR Skoru</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart-large">
                    <div className="chart-header">
                        <h3>{selectedYear} Aylık Hasılat Trendi</h3>
                        <div className="chart-legend">
                            <span className="legend-item"><span className="dot dot-revenue"></span> Aylık Kazanç</span>
                        </div>
                    </div>
                    <div className="visual-chart">
                        {stats.monthlyData.map((d, i) => {
                            const height = (d.revenue / maxMonthlyRev) * 100
                            return (
                                <div key={i} className="bar-wrapper">
                                    <div className="bar" style={{ height: `${Math.max(height, 2)}%`, opacity: d.revenue > 0 ? 1 : 0.3 }}>
                                        <div className="bar-tooltip">{d.revenue.toLocaleString('tr-TR')} ₺</div>
                                    </div>
                                    <span className="bar-label">{['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][i]}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="chart-small">
                    <div className="chart-header">
                        <h3>Oda Bazlı Performans</h3>
                    </div>
                    <div className="dist-chart">
                        <div className="room-occupancy-pill">
                            <div className="pill-info">
                                <span>Oda 1</span>
                                <span>{stats.roomOccupancy[1]} Gece</span>
                            </div>
                            <div className="pill-bar-bg">
                                <div className="pill-bar-fill" style={{
                                    width: `${Math.min((stats.roomOccupancy[1] / totalDaysInYear) * 100, 100)}%`,
                                    background: '#2d4a3e'
                                }}></div>
                            </div>
                        </div>
                        <div className="room-occupancy-pill">
                            <div className="pill-info">
                                <span>Oda 2</span>
                                <span>{stats.roomOccupancy[2]} Gece</span>
                            </div>
                            <div className="pill-bar-bg">
                                <div className="pill-bar-fill" style={{
                                    width: `${Math.min((stats.roomOccupancy[2] / totalDaysInYear) * 100, 100)}%`,
                                    background: '#6c8a7b'
                                }}></div>
                            </div>
                        </div>
                        <div className="insight-box">
                            <InfoIcon />
                            <p>Bu veriler {selectedYear} yılına aittir. {selectedYear === new Date().getFullYear() ? "Yıl sonu projeksiyonu için mevcut trendleri takip edin." : "Geçmiş yıl verileri arşivlenmiş ve korunmuştur."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTab
