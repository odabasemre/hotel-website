import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import roomData from '../data/roomsData'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/rooms-page.css'

// Icons
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const ExpandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
)

const BedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4v16" />
        <path d="M22 4v16" />
        <path d="M2 8h20" />
        <path d="M2 16h20" />
        <path d="M6 8v8" />
        <path d="M18 8v8" />
    </svg>
)

const BathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
        <path d="M6 12V5a2 2 0 0 1 2-2h3" />
    </svg>
)

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
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

function RoomsPage() {
    const { t } = useTranslation()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Oda fotoğrafları - admin settings'den veya varsayılan
    const propertyData = adminSettings.getPropertyData()
    
    // Get room images from rooms section in siteImages
    const getRoomSlideImages = () => {
        const rooms = propertyData.siteImages?.rooms || {}
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

    const featuresList = [
        { key: 'riverView', icon: '🏞️' },
        { key: 'privateBalcony', icon: '🌿' },
        { key: 'kitchen', icon: '🍳' },
        { key: 'heating', icon: '🔥' },
        { key: 'wifi', icon: '📶' },
        { key: 'tv', icon: '📺' },
        { key: 'hairDryer', icon: '💨' },
        { key: 'towels', icon: '🛁' },
        { key: 'parking', icon: '🚗' },
    ]

    return (
        <div className="rooms-page">
            {/* Hero Section Removed */}
            <div className="page-spacer"></div>

            <div className="container">
                <div className="rooms-page-layout">
                    {/* Main Content */}
                    <div className="rooms-page-main">
                        {/* Room Image Gallery Carousel */}
                        <section className="room-gallery-section" style={{
                            marginBottom: '40px',
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                            background: '#f8fafc'
                        }}>
                            <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                                {/* Main Image */}
                                <img 
                                    src={roomImages[currentImageIndex]} 
                                    alt={`Oda ${currentImageIndex + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'opacity 0.5s ease'
                                    }}
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    }}
                                />
                                
                                {/* Navigation Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0 20px',
                                    background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)'
                                }}>
                                    {/* Previous Button */}
                                    <button
                                        onClick={prevImage}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = 'rgba(255, 255, 255, 1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                                        }}
                                    >
                                        <ChevronLeftIcon />
                                    </button>

                                    {/* Next Button */}
                                    <button
                                        onClick={nextImage}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = 'rgba(255, 255, 255, 1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                                        }}
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                </div>

                                {/* Image Counter Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(26, 54, 45, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    color: 'white',
                                    padding: '10px 16px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}>
                                    {currentImageIndex + 1} / {roomImages.length}
                                </div>

                                {/* Thumbnail Navigation */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    gap: '10px',
                                    padding: '12px 16px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                                }}>
                                    {roomImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToImage(index)}
                                            style={{
                                                width: currentImageIndex === index ? '32px' : '10px',
                                                height: '10px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                background: currentImageIndex === index 
                                                    ? 'linear-gradient(135deg, #1a362d 0%, #2d5a4a 100%)'
                                                    : '#cbd5e1',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: currentImageIndex === index ? '0 2px 8px rgba(26, 54, 45, 0.3)' : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (currentImageIndex !== index) {
                                                    e.target.style.background = '#94a3b8';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (currentImageIndex !== index) {
                                                    e.target.style.background = '#cbd5e1';
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Room Description */}
                        <section className="room-description-section">
                            <h2 className="room-name">{t('rooms.roomName')}</h2>
                            <p className="room-full-description">{t('rooms.fullDescription')}</p>
                        </section>

                        {/* Quick Stats */}
                        <section className="room-stats-section">
                            <div className="room-stats-grid">
                                <div className="stat-item">
                                    <UsersIcon />
                                    <div className="stat-text">
                                        <span className="stat-value">{roomData.capacity}</span>
                                        <span className="stat-label">{t('rooms.guests')}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <ExpandIcon />
                                    <div className="stat-text">
                                        <span className="stat-value">{roomData.size} m²</span>
                                        <span className="stat-label">{t('rooms.area')}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <BedIcon />
                                    <div className="stat-text">
                                        <span className="stat-value">{roomData.bedrooms}</span>
                                        <span className="stat-label">{t('rooms.bedrooms')}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <BathIcon />
                                    <div className="stat-text">
                                        <span className="stat-value">{roomData.bathrooms}</span>
                                        <span className="stat-label">{t('rooms.bathrooms')}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Features */}
                        <section className="room-features-section">
                            <h3>{t('rooms.amenities')}</h3>
                            <div className="features-grid">
                                {featuresList.map((feature) => (
                                    <div className="feature-item" key={feature.key}>
                                        <span className="feature-icon">{feature.icon}</span>
                                        <span className="feature-text">{t(`rooms.features.${feature.key}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div className="rooms-page-sidebar">
                        <div className="booking-card premium">
                            <div className="card-header">
                                <h3>{t('rooms.bookNow')}</h3>
                            </div>
                            <p className="booking-desc">{t('rooms.bookingInfoText') || 'Rezervasyon işlemlerinizi takvim üzerinden tarih seçerek güvenle tamamlayabilirsiniz.'}</p>

                            <Link to="/rooms/bungalov" className="primary-booking-btn">
                                <CalendarIcon /> {t('rooms.checkAvailability')}
                            </Link>

                            <div className="card-benefits">
                                <div className="benefit-item">✓ En İyi Fiyat Garantisi</div>
                                <div className="benefit-item">✓ Anında Onay</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomsPage
