import { useTranslation } from 'react-i18next'
import { adminSettings } from '../../services/adminSettings'

// Modern Amenity Icons
const RiverViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
        <path d="M2 17c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
        <path d="M2 7c2-2 4-3 6-3s4 1 6 3 4 3 6 3" />
    </svg>
)

const BalconyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18" />
        <path d="M8 12v9" />
        <path d="M16 12v9" />
        <path d="M12 3v9" />
    </svg>
)

const KitchenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
)

const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
)

const TvIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 18v3" />
    </svg>
)

const HairdryerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h4" />
        <circle cx="12" cy="10" r="5" />
        <path d="M17 10h4" />
        <path d="M12 15v6" />
        <path d="M9 21h6" />
    </svg>
)

const TowelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
        <path d="M4 10h16v10H4z" />
        <path d="M8 10v10" />
        <path d="M16 10v10" />
    </svg>
)

const ParkingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
)

const BarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8" />
        <path d="M12 11v11" />
        <path d="m19 3-7 8-7-8h14z" />
    </svg>
)

const ReceptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
)

const InsulationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
)

const FireplaceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
    </svg>
)

function Services() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

    const amenities = [
        { key: 'riverView', icon: <RiverViewIcon /> },
        { key: 'balcony', icon: <BalconyIcon /> },
        { key: 'kitchen', icon: <KitchenIcon /> },
        { key: 'fireplace', icon: <FireplaceIcon /> },
        { key: 'wifi', icon: <WifiIcon /> },
        { key: 'tv', icon: <TvIcon /> },
        { key: 'hairdryer', icon: <HairdryerIcon /> },
        { key: 'towels', icon: <TowelIcon /> },
        { key: 'parking', icon: <ParkingIcon /> },
        { key: 'bar', icon: <BarIcon /> },
        { key: 'reception', icon: <ReceptionIcon /> },
        { key: 'insulation', icon: <InsulationIcon /> },
    ]

    // Get images from admin settings or use defaults
    const servicesImage1 = propertyData.siteImages?.services?.image1 || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    const servicesImage2 = propertyData.siteImages?.services?.image2 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

    return (
        <section className="services section">
            <div className="container">
                {/* Section Header */}
                <div className="services-header">
                    <h2>
                        {t('services.title')}
                    </h2>
                    <p className="services-subtitle">
                        {t('services.subtitle')}
                    </p>
                </div>

                {/* Modern Amenities Grid */}
                <div className="amenities-grid">
                    {amenities.map((amenity) => (
                        <div className="amenity-card" key={amenity.key}>
                            <div className="amenity-icon">
                                {amenity.icon}
                            </div>
                            <div className="amenity-content">
                                <h4>{t(`services.${amenity.key}.title`)}</h4>
                                <p>{t(`services.${amenity.key}.description`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
