import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/pages/gallery-page.css'
import { adminSettings } from '../services/adminSettings'

function GalleryPage() {
    const { t } = useTranslation()
    const [propertyData] = useState(adminSettings.getPropertyData())

    // Get gallery images from admin siteImages
    const getGalleryImages = () => {
        const gallery = propertyData.siteImages?.gallery || {}
        const images = []
        
        // Collect all gallery images (image1 through image8)
        for (let i = 1; i <= 8; i++) {
            const img = gallery[`image${i}`]
            if (img) {
                images.push({
                    src: img,
                    alt: `Galeri ${i}`,
                    caption: 'Ayder Kuzey Houses'
                })
            }
        }
        
        // If no images in admin, use defaults
        if (images.length === 0) {
            return [
                { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Galeri 1', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 2', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 3', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 4', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 5', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 6', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 7', caption: 'Ayder Kuzey Houses' },
                { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Galeri 8', caption: 'Ayder Kuzey Houses' }
            ]
        }
        
        return images
    }

    const displayImages = getGalleryImages()

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
