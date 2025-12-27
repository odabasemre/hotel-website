import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '../../services/adminSettings'

function About() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()

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
                        <p className="section-subtitle">{t('about.subtitle')}</p>
                        <h2 className="section-title">{t('about.storyTitle')}</h2>
                        <p className="about-description">{t('about.description')}</p>

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
