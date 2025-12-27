import { useTranslation } from 'react-i18next'
import { adminSettings } from '@services'
import './RoomShowcase.css'

// Feature Icons
const SizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
    </svg>
)

const BedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
    </svg>
)

const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
    </svg>
)

const BathroomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="7" y1="19" x2="7" y2="21" />
        <line x1="17" y1="19" x2="17" y2="21" />
    </svg>
)

const MinibarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
    </svg>
)

const AcIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10" />
        <path d="M18.4 6.6 12 12" />
        <path d="m5.6 6.6 6.4 5.4" />
        <path d="M12 12v10" />
        <path d="m5.6 17.4 6.4-5.4" />
        <path d="M18.4 17.4 12 12" />
    </svg>
)

function RoomShowcase() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

    const features = [
        { key: 'size', icon: <SizeIcon /> },
        { key: 'bed', icon: <BedIcon /> },
        { key: 'view', icon: <ViewIcon /> },
        { key: 'bathroom', icon: <BathroomIcon /> },
        { key: 'minibar', icon: <MinibarIcon /> },
        { key: 'ac', icon: <AcIcon /> },
    ]

    return (
        <section className="room-section" id="rooms">
            <div className="container">
                <div className="room-content">
                    {/* Room Image */}
                    <div className="room-image">
                        <img
                            src={propertyData.siteImages?.room?.main || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                            alt="Luxury hotel room"
                        />
                        <span className="room-image-badge">Exclusive</span>
                    </div>

                    {/* Room Info */}
                    <div className="room-info">
                        <p className="section-subtitle">{t('room.subtitle')}</p>
                        <h2 className="section-title">{t('room.title')}</h2>
                        <p className="room-description">{t('room.description')}</p>

                        {/* Features */}
                        <div className="room-features">
                            {features.map((feature) => (
                                <div className="feature-item" key={feature.key}>
                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>
                                    <span className="feature-text">
                                        {t(`room.features.${feature.key}`)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Price and CTA */}
                        <div className="room-price">
                            <span className="price-label">{t('room.price')}</span>
                            <a href="#booking" className="btn btn-primary room-cta">
                                {t('room.bookRoom')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomShowcase
