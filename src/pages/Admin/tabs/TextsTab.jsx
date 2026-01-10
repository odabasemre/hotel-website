import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeIcon } from '../components/Icons'

const LANGUAGES = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

// Editable text fields configuration
const TEXT_FIELDS = {
    hero: {
        title: 'Ana Sayfa Başlığı',
        fields: [
            { key: 'hero.title', label: 'Ana Başlık', multiline: false },
            { key: 'hero.subtitle', label: 'Alt Başlık', multiline: false },
            { key: 'hero.cta', label: 'Buton Metni', multiline: false }
        ]
    },
    about: {
        title: 'Hakkımızda',
        fields: [
            { key: 'about.title', label: 'Başlık', multiline: false },
            { key: 'about.subtitle', label: 'Alt Başlık', multiline: false },
            { key: 'about.description', label: 'Açıklama', multiline: true },
            { key: 'about.mission', label: 'Misyon', multiline: true }
        ]
    },
    services: {
        title: 'Hizmetler',
        fields: [
            { key: 'services.title', label: 'Başlık', multiline: false },
            { key: 'services.subtitle', label: 'Alt Başlık', multiline: false },
            { key: 'services.description', label: 'Açıklama', multiline: true }
        ]
    },
    rooms: {
        title: 'Odalar',
        fields: [
            { key: 'rooms.title', label: 'Başlık', multiline: false },
            { key: 'rooms.subtitle', label: 'Alt Başlık', multiline: false },
            { key: 'rooms.shortDescription', label: 'Kısa Açıklama', multiline: true },
            { key: 'rooms.fullDescription', label: 'Detaylı Açıklama', multiline: true }
        ]
    },
    footer: {
        title: 'Alt Bilgi',
        fields: [
            { key: 'footer.copyright', label: 'Telif Hakkı', multiline: false }
        ]
    },
    contact: {
        title: 'İletişim',
        fields: [
            { key: 'contact.title', label: 'Başlık', multiline: false },
            { key: 'contact.subtitle', label: 'Alt Başlık', multiline: false }
        ]
    }
}

// Debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

// Text Input Component
const TextInput = React.memo(function TextInput({ id, label, initialValue, multiline, onChange }) {
    const [value, setValue] = useState(initialValue || '')
    const isFirst = useRef(true)
    const debouncedValue = useDebounce(value, 400)
    
    useEffect(() => {
        setValue(initialValue || '')
    }, [initialValue])
    
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        onChange(debouncedValue)
    }, [debouncedValue, onChange])
    
    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #e2e8f0',
        fontSize: '14px',
        fontFamily: 'inherit',
        outline: 'none',
        background: 'white',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s'
    }
    
    return (
        <div style={{ marginBottom: '16px' }}>
            <label htmlFor={id} style={{ 
                display: 'block', fontWeight: '600', fontSize: '13px', 
                color: '#374151', marginBottom: '6px' 
            }}>
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    rows={4}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={label}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={(e) => e.target.style.borderColor = '#1a362d'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
            ) : (
                <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={label}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1a362d'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
            )}
        </div>
    )
})

