import { useTranslation } from 'react-i18next'
import { adminSettings } from '../../services/adminSettings'
import { getAllActiveServices, getFeaturedServices, getServicesByCategory, serviceCategories } from '../../data/servicesData'

function Services() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

    // Aktif servisleri al (disabled olmayan)
    const amenities = getAllActiveServices()

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

                {/* Kategorili görünüm için alternatif layout (opsiyonel) */}
                {/* Eğer kategorili gösterim istersen bunu aktif et, üstteki grid'i kapat */}
                {/* 
                <div className="services-categories">
                    {Object.entries(serviceCategories).map(([categoryKey, category]) => {
                        const categoryServices = getServicesByCategory(categoryKey)
                        if (categoryServices.length === 0) return null
                        
                        return (
                            <div key={categoryKey} className="service-category">
                                <h3 style={{ color: category.color }}>{category.title}</h3>
                                <div className="category-services">
                                    {categoryServices.map((service) => (
                                        <div className="amenity-card small" key={service.key}>
                                            <div className="amenity-icon">
                                                {service.icon}
                                            </div>
                                            <div className="amenity-content">
                                                <h4>{t(`services.${service.key}.title`)}</h4>
                                                <p>{t(`services.${service.key}.description`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
                */}
            </div>
        </section>
    )
}

export default Services
