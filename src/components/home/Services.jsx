import { useTranslation } from 'react-i18next'
import { adminSettings } from '../../services/adminSettings'

// Service Icons
const SpaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
    </svg>
)

const RestaurantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
)

const PoolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M2 17c.96-.31 2.04-.31 3 0 1.92.62 3.08.62 5 0 .96-.31 2.04-.31 3 0 1.92.62 3.08.62 5 0 .96-.31 2.04-.31 3 0" />
        <path d="M9 12V6" />
        <path d="M15 12V6" />
        <circle cx="9" cy="4" r="2" />
        <circle cx="15" cy="4" r="2" />
    </svg>
)

const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
)

const ParkingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
)

const ConciergeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="m8 10 4-6 4 6" />
        <path d="M8 10v8a4 4 0 0 0 8 0v-8" />
        <path d="M2 14h20" />
    </svg>
)

function Services() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

    const services = [
        { key: 'spa', icon: <SpaIcon /> },
        { key: 'restaurant', icon: <RestaurantIcon /> },
        { key: 'pool', icon: <PoolIcon /> },
        { key: 'wifi', icon: <WifiIcon /> },
        { key: 'parking', icon: <ParkingIcon /> },
        { key: 'concierge', icon: <ConciergeIcon /> },
    ]

    // Get images from admin settings or use defaults
    const servicesImage1 = propertyData.siteImages?.services?.image1 || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    const servicesImage2 = propertyData.siteImages?.services?.image2 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

    return (
        <section className="services section">
            <div className="container">
                {/* Top Content - Image + Text + Image */}
                <div className="services-content">
                    <div className="services-image">
                        <img
                            src={servicesImage1}
                            alt="Hotel pool view"
                        />
                    </div>

                    <div className="services-text">
                        <h2>{t('services.title')}</h2>
                        <h3>{t('services.subtitle')}</h3>
                        <p>{propertyData.description || t('services.description')}</p>
                    </div>

                    <div className="services-image">
                        <img
                            src={servicesImage2}
                            alt="Hotel room"
                        />
                    </div>
                </div>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service) => (
                        <div className="service-card" key={service.key}>
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h4>{t(`services.${service.key}.title`)}</h4>
                            <p>{t(`services.${service.key}.description`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
