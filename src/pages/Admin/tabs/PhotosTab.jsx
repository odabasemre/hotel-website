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
    const [uploading, setUploading] = useState(false)
    const [notification, setNotification] = useState(null)
    
    // Get current images (pending or saved)
    const currentImages = pendingImages || propertyData.siteImages || {}

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    // Image upload handler - uploads to API immediately
    const handleImageUpload = async (file, section, key) => {
        if (!file) return

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Lütfen sadece resim dosyası yükleyin.')
            return
        }

        // Check file size (max 20MB to match backend)
        if (file.size > 20 * 1024 * 1024) {
            alert('Dosya boyutu 20MB\'dan küçük olmalıdır.')
            return
        }

        setUploading(true)
        try {
            // Upload to API
            const imageKey = `${section}_${key}`
            const imagePath = await adminSettings.uploadImage(file, section, imageKey)
            
            // Update pending images with the new path
            const updatedImages = {
                ...currentImages,
                [section]: { ...currentImages[section], [key]: imagePath }
            }
            setPendingImages(updatedImages)
            setHasImageChanges(true)
            showNotification(`✅ ${file.name} yüklendi! Kaydetmeyi unutmayın.`, 'info')
        } catch (error) {
            console.error('Upload error:', error)
            showNotification('❌ Fotoğraf yüklenirken hata oluştu.', 'error')
        } finally {
            setUploading(false)
        }
    }

    // Save all pending changes
    const handleSaveImages = async () => {
        if (!pendingImages) return

        setUploading(true)
        try {
            const updated = {
                ...propertyData,
                siteImages: pendingImages,
                heroImage: pendingImages.hero?.background || propertyData.heroImage
            }
            
            // Save to both localStorage and API
            await adminSettings.updatePropertyDataAsync(updated)
            setPropertyData(updated)
            setPendingImages(null)
            setHasImageChanges(false)
            setShowConfirmPopup(false)
            
            showNotification('✅ Fotoğraflar başarıyla kaydedildi!', 'success')
        } catch (error) {
            console.error('Save error:', error)
            showNotification('❌ Kaydetme sırasında hata oluştu.', 'error')
        } finally {
            setUploading(false)
        }
    }

    // Drop zone component
    const DropZone = ({ section, imageKey, currentImage, label, description, size = 'normal' }) => {
        const [isDragging, setIsDragging] = useState(false)
        const inputRef = useRef()

        const handleDrop = (e) => {
            e.preventDefault()
            setIsDragging(false)
            if (!uploading) {
                const file = e.dataTransfer.files[0]
                handleImageUpload(file, section, imageKey)
            }
        }

        const handleDragOver = (e) => {
            e.preventDefault()
            if (!uploading) {
                setIsDragging(true)
            }
        }

        const handleDragLeave = () => {
            setIsDragging(false)
        }

        const handleClick = () => {
            if (!uploading) {
                inputRef.current?.click()
            }
        }

        const handleFileChange = (e) => {
            if (!uploading) {
                const file = e.target.files[0]
                handleImageUpload(file, section, imageKey)
            }
        }

        // Use pending image if exists, otherwise use saved image
        const displayImage = pendingImages?.[section]?.[imageKey] || currentImage
        const height = size === 'small' ? '120px' : size === 'large' ? '250px' : '180px'

        return (
            <div style={{ marginBottom: '10px' }}>
                {label && <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>{label}</label>}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                    style={{
                        width: '100%',
                        height: height,
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

                    {uploading ? (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            zIndex: 10
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
                                Yükleniyor...
                            </div>
                        </div>
                    ) : null}

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
                                padding: size === 'small' ? '8px' : '12px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                color: 'white',
                                fontSize: size === 'small' ? '10px' : '12px',
                                textAlign: 'center'
                            }}>
                                {pendingImages?.[section]?.[imageKey] ? '🟢 Yeni' : '📷 Değiştir'}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: size === 'small' ? '24px' : '40px', marginBottom: '8px', opacity: 0.5 }}>📷</div>
                            <p style={{ margin: 0, color: '#64748b', fontSize: size === 'small' ? '11px' : '14px', fontWeight: '500' }}>
                                Sürükle veya tıkla
                            </p>
                        </>
                    )}
                </div>
                {description && <p style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>{description}</p>}
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

            {/* Notification Toast */}
            {notification && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    background: notification.type === 'success' ? '#22c55e' : 
                               notification.type === 'error' ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    zIndex: 10000,
                    animation: 'slideIn 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px'
                }}>
                    {notification.message}
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>

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

            <div style={{ display: 'grid', gap: '25px' }}>
                {/* Hero Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HomeIcon /> Ana Sayfa Arka Planı (Hero)
                    </h3>
                    <DropZone
                        section="hero"
                        imageKey="background"
                        currentImage={currentImages?.hero?.background || propertyData.heroImage}
                        description="Ana sayfanın üst kısmında görünen arka plan görseli. Önerilen boyut: 1920x1080px"
                        size="large"
                    />
                </div>

                {/* Services Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#1a362d' }}>
                        🛎️ Hizmetler Bölümü (Ana Sayfa)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <DropZone
                            section="services"
                            imageKey="image1"
                            currentImage={currentImages?.services?.image1}
                            label="Sol Görsel"
                            description="Önerilen boyut: 800x600px"
                        />
                        <DropZone
                            section="services"
                            imageKey="image2"
                            currentImage={currentImages?.services?.image2}
                            label="Sağ Görsel"
                            description="Önerilen boyut: 800x600px"
                        />
                    </div>
                </div>

                {/* Rooms Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a362d' }}>
                        🛏️ Odalar Sayfası
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Odalar sayfasındaki slider'da görünecek fotoğraflar (sınırsız).
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        {(() => {
                            // Get all existing room slides
                            const existingSlides = Object.keys(currentImages?.rooms || {})
                                .filter(key => key.startsWith('slide') && currentImages?.rooms?.[key])
                                .sort((a, b) => {
                                    const numA = parseInt(a.replace('slide', ''))
                                    const numB = parseInt(b.replace('slide', ''))
                                    return numA - numB
                                })
                            
                            const slots = []
                            
                            // Show existing slides
                            existingSlides.forEach((key, index) => {
                                slots.push(
                                    <DropZone 
                                        key={key}
                                        section="rooms" 
                                        imageKey={key}
                                        currentImage={currentImages?.rooms?.[key]} 
                                        label={`Oda ${index + 1}`}
                                        size="small" 
                                    />
                                )
                            })
                            
                            // Add one empty slot for adding new photo
                            const nextSlideNum = existingSlides.length > 0 
                                ? Math.max(...existingSlides.map(k => parseInt(k.replace('slide', '')))) + 1 
                                : 1
                            slots.push(
                                <DropZone 
                                    key={`slide${nextSlideNum}`}
                                    section="rooms" 
                                    imageKey={`slide${nextSlideNum}`}
                                    currentImage={null} 
                                    label={`Oda ${existingSlides.length + 1}`}
                                    size="small" 
                                />
                            )
                            
                            return slots
                        })()}
                    </div>
                </div>

                {/* Team Section (Ekibimizi Tanıyın) */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a362d' }}>
                        👥 Ekibimizi Tanıyın
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Hakkımızda sayfasında görünecek ekip üyesi fotoğrafları.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <DropZone 
                            section="team" 
                            imageKey="member1" 
                            currentImage={currentImages?.team?.member1} 
                            label="Ekip Üyesi 1" 
                            size="small" 
                        />
                        <DropZone 
                            section="team" 
                            imageKey="member2" 
                            currentImage={currentImages?.team?.member2} 
                            label="Ekip Üyesi 2" 
                            size="small" 
                        />
                        <DropZone 
                            section="team" 
                            imageKey="member3" 
                            currentImage={currentImages?.team?.member3} 
                            label="Ekip Üyesi 3" 
                            size="small" 
                        />
                        <DropZone 
                            section="team" 
                            imageKey="member4" 
                            currentImage={currentImages?.team?.member4} 
                            label="Ekip Üyesi 4" 
                            size="small" 
                        />
                    </div>
                </div>

                {/* Gallery Section */}
                <div style={{ padding: '25px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a362d' }}>
                        🖼️ Galeri Sayfası
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Galeri sayfasında görünecek fotoğraflar (sınırsız).
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        {(() => {
                            // Get all existing gallery images
                            const existingImages = Object.keys(currentImages?.gallery || {})
                                .filter(key => key.startsWith('image') && currentImages?.gallery?.[key])
                                .sort((a, b) => {
                                    const numA = parseInt(a.replace('image', ''))
                                    const numB = parseInt(b.replace('image', ''))
                                    return numA - numB
                                })
                            
                            const slots = []
                            
                            // Show existing images
                            existingImages.forEach((key, index) => {
                                slots.push(
                                    <DropZone 
                                        key={key}
                                        section="gallery" 
                                        imageKey={key}
                                        currentImage={currentImages?.gallery?.[key]} 
                                        label={`Galeri ${index + 1}`}
                                        size="small" 
                                    />
                                )
                            })
                            
                            // Add one empty slot for adding new photo
                            const nextImageNum = existingImages.length > 0 
                                ? Math.max(...existingImages.map(k => parseInt(k.replace('image', '')))) + 1 
                                : 1
                            slots.push(
                                <DropZone 
                                    key={`image${nextImageNum}`}
                                    section="gallery" 
                                    imageKey={`image${nextImageNum}`}
                                    currentImage={null} 
                                    label={`Galeri ${existingImages.length + 1}`}
                                    size="small" 
                                />
                            )
                            
                            return slots
                        })()}
                    </div>
                </div>

                {/* Activities Section */}
                <div style={{ padding: '25px', background: '#fef3c7', borderRadius: '12px', border: '1px solid #fcd34d' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#92400e' }}>
                        🏔️ Aktiviteler Sayfası
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Aktiviteler sayfasında görünecek fotoğraflar. Her aktivite için bir fotoğraf yükleyebilirsiniz.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        <DropZone 
                            section="activities" 
                            imageKey="yedigoller" 
                            currentImage={currentImages?.activities?.yedigoller} 
                            label="Yedigöller Milli Parkı" 
                            description="25 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="firtina-deresi" 
                            currentImage={currentImages?.activities?.['firtina-deresi']} 
                            label="Fırtına Deresi" 
                            description="25 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="ayder-yaylasi" 
                            currentImage={currentImages?.activities?.['ayder-yaylasi']} 
                            label="Ayder Yaylası" 
                            description="4 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="huser-yaylasi" 
                            currentImage={currentImages?.activities?.['huser-yaylasi']} 
                            label="Huser Yaylası" 
                            description="12 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="zilkale" 
                            currentImage={currentImages?.activities?.zilkale} 
                            label="Zilkale" 
                            description="15 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="palovit-selalesi" 
                            currentImage={currentImages?.activities?.['palovit-selalesi']} 
                            label="Palovit Şelalesi" 
                            description="18 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="senyuva-koprusu" 
                            currentImage={currentImages?.activities?.['senyuva-koprusu']} 
                            label="Şenyuva Köprüsü" 
                            description="22 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="samistal-yaylasi" 
                            currentImage={currentImages?.activities?.['samistal-yaylasi']} 
                            label="Samistal Yaylası" 
                            description="15 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="kavrun-yaylasi" 
                            currentImage={currentImages?.activities?.['kavrun-yaylasi']} 
                            label="Kavrun Yaylası" 
                            description="8 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="pokut-yaylasi" 
                            currentImage={currentImages?.activities?.['pokut-yaylasi']} 
                            label="Pokut Yaylası" 
                            description="12 km mesafede"
                            size="small" 
                        />
                        <DropZone 
                            section="activities" 
                            imageKey="tar-deresi" 
                            currentImage={currentImages?.activities?.['tar-deresi']} 
                            label="Tar Deresi" 
                            description="10 km mesafede"
                            size="small" 
                        />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div style={{ marginTop: '25px', padding: '20px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ marginBottom: '12px', color: '#1e40af', fontSize: '15px' }}>💡 Fotoğraf Yükleme İpuçları</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#3b82f6', fontSize: '13px', lineHeight: '1.8' }}>
                    <li>Maksimum dosya boyutu: 20MB</li>
                    <li>Önerilen format: JPG veya PNG</li>
                    <li>Hero görseli için en az 1920x1080px çözünürlük önerilir</li>
                    <li>Değişiklikler sadece "Kaydet" butonuna tıklandığında kaydedilir</li>
                </ul>
            </div>
        </section>
    )
}

export default PhotosTab
