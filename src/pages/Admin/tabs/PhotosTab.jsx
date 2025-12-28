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
    
    // Get current images (pending or saved)
    const currentImages = pendingImages || propertyData.siteImages || {}

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
            alert(`✅ ${file.name} yüklendi!`)
        } catch (error) {
            console.error('Upload error:', error)
            alert('❌ Fotoğraf yüklenirken hata oluştu. Lütfen tekrar deneyin.')
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
            
            // Force page reload to clear cache
            alert('✅ Fotoğraflar başarıyla kaydedildi! Sayfa yenileniyor...')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.error('Save error:', error)
            alert('❌ Kaydetme sırasında hata oluştu.')
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
                        currentImage={propertyData.siteImages?.hero?.background || propertyData.heroImage}
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

                {/* Rooms Section */}
                <div style={{ padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a362d' }}>
                        🛏️ Odalar Sayfası
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Odalar sayfasındaki slider'da görünecek 8 adet fotoğraf.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <DropZone section="rooms" imageKey="slide1" currentImage={propertyData.siteImages?.rooms?.slide1} label="Oda 1" size="small" />
                        <DropZone section="rooms" imageKey="slide2" currentImage={propertyData.siteImages?.rooms?.slide2} label="Oda 2" size="small" />
                        <DropZone section="rooms" imageKey="slide3" currentImage={propertyData.siteImages?.rooms?.slide3} label="Oda 3" size="small" />
                        <DropZone section="rooms" imageKey="slide4" currentImage={propertyData.siteImages?.rooms?.slide4} label="Oda 4" size="small" />
                        <DropZone section="rooms" imageKey="slide5" currentImage={propertyData.siteImages?.rooms?.slide5} label="Oda 5" size="small" />
                        <DropZone section="rooms" imageKey="slide6" currentImage={propertyData.siteImages?.rooms?.slide6} label="Oda 6" size="small" />
                        <DropZone section="rooms" imageKey="slide7" currentImage={propertyData.siteImages?.rooms?.slide7} label="Oda 7" size="small" />
                        <DropZone section="rooms" imageKey="slide8" currentImage={propertyData.siteImages?.rooms?.slide8} label="Oda 8" size="small" />
                    </div>
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

                {/* Gallery Section */}
                <div style={{ padding: '25px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#1a362d' }}>
                        🖼️ Galeri Sayfası
                    </h3>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                        Galeri sayfasında ve oda detaylarında görünecek fotoğraflar.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <DropZone section="gallery" imageKey="image1" currentImage={propertyData.siteImages?.gallery?.image1} label="Galeri 1" size="small" />
                        <DropZone section="gallery" imageKey="image2" currentImage={propertyData.siteImages?.gallery?.image2} label="Galeri 2" size="small" />
                        <DropZone section="gallery" imageKey="image3" currentImage={propertyData.siteImages?.gallery?.image3} label="Galeri 3" size="small" />
                        <DropZone section="gallery" imageKey="image4" currentImage={propertyData.siteImages?.gallery?.image4} label="Galeri 4" size="small" />
                        <DropZone section="gallery" imageKey="image5" currentImage={propertyData.siteImages?.gallery?.image5} label="Galeri 5" size="small" />
                        <DropZone section="gallery" imageKey="image6" currentImage={propertyData.siteImages?.gallery?.image6} label="Galeri 6" size="small" />
                        <DropZone section="gallery" imageKey="image7" currentImage={propertyData.siteImages?.gallery?.image7} label="Galeri 7" size="small" />
                        <DropZone section="gallery" imageKey="image8" currentImage={propertyData.siteImages?.gallery?.image8} label="Galeri 8" size="small" />
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
