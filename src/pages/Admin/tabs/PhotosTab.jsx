import React, { useState, useRef } from 'react'
import { adminSettings } from '../../../services/adminSettings'
import { HomeIcon } from '../components/Icons'

function PhotosTab({
    propertyData,
    setPropertyData,
    pendingImages,
    setPendingImages,
    hasImageChanges,
    setHasImageChanges,
    showConfirmPopup,
    setShowConfirmPopup
}) {
    // Get current images (pending or saved)
    const currentImages = pendingImages || propertyData.siteImages || {}

    // Image upload handler - saves to pending state
    const handleImageUpload = (file, section, key) => {
        if (!file) return

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Lütfen sadece resim dosyası yükleyin.')
            return
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Dosya boyutu 5MB\'dan küçük olmalıdır.')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const base64 = e.target.result
            const updatedImages = {
                ...currentImages,
                [section]: { ...currentImages[section], [key]: base64 }
            }
            setPendingImages(updatedImages)
            setHasImageChanges(true)
        }
        reader.readAsDataURL(file)
    }

    // Save all pending changes
    const handleSaveImages = () => {
        if (!pendingImages) return

        const updated = {
            ...propertyData,
            siteImages: pendingImages,
            heroImage: pendingImages.hero?.background || propertyData.heroImage
        }
        setPropertyData(adminSettings.updatePropertyData(updated))
        setPendingImages(null)
        setHasImageChanges(false)
        setShowConfirmPopup(false)
        alert('✅ Fotoğraflar başarıyla kaydedildi!')
    }

    // Drop zone component
    const DropZone = ({ section, imageKey, currentImage, label, description }) => {
        const [isDragging, setIsDragging] = useState(false)
        const inputRef = useRef()

        const handleDrop = (e) => {
            e.preventDefault()
            setIsDragging(false)
            const file = e.dataTransfer.files[0]
            handleImageUpload(file, section, imageKey)
        }

        const handleDragOver = (e) => {
            e.preventDefault()
            setIsDragging(true)
        }

        const handleDragLeave = () => {
            setIsDragging(false)
        }

        const handleClick = () => {
            inputRef.current?.click()
        }

        const handleFileChange = (e) => {
            const file = e.target.files[0]
            handleImageUpload(file, section, imageKey)
        }

        // Use pending image if exists, otherwise use saved image
        const displayImage = pendingImages?.[section]?.[imageKey] || currentImage

        return (
            <div style={{ marginBottom: '15px' }}>
                {label && <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>{label}</label>}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                    style={{
                        width: '100%',
                        height: '180px',
                        borderRadius: '12px',
                        border: isDragging ? '3px dashed #2d4a3e' : (pendingImages?.[section]?.[imageKey] ? '3px solid #22c55e' : '2px dashed #cbd5e1'),
                        background: isDragging ? '#e8f5e9' : (displayImage ? 'transparent' : '#f8fafc'),
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {displayImage ? (
                        <>
                            <img
                                src={displayImage}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '12px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                color: 'white',
                                fontSize: '12px',
                                textAlign: 'center'
                            }}>
                                {pendingImages?.[section]?.[imageKey] ? '🟢 Yeni fotoğraf yüklendi (kaydetmeyi unutmayın)' : '📷 Değiştirmek için tıklayın veya sürükleyin'}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '40px', marginBottom: '10px', opacity: 0.5 }}>📷</div>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                                Fotoğrafı buraya sürükleyin
                            </p>
                            <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '12px' }}>
                                veya tıklayarak seçin
                            </p>
                        </>
                    )}
                </div>
                {description && <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{description}</p>}
            </div>
        )
    }

    return (
        <section className="photos-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd', position: 'relative' }}>
            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '16px',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ fontSize: '50px', marginBottom: '15px' }}>⚠️</div>
                        <h3 style={{ marginBottom: '15px', color: '#1a362d' }}>Değişiklikleri Kaydet</h3>
                        <p style={{ color: '#666', marginBottom: '25px' }}>
                            Fotoğraf değişikliklerini kaydetmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowConfirmPopup(false)}
                                style={{
                                    padding: '12px 25px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSaveImages}
                                style={{
                                    padding: '12px 25px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#22c55e',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                ✓ Evet, Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 className="page-title" style={{ marginBottom: '5px' }}>Site Fotoğraf Yönetimi</h2>
                    <p style={{ color: '#666', margin: 0 }}>
                        Fotoğrafları sürükleyip bırakarak veya tıklayarak yükleyebilirsiniz.
                    </p>
                </div>
                {hasImageChanges && (
                    <button
                        onClick={() => setShowConfirmPopup(true)}
                        style={{
                            padding: '14px 30px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            animation: 'pulse 2s infinite'
                        }}
                    >
                        💾 Değişiklikleri Kaydet
                    </button>
                )}
            </div>

            {hasImageChanges && (
                <div style={{
                    background: '#fef3c7',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{ fontSize: '20px' }}>⚠️</span>
                    <span style={{ color: '#92400e', fontWeight: '500' }}>
                        Kaydedilmemiş değişiklikleriniz var! Kaydet butonuna tıklamayı unutmayın.
                    </span>
                </div>
            )}

            <div style={{ display: 'grid', gap: '30px' }}>
                {/* Hero Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HomeIcon /> Ana Sayfa Arka Planı (Hero)
                    </h3>
                    <DropZone
                        section="hero"
                        imageKey="background"
                        currentImage={propertyData.siteImages?.hero?.background || propertyData.heroImage}
                        description="Ana sayfanın üst kısmında görünen arka plan görseli. Önerilen boyut: 1920x1080px"
                    />
                </div>

                {/* Services Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛎️ Hizmetler Bölümü
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <DropZone
                            section="services"
                            imageKey="image1"
                            currentImage={propertyData.siteImages?.services?.image1}
                            label="Sol Görsel"
                            description="Önerilen boyut: 800x600px"
                        />
                        <DropZone
                            section="services"
                            imageKey="image2"
                            currentImage={propertyData.siteImages?.services?.image2}
                            label="Sağ Görsel"
                            description="Önerilen boyut: 800x600px"
                        />
                    </div>
                </div>

                {/* Room Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛏️ Oda Tanıtım Görseli
                    </h3>
                    <DropZone
                        section="room"
                        imageKey="main"
                        currentImage={propertyData.siteImages?.room?.main}
                        description="Ana sayfadaki oda tanıtım bölümünde görünen fotoğraf. Önerilen boyut: 1000x800px"
                    />
                </div>

                {/* About Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        ℹ️ Hakkımızda Bölümü
                    </h3>
                    <DropZone
                        section="about"
                        imageKey="image1"
                        currentImage={propertyData.siteImages?.about?.image1}
                        description="Hakkımızda bölümünde görünen ana fotoğraf. Önerilen boyut: 800x600px"
                    />
                </div>
            </div>
        </section>
    )
}

export default PhotosTab
