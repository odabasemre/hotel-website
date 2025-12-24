import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/pages/gallery-page.css'
import { galleryImages as fallbackImages } from '../data/galleryData'
import { adminSettings } from '../services/adminSettings'

function GalleryPage() {
    const { t } = useTranslation()
    const [propertyData] = useState(adminSettings.getPropertyData())

    // Combine admin photos with fallback if admin hasn't set any, or just use admin
    const displayImages = propertyData.photos && propertyData.photos.length > 0
        ? propertyData.photos.map(src => ({ src, alt: 'Tesis Fotoğrafı', caption: 'Ayder Kuzey' }))
        : fallbackImages

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="gallery-page">
            <div className="container">
                <div className="gallery-page-header">
                    <span className="gallery-page-subtitle">{t('gallery.subtitle') || 'Otelimizi Keşfedin'}</span>
                    <h1 className="gallery-page-title">{t('gallery.title') || 'Fotoğraf Galerisi'}</h1>
                </div>

                <div className="gallery-page-grid">
                    {displayImages.map((image, index) => (
                        <div className="gallery-page-item" key={index}>
                            <img src={image.src} alt={image.alt} loading="lazy" />
                            <div className="gallery-page-overlay">
                                <span className="gallery-page-caption">{image.caption}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GalleryPage
