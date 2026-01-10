import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import activitiesData from '../data/activitiesData'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/activity-detail-page.css'

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
    </svg>
)

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
)

function ActivityDetailPage() {
    const { id } = useParams()
    const { t } = useTranslation()
    const activity = activitiesData.find(a => a.id === id)
    const [activityImage, setActivityImage] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        // Load activity image from admin settings only
        if (activity) {
            const propertyData = adminSettings.getPropertyData()
            const adminImage = propertyData?.siteImages?.activities?.[activity.id]
            
            // Use admin image if available, otherwise fallback to default
            setActivityImage(adminImage || activity.image)
        }
    }, [activity])

    if (!activity) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>{t('activities.notFound') || 'Aktivite bulunamadı'}</h2>
                <Link to="/activities" style={{ color: '#1a362d', marginTop: '20px', display: 'inline-block' }}>
                    {t('activities.backToActivities')}
                </Link>
            </div>
        )
    }

    return (
        <div className="activity-detail-page">
            {/* Hero Section with Single Image */}
            <div className="activity-detail-hero">
                <div 
                    className="activity-hero-image active"
                    style={{
                        backgroundImage: `url(${activityImage})`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                
                <div className="activity-detail-overlay"></div>

                <div className="activity-detail-hero-content">
                    <Link to="/activities" className="back-button">
                        <ChevronLeftIcon />
                        <span>{t('activities.backToActivities')}</span>
                    </Link>
                    <h1>{activity.name}</h1>
                    <div className="hero-meta">
                        <div className="hero-meta-item">
                            <MapPinIcon />
                            <span>{t('activities.fromHotel')} {activity.distance} km</span>
                        </div>
                        <div className="hero-meta-item">
                            <ClockIcon />
                            <span>{activity.duration}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="activity-detail-layout">
                    {/* Main Content */}
                    <div className="activity-detail-main">
                        {/* About Section */}
                        <section className="detail-section">
                            <h2>{t('about.storyTitle') || 'Hakkında'}</h2>
                            <p className="detail-description">{activity.details}</p>
                        </section>

                        {/* Activities Section */}
                        <section className="detail-section">
                            <h2>{t('activities.activitiesToDo')}</h2>
                            <div className="activities-list">
                                {activity.activities.map((act, index) => (
                                    <div key={index} className="activity-item">
                                        <div className="activity-item-icon">{act.icon}</div>
                                        <div className="activity-item-content">
                                            <h3>{act.name}</h3>
                                            <p>{act.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tips Section */}
                        <section className="detail-section tips-section">
                            <h2>💡 {t('activities.tips')}</h2>
                            <ul className="tips-list">
                                <li>Hafta içi ziyaretleriniz daha az kalabalık olacaktır</li>
                                <li>Rahat ayakkabı ve su şişesi ile gitmeniz önerilir</li>
                                <li>Fotoğraf çekmek için sabah saatleri idealdir</li>
                                <li>Yerel rehber eşliğinde gezmek deneyiminizi zenginleştirir</li>
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="activity-detail-sidebar">
                        {/* Quick Info Card */}
                        <div className="info-card-detail">
                            <h3>{t('activities.locationInfo')}</h3>
                            <div className="info-item">
                                <CalendarIcon />
                                <div>
                                    <strong>{t('activities.bestTime')}</strong>
                                    <span>{activity.season}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <ClockIcon />
                                <div>
                                    <strong>{t('activities.duration')}</strong>
                                    <span>{activity.duration}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <TrendingUpIcon />
                                <div>
                                    <strong>{t('activities.difficulty')}</strong>
                                    <span>{activity.difficulty}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <MapPinIcon />
                                <div>
                                    <strong>{t('activities.distance')}</strong>
                                    <span>{activity.distance} km</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="booking-reminder-card">
                            <h3>🏡 {t('nav.rooms')}</h3>
                            <p>{t('activities.introDescription')}</p>
                            <Link to="/rooms/bungalov" className="booking-button">
                                {t('activities.bookNow')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityDetailPage
