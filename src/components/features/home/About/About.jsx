import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '@services'
import './About.css'

function About() {
    const { t } = useTranslation()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())
    const [siteTexts, setSiteTexts] = useState(adminSettings.getSiteTexts())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const property = await adminSettings.getPropertyDataAsync()
                const texts = await adminSettings.getSiteTextsAsync()
                setPropertyData(property)
                setSiteTexts(texts)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const aboutImage = propertyData.siteImages?.about?.image1 || "/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png"
    const aboutImageWithCache = aboutImage.startsWith('/uploads') ? `${aboutImage}?t=${Date.now()}` : aboutImage

    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-content">
                    {/* Images */}
                    <div className="about-images">
                        <div className="about-image">
                            <img
                                src={aboutImageWithCache}
                                alt="Ayder Kuzey Houses Houses"
                                key={aboutImageWithCache}
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="about-text">
                        <p className="section-subtitle">{siteTexts.about?.subtitle || t('about.subtitle')}</p>
                        <h2 className="section-title">{siteTexts.about?.title || t('about.storyTitle')}</h2>
                        <p className="about-description">{siteTexts.about?.description || t('about.description')}</p>

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

