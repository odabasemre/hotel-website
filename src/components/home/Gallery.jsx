import { useTranslation } from 'react-i18next'

// Zoom icon for gallery hover effect
const ZoomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
)

function Gallery() {
    const { t } = useTranslation()

    const images = [
        {
            src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            alt: 'Hotel lobby'
        },
        {
            src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Bedroom'
        },
        {
            src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Restaurant'
        },
        {
            src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Hotel pool'
        },
        {
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Exterior view'
        },
        {
            src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Spa'
        },
    ]

    return (
        <section className="gallery-section" id="gallery">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">{t('gallery.subtitle')}</p>
                    <h2 className="section-title">{t('gallery.title')}</h2>
                </div>

                <div className="gallery-grid">
                    {images.map((image, index) => (
                        <div className="gallery-item" key={index}>
                            <img src={image.src} alt={image.alt} loading="lazy" />
                            <div className="gallery-overlay">
                                <div className="gallery-icon">
                                    <ZoomIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery
