import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import activitiesData from '../data/activitiesData'
import '../styles/pages/activities-page.css'

// Icons
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

function ActivitiesPage() {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="activities-page">
            {/* Hero Section */}
            <div className="activities-hero">
                <div className="activities-hero-overlay"></div>
                <div className="activities-hero-content">
                    <h1>{t('activities.heroTitle')}</h1>
                    <p>{t('activities.heroSubtitle')}</p>
                </div>
            </div>

            {/* Activities Grid */}
            <div className="container">
                <div className="activities-intro">
                    <h2>{t('activities.introTitle')}</h2>
                    <p>{t('activities.introDescription')}</p>
                </div>

                <div className="activities-grid">
                    {activitiesData.map((activity) => (
                        <Link 
                            to={`/activities/${activity.id}`} 
                            key={activity.id} 
                            className="activity-card"
                        >
                            {/* Image */}
                            <div className="activity-card-image">
                                <img src={activity.image} alt={activity.name} />
                                <div className="activity-card-badge">
                                    <MapPinIcon />
                                    <span>{activity.distance} km</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="activity-card-content">
                                <h3>{activity.name}</h3>
                                <p>{activity.shortDescription}</p>
                                
                                {/* Footer */}
                                <div className="activity-card-footer">
                                    <span className="activity-duration">{activity.duration}</span>
                                    <div className="activity-link-arrow">
                                        <span>{t('activities.learnMore')}</span>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <div className="activities-info">
                    <div className="info-card">
                        <span className="info-icon">🗺️</span>
                        <h3>{t('activities.infoCard1Title')}</h3>
                        <p>{t('activities.infoCard1Text')}</p>
                    </div>
                    <div className="info-card">
                        <span className="info-icon">🚗</span>
                        <h3>{t('activities.infoCard2Title')}</h3>
                        <p>{t('activities.infoCard2Text')}</p>
                    </div>
                    <div className="info-card">
                        <span className="info-icon">ℹ️</span>
                        <h3>{t('activities.infoCard3Title')}</h3>
                        <p>{t('activities.infoCard3Text')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesPage
