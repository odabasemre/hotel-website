import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '../../services/adminSettings'

function About() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()
    const siteTexts = adminSettings.getSiteTexts()

    // Helper function to get text styles
    const getTextStyle = (section, field) => {
        const styles = siteTexts[section]?.[`${field}Style`] || {}
        return {
            fontSize: styles.fontSize ? `${styles.fontSize}px` : undefined,
            fontWeight: styles.fontWeight || undefined,
            fontStyle: styles.fontStyle || undefined,
            textAlign: styles.textAlign || undefined,
            fontFamily: styles.fontFamily || undefined
        }
    }

    // Get about image from admin settings or use default
    const aboutImage = propertyData.siteImages?.about?.image1 || '/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png'

    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-content">
                    {/* Images */}
                    <div className="about-images">
                        <div className="about-image">
                            <img
                                src={aboutImage}
                                alt="Ayder Kuzey Houses Houses"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="about-text">
                        <p className="section-subtitle" style={getTextStyle('about', 'subtitle')}>
                            {siteTexts.about?.subtitle || t('about.subtitle')}
                        </p>
                        <h2 className="section-title" style={getTextStyle('about', 'title')}>
                            {siteTexts.about?.title || t('about.storyTitle')}
                        </h2>
                        <p className="about-description" style={getTextStyle('about', 'description')}>
                            {siteTexts.about?.description || t('about.description')}
                        </p>

                        {/* CTA Button */}
                        <Link to="/about" className="about-cta-btn">
                            {t('about.ctaButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