// Section Card
function SectionCard({ icon, title, color, children }) {
    return (
        <div style={{ background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15`, borderRadius: '8px', color: color }}>
                    {icon}
                </span>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>{title}</h3>
            </div>
            <div style={{ padding: '20px' }}>{children}</div>
        </div>
    )
}

function TextsTab() {
    const { t, i18n } = useTranslation()
    const [selectedLang, setSelectedLang] = useState(i18n.language || 'tr')
    const [translations, setTranslations] = useState({})
    const [originalTranslations, setOriginalTranslations] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null)
    const handlersRef = useRef({})
    
    // Load translations for selected language
    useEffect(() => {
        const loadTranslations = async () => {
            setLoading(true)
            try {
                // First try to get from database via API
                let data = null
                try {
                    const dbResponse = await fetch(`/api/settings/translations/${selectedLang}`)
                    if (dbResponse.ok) {
                        data = await dbResponse.json()
                    }
                } catch (e) {
                    console.log('DB fetch failed, falling back to static file')
                }
                
                // Fallback to static translation file
                if (!data) {
                    const fileResponse = await fetch(`/locales/${selectedLang}/translation.json`)
                    if (fileResponse.ok) {
                        data = await fileResponse.json()
                    }
                }
                
                if (data) {
                    setTranslations(data)
                    setOriginalTranslations(JSON.parse(JSON.stringify(data)))
                }
            } catch (error) {
                console.error('Error loading translations:', error)
            }
            setLoading(false)
        }
        loadTranslations()
        handlersRef.current = {}
    }, [selectedLang])
    
    // Get nested value from object using dot notation
    const getValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) || ''
    }
    
    // Set nested value in object using dot notation
    const setValue = (obj, path, value) => {
        const parts = path.split('.')
        const newObj = JSON.parse(JSON.stringify(obj))
        let current = newObj
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {}
            current = current[parts[i]]
        }
        current[parts[parts.length - 1]] = value
        return newObj
    }
    
    // Update handler with stable reference
    const getFieldHandler = (key) => {
        if (!handlersRef.current[key]) {
            handlersRef.current[key] = (value) => {
                setTranslations(prev => setValue(prev, key, value))
                setHasChanges(true)
                setSaveStatus(null)
            }
        }
        return handlersRef.current[key]
    }
    
    // Save translations
    const handleSave = async () => {
        setSaving(true)
        setSaveStatus(null)
        
        try {
            const response = await fetch(`/api/settings/translations/${selectedLang}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(translations)
            })
            
            if (response.ok) {
                setSaveStatus('success')
                setHasChanges(false)
                setOriginalTranslations(JSON.parse(JSON.stringify(translations)))
                
                // Update i18next resources - replace the entire bundle
                i18n.addResourceBundle(selectedLang, 'translation', translations, true, true)
                
                // Force re-render of components using t() function
                if (selectedLang === i18n.language) {
                    // Change language to trigger re-render, then change back
                    const currentLang = i18n.language
                    await i18n.changeLanguage(currentLang === 'tr' ? 'en' : 'tr')
                    await i18n.changeLanguage(currentLang)
                }
            } else {
                setSaveStatus('error')
            }
        } catch (error) {
            console.error('Save error:', error)
            setSaveStatus('error')
        }
        
        setSaving(false)
    }
    
    // Language change handler
    const handleLanguageChange = (langCode) => {
        if (langCode !== selectedLang) {
            if (hasChanges) {
                if (!confirm('Kaydedilmemiş değişiklikler var. Devam etmek istiyor musunuz?')) {
                    return
                }
            }
            setSelectedLang(langCode)
            setHasChanges(false)
            setSaveStatus(null)
        }
    }
    
    const sectionIcons = {
        hero: <HomeIcon />,
        about: 'ℹ️',
        services: '🛎️',
        rooms: '🛏️',
        footer: '📝',
        contact: '📞'
    }
    
    const sectionColors = {
        hero: '#1a362d',
        about: '#0369a1',
        services: '#7c3aed',
        rooms: '#dc2626',
        footer: '#059669',
        contact: '#0891b2'
    }

    return (
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '24px 30px', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1a362d', marginBottom: '6px' }}>
                    📝 Site Yazıları Yönetimi
                </h2>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                    Dil dosyalarındaki çevirileri düzenleyin - değişiklikler anında yansır
                </p>
            </div>
            
            {/* Language Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
                {LANGUAGES.map((lang) => (
                    <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        style={{
                            flex: 1,
                            padding: '16px 20px',
                            border: 'none',
                            borderBottom: selectedLang === lang.code ? '3px solid #1a362d' : '3px solid transparent',
                            background: selectedLang === lang.code ? 'white' : 'transparent',
                            color: selectedLang === lang.code ? '#1a362d' : '#6b7280',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: selectedLang === lang.code ? '700' : '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>{lang.flag}</span>
                        {lang.name}
                    </button>
                ))}
            </div>
            
            {/* Content */}
            <div style={{ padding: '30px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
                        <p style={{ margin: 0, fontSize: '16px' }}>
                            {LANGUAGES.find(l => l.code === selectedLang)?.name} çevirileri yükleniyor...
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {Object.entries(TEXT_FIELDS).map(([sectionKey, section]) => (
                            <SectionCard 
                                key={sectionKey}
                                icon={sectionIcons[sectionKey]} 
                                title={section.title} 
                                color={sectionColors[sectionKey]}
                            >
                                {section.fields.map((field) => (
                                    <TextInput
                                        key={`${field.key}-${selectedLang}`}
                                        id={`${field.key}-${selectedLang}`}
                                        label={field.label}
                                        initialValue={getValue(translations, field.key)}
                                        multiline={field.multiline}
                                        onChange={getFieldHandler(field.key)}
                                    />
                                ))}
                            </SectionCard>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Save Bar */}
            <div style={{
                padding: '20px 30px',
                borderTop: '1px solid #e5e7eb',
                background: hasChanges ? '#fef3c7' : '#f0fdf4',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                bottom: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>
                        {hasChanges ? '⚠️' : saveStatus === 'success' ? '✅' : '💡'}
                    </span>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', color: hasChanges ? '#92400e' : '#166534', fontSize: '14px' }}>
                            {hasChanges 
                                ? 'Kaydedilmemiş değişiklikler var'
                                : saveStatus === 'success'
                                    ? 'Çeviriler başarıyla kaydedildi!'
                                    : `${LANGUAGES.find(l => l.code === selectedLang)?.name} çevirileri düzenleniyor`
                            }
                        </p>
                        {hasChanges && (
                            <p style={{ margin: 0, fontSize: '12px', color: '#b45309', marginTop: '2px' }}>
                                Değişiklikler dil dosyasına kaydedilecek
                            </p>
                        )}
                    </div>
                </div>
                
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || !hasChanges}
                    style={{
                        padding: '14px 32px',
                        borderRadius: '10px',
                        border: 'none',
                        background: !hasChanges ? '#9ca3af' : saving ? '#6b7280' : 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: saving || !hasChanges ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s',
                        boxShadow: hasChanges && !saving ? '0 4px 14px rgba(26, 54, 45, 0.4)' : 'none'
                    }}
                >
                    {saving ? '⏳ Kaydediliyor...' : saveStatus === 'success' ? '✅ Kaydedildi!' : saveStatus === 'error' ? '❌ Tekrar Dene' : `💾 Kaydet`}
                </button>
            </div>
        </div>
    )
}

export default TextsTab
