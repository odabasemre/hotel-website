import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/pages/gallery-page.css'
import { galleryImages } from '../data/galleryData'

function GalleryPage() {
    const { t } = useTranslation()

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
                    {galleryImages.map((image, index) => (
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
