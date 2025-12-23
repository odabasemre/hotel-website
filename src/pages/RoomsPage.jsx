import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import roomData from '../data/roomsData'
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

function RoomsPage() {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
                                <span className="price-tag">{t('rooms.priceFrom')} <strong>5.000 TL</strong></span>
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
