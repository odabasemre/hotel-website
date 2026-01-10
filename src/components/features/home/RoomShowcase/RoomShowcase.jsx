import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '@services'
import roomData from '../../../../data/roomsData'
import './RoomShowcase.css'

// Icons
const GuestsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const SizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
)

const BedroomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
    </svg>
)

const BathroomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="7" y1="19" x2="7" y2="21" />
        <line x1="17" y1="19" x2="17" y2="21" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
)

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
)

function RoomShowcase() {
    const { t } = useTranslation()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await adminSettings.getPropertyDataAsync()
                setPropertyData(data)
            } catch (error) {
                console.error('Error loading property data:', error)
            }
        }
        loadData()
    }, [])

    // Get room images from rooms section in siteImages (same as RoomsPage)
    const getRoomSlideImages = () => {
        const rooms = propertyData?.siteImages?.rooms || {}
        const images = []
        for (let i = 1; i <= 8; i++) {
            const img = rooms[`slide${i}`]
            if (img) {
                // Cache busting for uploaded images
                const imgUrl = img.startsWith('/uploads') ? `${img}?t=${Date.now()}` : img
                images.push(imgUrl)
            }
        }
        // If no images, use defaults
        if (images.length === 0) {
            return [
                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        }
        return images
    }
    
    const roomImages = getRoomSlideImages()

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % roomImages.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length)
    }

    const goToImage = (index) => {
        setCurrentImageIndex(index)
    }

    return (
        <section className="room-showcase-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header-center">
                    <h2 className="section-title-large">{t('rooms.title')}</h2>
                    <p className="section-subtitle-large">{t('rooms.subtitle')}</p>
                </div>

                {/* Room Card */}
                <div className="room-showcase-card">
                    {/* Room Image - Same as RoomsPage */}
                    <div className="room-showcase-image">
                        {/* Main Image */}
                        <img 
                            src={roomImages[currentImageIndex]} 
                            alt={`Oda ${currentImageIndex + 1}`}
                            className="room-gallery-main-image"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            }}
                        />
                        
                        {/* Navigation Overlay */}
                        <div className="room-gallery-nav-overlay">
                            {/* Previous Button */}
                            <button
                                onClick={prevImage}
                                className="room-gallery-nav-btn"
                            >
                                <ChevronLeftIcon />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={nextImage}
                                className="room-gallery-nav-btn"
                            >
                                <ChevronRightIcon />
                            </button>
                        </div>

                        {/* Image Counter Badge */}
                        <div className="room-gallery-counter">
                            {currentImageIndex + 1} / {roomImages.length}
                        </div>

                        {/* Dots Navigation */}
                        <div className="room-gallery-dots">
                            {roomImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`room-gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Room Content */}
                    <div className="room-showcase-content">
                        <h3 className="room-name">Nehir Manzaralı Bungalov</h3>
                        <p className="room-short-desc">{t('rooms.shortDescription')}</p>

                        {/* Room Features */}
                        <div className="room-quick-features">
                            <div className="quick-feature">
                                <GuestsIcon />
                                <span>{roomData.capacity} {t('rooms.guests')}</span>
                            </div>
                            <div className="quick-feature">
                                <SizeIcon />
                                <span>{roomData.size} m²</span>
                            </div>
                            <div className="quick-feature">
                                <BedroomIcon />
                                <span>2 {t('rooms.bedrooms')}</span>
                            </div>
                            <div className="quick-feature">
                                <BathroomIcon />
                                <span>1 {t('rooms.bathroom')}</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="room-footer">
                            <Link to="/rooms/bungalov" className="btn-check-availability">
                                <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>{t('rooms.checkAvailability')}</span>
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomShowcase
