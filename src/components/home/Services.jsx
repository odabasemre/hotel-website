import { useTranslation } from 'react-i18next'
import { adminSettings } from '../../services/adminSettings'

function Services() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

    // Odalar sayfasındaki ile aynı özellikler listesi (emojili)
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
        <section className="services section">
            <div className="container">
                {/* Section Header */}
                <div className="services-header">
                    <h2>
                        {t('rooms.amenities')}
                    </h2>
                </div>

                {/* Features Grid - Same as RoomsPage */}
                <div className="features-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    background: '#faf9f7',
                    padding: '40px',
                    borderRadius: '20px'
                }}>
                    {featuresList.map((feature) => (
                        <div className="feature-item" key={feature.key} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '20px 24px',
                            background: 'white',
                            borderRadius: '12px',
                            border: '1px solid #e8e6e3',
                            transition: 'all 0.3s ease'
                        }}>
                            <span className="feature-icon" style={{ fontSize: '28px' }}>{feature.icon}</span>
                            <span className="feature-text" style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1a362d',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>{t(`rooms.features.${feature.key}`)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
