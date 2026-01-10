import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import activitiesData from '../data/activitiesData'
import { adminSettings } from '../services/adminSettings'
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
    const [activityImages, setActivityImages] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0)
        // Load activity images from admin settings
        const propertyData = adminSettings.getPropertyData()
        if (propertyData?.siteImages?.activities) {
            setActivityImages(propertyData.siteImages.activities)
        }
    }, [])

    // Get activity image - prefer admin uploaded image, fallback to default
    const getActivityImage = (activity) => {
        const adminImage = activityImages[activity.id]
        return adminImage || activity.image
    }

    return (
        <div className="activities-page">
            {/* Page Spacer for header */}
            <div className="page-spacer"></div>

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
                                <img src={getActivityImage(activity)} alt={activity.name} />
                                <div className="activity-card-badge">
                                    <MapPinIcon />
                                    <span>{activity.distance} km</span>
                                </div>
                                <div className="activity-card-duration-badge">
                                    <span>{activity.duration}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="activity-card-content">
                                <h3>{activity.name}</h3>
                                <p>{activity.shortDescription}</p>
                                
                                {/* Footer */}
                                <div className="activity-card-footer">
                                    <div className="activity-link-arrow">
                                        <span>{t('activities.learnMore')}</span>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ActivitiesPage
