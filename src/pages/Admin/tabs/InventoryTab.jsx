import React, { useState } from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { InfoIcon, AlertCircle, ChevronRight } from '../components/Icons'

function InventoryTab({
    startDate,
    setStartDate,
    showGuestPricing,
    setShowGuestPricing,
    bulkEdit,
    setBulkEdit,
    handleValueChange,
    formatDate
}) {
    const daysToShow = 31

    // Get timeline days
    const getTimelineDays = () => {
        const days = []
        for (let i = 0; i < daysToShow; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            days.push(date)
        }
        return days
    }

    const timelineDays = getTimelineDays()
    const months = [...new Set(timelineDays.map(d => d.toLocaleDateString('tr', { month: 'long', year: 'numeric' })))]

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">📅 Fiyat & Kontenjan Takvimi</h2>
                    <p className="page-subtitle">Günlük fiyatları ve oda durumlarını bu ekrandan yönetebilirsiniz.</p>
                </div>
                <div className="view-selector">
                    <select className="view-mode-selector">
                        <option>Liste görünümü</option>
                        <option>Aylık görünüm</option>
                    </select>
                </div>
            </div>

            <div className="controls-bar">
                <div className="date-range-picker">
                    <input
                        type="date"
                        value={formatDate(startDate)}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                    <span>-</span>
                    <input
                        type="date"
                        disabled
                        value={formatDate(timelineDays[timelineDays.length - 1])}
                        style={{ background: '#f9f9f9', color: '#888' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={showGuestPricing}
                            onChange={(e) => setShowGuestPricing(e.target.checked)}
                        />
                        Konuk başına fiyat
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><input type="checkbox" /> Kısıtlamalar</label>
                </div>
                <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setBulkEdit({ ...bulkEdit, show: true })}>Toplu düzenleme</button>
            </div>

            {/* --- CALENDAR TABLE --- */}
            <div className="calendar-container">
                <div className="calendar-scroll-wrapper">
                    <table className="calendar-table">
                        <colgroup>
                            <col style={{ width: '280px' }} />
                            {timelineDays.map((_, i) => <col key={i} style={{ width: '60px' }} />)}
                        </colgroup>
                        <thead>
                            {/* Room Info Row */}
                            <tr className="th-room-info-row">
                                <th className="sticky-col th-room-header">
                                    İki Yatak Odalı Dağ Evi
                                    <span style={{ fontSize: '12px', fontWeight: '400', color: '#666', display: 'block', marginTop: '4px' }}>(ID: 123456)</span>
                                    <div style={{ marginTop: '5px', fontSize: '11px', color: '#d4111e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <AlertCircle style={{ width: 12 }} /> Olası sorunlar (3)
                                    </div>
                                </th>
                                {months.map((m, idx) => {
                                    const count = timelineDays.filter(d => d.toLocaleDateString('tr', { month: 'long', year: 'numeric' }) === m).length
                                    return <th key={idx} colSpan={count} className="month-group-header">{m} <ChevronRight style={{ width: 14, verticalAlign: 'middle' }} /></th>
                                })}
                            </tr>
                            {/* Days Row */}
                            <tr className="th-date-row">
                                <th className="sticky-col sub-label-header">Takvim Günleri</th>
                                {timelineDays.map((day, i) => (
                                    <th key={i} className={day.getDay() === 0 || day.getDay() === 6 ? 'weekend' : ''}>
                                        <span className="th-day-name">{day.toLocaleDateString('tr', { weekday: 'short' })}</span>
                                        <span className="th-day-date">{day.getDate()}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1: Status (Open/Closed) */}
                            <tr>
                                <td className="sticky-col row-label-cell">
                                    <span className="row-label-text">Oda durumu</span>
                                    <InfoIcon style={{ width: 14, color: '#888' }} />
                                </td>
                                {timelineDays.map(day => {
                                    const dStr = formatDate(day)
                                    const data = adminSettings.getCalculatedDayData(dStr)
                                    return (
                                        <td key={dStr} className={`data-cell ${data.closed ? 'status-closed' : 'status-open'}`}>
                                            <select
                                                className="cell-select"
                                                value={data.closed ? "true" : "false"}
                                                onChange={(e) => handleValueChange(dStr, 'closed', e.target.value)}
                                                style={{
                                                    color: data.isSoldOut ? '#fff' : (data.closed ? '#d4111e' : '#2d4a3e'),
                                                    background: data.isSoldOut ? '#d4111e' : 'transparent',
                                                    height: '100%',
                                                    width: '100%'
                                                }}
                                            >
                                                <option value="false">Açık</option>
                                                <option value="true">Kapalı</option>
                                            </select>
                                        </td>
                                    )
                                })}
                            </tr>

                            {/* Row 2: Inventory */}
                            <tr>
                                <td className="sticky-col row-label-cell">
                                    <span className="row-label-text">Satılacak odalar</span>
                                </td>
                                {timelineDays.map(day => {
                                    const dStr = formatDate(day)
                                    const data = adminSettings.getCalculatedDayData(dStr)
                                    return (
                                        <td key={dStr} className={`data-cell ${data.isSoldOut ? 'cell-sold-out' : ''}`} style={{ position: 'relative' }}>
                                            <select
                                                className="cell-select"
                                                value={data.rawInventory}
                                                onChange={(e) => handleValueChange(dStr, 'inventory', e.target.value)}
                                                style={{
                                                    color: data.isSoldOut ? 'white' : 'inherit',
                                                    fontWeight: 'bold',
                                                    height: '100%',
                                                    width: '100%',
                                                    paddingTop: data.isSoldOut ? '10px' : '0'
                                                }}
                                            >
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                            {data.isSoldOut && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '4px',
                                                    left: 0,
                                                    right: 0,
                                                    fontSize: '9px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textTransform: 'uppercase',
                                                    pointerEvents: 'none'
                                                }}>
                                                    Tükendi
                                                </div>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>

                            {/* Row 3: Price */}
                            <tr className={showGuestPricing ? 'parent-row' : ''}>
                                <td className="sticky-col row-label-cell">
                                    <span className="row-label-text">{showGuestPricing ? 'Standart Fiyat (2x)' : 'Standart Fiyat'}</span>
                                    <span style={{ fontSize: '11px', color: '#666', background: '#eee', padding: '2px 4px', borderRadius: '3px' }}>₺</span>
                                </td>
                                {timelineDays.map(day => {
                                    const dStr = formatDate(day)
                                    const data = adminSettings.getDayData(dStr)
                                    return (
                                        <td key={dStr} className="data-cell">
                                            <input
                                                type="number"
                                                className="cell-input"
                                                value={data.price}
                                                onChange={(e) => handleValueChange(dStr, 'price', e.target.value)}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>

                            {/* Dynamic Guest Pricing Rows (Adults) */}
                            {showGuestPricing && [3, 4, 5, 6].map(num => (
                                <tr key={`adult-${num}`} className="guest-price-row" style={{ background: '#fdfdfd' }}>
                                    <td className="sticky-col row-label-cell" style={{ paddingLeft: '30px' }}>
                                        <span className="row-label-text" style={{ fontSize: '13px', color: '#666' }}>{num} Yetişkin</span>
                                    </td>
                                    {timelineDays.map(day => {
                                        const dStr = formatDate(day)
                                        const finalGuestPrice = adminSettings.getCalculateSplitPrice(dStr, num, 0)
                                        return (
                                            <td key={dStr} className="data-cell" style={{ color: '#888', fontSize: '13px' }}>
                                                {finalGuestPrice.toLocaleString()}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}

                            {/* Dynamic Guest Pricing Rows (Children) */}
                            {showGuestPricing && [1, 2, 3].map(num => (
                                <tr key={`child-${num}`} className="guest-price-row" style={{ background: '#fdfdfd' }}>
                                    <td className="sticky-col row-label-cell" style={{ paddingLeft: '30px' }}>
                                        <span className="row-label-text" style={{ fontSize: '13px', color: '#446688' }}>+ {num} Çocuk</span>
                                    </td>
                                    {timelineDays.map(day => {
                                        const dStr = formatDate(day)
                                        const finalGuestPrice = adminSettings.getCalculateSplitPrice(dStr, 2, num)
                                        return (
                                            <td key={dStr} className="data-cell" style={{ color: '#446688', fontSize: '13px', opacity: 0.8 }}>
                                                {finalGuestPrice.toLocaleString()}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}

                            <tr style={{ height: '10px', background: '#f9f9f9' }}>
                                <td className="sticky-col" style={{ background: '#f9f9f9', border: 'none' }}></td>
                                <td colSpan={timelineDays.length} style={{ border: 'none' }}></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default InventoryTab
