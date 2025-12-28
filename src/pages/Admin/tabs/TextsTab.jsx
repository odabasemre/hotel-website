import React, { useState } from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { HomeIcon } from '../components/Icons'

function TextsTab({ siteTexts, setSiteTexts }) {
    const [activeField, setActiveField] = useState(null)

    const handleUpdate = (section, field, value) => {
        const updated = {
            ...siteTexts,
            [section]: { ...siteTexts[section], [field]: value }
        }
        setSiteTexts(adminSettings.updateSiteTexts(updated))
    }

    const handleStyleUpdate = (section, field, styleKey, value) => {
        const currentStyles = siteTexts[section]?.[`${field}Style`] || {}
        const updated = {
            ...siteTexts,
            [section]: { 
                ...siteTexts[section], 
                [`${field}Style`]: { ...currentStyles, [styleKey]: value }
            }
        }
        setSiteTexts(adminSettings.updateSiteTexts(updated))
    }

    const getStyle = (section, field, styleKey) => {
        return siteTexts[section]?.[`${field}Style`]?.[styleKey] || ''
    }

    // Text Toolbar Component
    const TextToolbar = ({ section, field }) => {
        const isActive = activeField === `${section}-${field}`
        const fontSize = getStyle(section, field, 'fontSize') || '16'
        const fontWeight = getStyle(section, field, 'fontWeight') || 'normal'
        const fontStyle = getStyle(section, field, 'fontStyle') || 'normal'
        const textAlign = getStyle(section, field, 'textAlign') || 'left'
        const fontFamily = getStyle(section, field, 'fontFamily') || 'inherit'

        if (!isActive) return null

        return (
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '15px', 
                marginBottom: '15px', 
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                {/* Row 1: Font Family (Full Width) */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '12px 15px',
                    borderRadius: '8px'
                }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#333', minWidth: '90px' }}>📝 Yazı Tipi:</span>
                    <select
                        value={fontFamily}
                        onChange={(e) => handleStyleUpdate(section, field, 'fontFamily', e.target.value)}
                        style={{ 
                            flex: 1,
                            padding: '8px 12px', 
                            borderRadius: '6px', 
                            border: '2px solid #e2e8f0', 
                            fontSize: '13px',
                            fontFamily: fontFamily !== 'inherit' ? fontFamily : undefined,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <option value="inherit">Varsayılan</option>
                        <option value="Arial, sans-serif" style={{ fontFamily: 'Arial' }}>Arial</option>
                        <option value="'Calibri', sans-serif" style={{ fontFamily: 'Calibri' }}>Calibri</option>
                        <option value="'Helvetica Neue', Helvetica, sans-serif" style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
                        <option value="'Times New Roman', Times, serif" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                        <option value="Georgia, serif" style={{ fontFamily: 'Georgia' }}>Georgia</option>
                        <option value="'Courier New', Courier, monospace" style={{ fontFamily: 'Courier New' }}>Courier New</option>
                        <option value="Verdana, sans-serif" style={{ fontFamily: 'Verdana' }}>Verdana</option>
                        <option value="'Trebuchet MS', sans-serif" style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
                        <option value="'Comic Sans MS', cursive" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                        <option value="Impact, sans-serif" style={{ fontFamily: 'Impact' }}>Impact</option>
                        <option value="'Lucida Sans', sans-serif" style={{ fontFamily: 'Lucida Sans' }}>Lucida Sans</option>
                        <option value="Tahoma, sans-serif" style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
                        <option value="'Palatino Linotype', serif" style={{ fontFamily: 'Palatino' }}>Palatino</option>
                        <option value="Garamond, serif" style={{ fontFamily: 'Garamond' }}>Garamond</option>
                        <option value="'Book Antiqua', serif" style={{ fontFamily: 'Book Antiqua' }}>Book Antiqua</option>
                        <option value="'Arial Black', sans-serif" style={{ fontFamily: 'Arial Black' }}>Arial Black</option>
                        <option value="'MS Sans Serif', sans-serif">MS Sans Serif</option>
                        <option value="'Century Gothic', sans-serif" style={{ fontFamily: 'Century Gothic' }}>Century Gothic</option>
                        <option value="'Gill Sans', sans-serif" style={{ fontFamily: 'Gill Sans' }}>Gill Sans</option>
                        <option value="Candara, sans-serif" style={{ fontFamily: 'Candara' }}>Candara</option>
                        <option value="Consolas, monospace" style={{ fontFamily: 'Consolas' }}>Consolas</option>
                        <option value="Monaco, monospace" style={{ fontFamily: 'Monaco' }}>Monaco</option>
                        <option value="'Lucida Console', monospace" style={{ fontFamily: 'Lucida Console' }}>Lucida Console</option>
                        <option value="'Segoe UI', sans-serif" style={{ fontFamily: 'Segoe UI' }}>Segoe UI</option>
                        <option value="Rockwell, serif" style={{ fontFamily: 'Rockwell' }}>Rockwell</option>
                        <option value="'Franklin Gothic Medium', sans-serif">Franklin Gothic</option>
                        <option value="'Copperplate Gothic', sans-serif">Copperplate</option>
                        <option value="Papyrus, cursive" style={{ fontFamily: 'Papyrus' }}>Papyrus</option>
                        <option value="'Brush Script MT', cursive">Brush Script</option>
                    </select>
                </div>

                {/* Row 2: Controls */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr auto',
                    gap: '15px',
                    alignItems: 'center'
                }}>
                    {/* Font Size */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '10px 15px',
                        borderRadius: '8px'
                    }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#333', minWidth: '45px' }}>📏 Boyut:</span>
                        <select
                            value={fontSize}
                            onChange={(e) => handleStyleUpdate(section, field, 'fontSize', e.target.value)}
                            style={{ 
                                padding: '6px 10px', 
                                borderRadius: '6px', 
                                border: '2px solid #e2e8f0', 
                                fontSize: '13px',
                                cursor: 'pointer',
                                flex: 1
                            }}
                        >
                            <option value="10">10px</option>
                            <option value="12">12px</option>
                            <option value="14">14px</option>
                            <option value="16">16px</option>
                            <option value="18">18px</option>
                            <option value="20">20px</option>
                            <option value="22">22px</option>
                            <option value="24">24px</option>
                            <option value="28">28px</option>
                            <option value="32">32px</option>
                            <option value="36">36px</option>
                            <option value="42">42px</option>
                            <option value="48">48px</option>
                            <option value="56">56px</option>
                            <option value="64">64px</option>
                            <option value="72">72px</option>
                        </select>
                    </div>

                    {/* Style Buttons */}
                    <div style={{ 
                        display: 'flex', 
                        gap: '10px',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        justifyContent: 'center'
                    }}>
                        <button
                            type="button"
                            onClick={() => handleStyleUpdate(section, field, 'fontWeight', fontWeight === 'bold' ? 'normal' : 'bold')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: fontWeight === 'bold' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                                color: fontWeight === 'bold' ? '#fff' : '#333',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '15px',
                                transition: 'all 0.3s',
                                boxShadow: fontWeight === 'bold' ? '0 4px 10px rgba(102, 126, 234, 0.4)' : 'none'
                            }}
                            title="Kalın"
                        >
                            B
                        </button>

                        <button
                            type="button"
                            onClick={() => handleStyleUpdate(section, field, 'fontStyle', fontStyle === 'italic' ? 'normal' : 'italic')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: fontStyle === 'italic' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                                color: fontStyle === 'italic' ? '#fff' : '#333',
                                fontStyle: 'italic',
                                cursor: 'pointer',
                                fontSize: '15px',
                                transition: 'all 0.3s',
                                boxShadow: fontStyle === 'italic' ? '0 4px 10px rgba(102, 126, 234, 0.4)' : 'none'
                            }}
                            title="İtalik"
                        >
                            I
                        </button>
                    </div>

                    {/* Text Align */}
                    <div style={{ 
                        display: 'flex', 
                        gap: '0',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '10px 15px',
                        borderRadius: '8px'
                    }}>
                        <button
                            type="button"
                            onClick={() => handleStyleUpdate(section, field, 'textAlign', 'left')}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '6px 0 0 6px',
                                border: 'none',
                                background: textAlign === 'left' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                                color: textAlign === 'left' ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.3s',
                                boxShadow: textAlign === 'left' ? '0 4px 10px rgba(102, 126, 234, 0.4)' : 'none'
                            }}
                            title="Sola Hizala"
                        >
                            ⬅
                        </button>
                        <button
                            type="button"
                            onClick={() => handleStyleUpdate(section, field, 'textAlign', 'center')}
                            style={{
                                padding: '8px 14px',
                                border: 'none',
                                background: textAlign === 'center' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                                color: textAlign === 'center' ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.3s',
                                boxShadow: textAlign === 'center' ? '0 4px 10px rgba(102, 126, 234, 0.4)' : 'none'
                            }}
                            title="Ortala"
                        >
                            ↕
                        </button>
                        <button
                            type="button"
                            onClick={() => handleStyleUpdate(section, field, 'textAlign', 'right')}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '0 6px 6px 0',
                                border: 'none',
                                background: textAlign === 'right' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                                color: textAlign === 'right' ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.3s',
                                boxShadow: textAlign === 'right' ? '0 4px 10px rgba(102, 126, 234, 0.4)' : 'none'
                            }}
                            title="Sağa Hizala"
                        >
                            ➡
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Enhanced Input with style toggle
    const StyledInput = ({ section, field, placeholder, value, multiline = false }) => {
        const fieldId = `${section}-${field}`
        const styles = siteTexts[section]?.[`${field}Style`] || {}
        
        const inputStyle = {
            fontSize: `${styles.fontSize || 16}px`,
            fontWeight: styles.fontWeight || 'normal',
            fontStyle: styles.fontStyle || 'normal',
            textAlign: styles.textAlign || 'left',
            fontFamily: styles.fontFamily || 'inherit'
        }

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontWeight: '600', fontSize: '14px', color: '#1a202c' }}>{placeholder}</label>
                    <button
                        type="button"
                        onClick={() => setActiveField(activeField === fieldId ? null : fieldId)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeField === fieldId 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transform: activeField === fieldId ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>✨</span> 
                        {activeField === fieldId ? 'Stili Gizle' : 'Stil Düzenle'}
                    </button>
                </div>
                <TextToolbar section={section} field={field} />
                {multiline ? (
                    <textarea
                        className="form-control"
                        rows="4"
                        value={value || ''}
                        onChange={(e) => handleUpdate(section, field, e.target.value)}
                        placeholder={placeholder}
                        style={{
                            ...inputStyle,
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '2px solid #e2e8f0',
                            transition: 'all 0.2s',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                ) : (
                    <input
                        type="text"
                        className="form-control"
                        value={value || ''}
                        onChange={(e) => handleUpdate(section, field, e.target.value)}
                        placeholder={placeholder}
                        style={{
                            ...inputStyle,
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '2px solid #e2e8f0',
                            transition: 'all 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                )}
            </div>
        )
    }

    return (
        <section className="texts-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
            <h2 className="page-title">Site Yazıları Yönetimi</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Web sitenizin farklı bölümlerindeki yazıları buradan düzenleyebilirsiniz. "Stil" butonuna tıklayarak yazı boyutu ve stilini ayarlayabilirsiniz.
            </p>

            <div style={{ display: 'grid', gap: '30px' }}>
                {/* Hero Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HomeIcon /> Ana Sayfa (Hero)
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="hero" field="title" placeholder="Başlık" value={siteTexts.hero?.title} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="hero" field="subtitle" placeholder="Alt Başlık" value={siteTexts.hero?.subtitle} />
                    </div>
                    <div className="form-group">
                        <StyledInput section="hero" field="description" placeholder="Açıklama" value={siteTexts.hero?.description} multiline />
                    </div>
                </div>

                {/* About Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        ℹ️ Hakkımızda Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="about" field="title" placeholder="Başlık" value={siteTexts.about?.title} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="about" field="subtitle" placeholder="Alt Başlık" value={siteTexts.about?.subtitle} />
                    </div>
                    <div className="form-group">
                        <StyledInput section="about" field="description" placeholder="Açıklama" value={siteTexts.about?.description} multiline />
                    </div>
                </div>

                {/* Services Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛎️ Hizmetler Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="services" field="title" placeholder="Başlık" value={siteTexts.services?.title} />
                    </div>
                    <div className="form-group">
                        <StyledInput section="services" field="subtitle" placeholder="Alt Başlık" value={siteTexts.services?.subtitle} />
                    </div>
                </div>

                {/* Rooms Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛏️ Odalar Bölümü
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="rooms" field="title" placeholder="Başlık" value={siteTexts.rooms?.title} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <StyledInput section="rooms" field="subtitle" placeholder="Alt Başlık" value={siteTexts.rooms?.subtitle} />
                    </div>
                    <div className="form-group">
                        <StyledInput section="rooms" field="description" placeholder="Açıklama" value={siteTexts.rooms?.description} multiline />
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
                        <StyledInput section="footer" field="description" placeholder="Açıklama" value={siteTexts.footer?.description} multiline />
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
