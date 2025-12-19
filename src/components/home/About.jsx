import { useTranslation } from 'react-i18next'

function About() {
    const { t } = useTranslation()

    const stats = [
        { number: '25+', label: t('about.experience') },
        { number: '10K+', label: t('about.guests') },
        { number: '15', label: t('about.awards') },
        { number: '50+', label: t('about.staff') },
    ]

    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-content">
                    {/* Images */}
                    <div className="about-images">
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Hotel exterior"
                            />
                        </div>
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                alt="Hotel lobby"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="about-text">
                        <p className="section-subtitle">{t('about.subtitle')}</p>
                        <h2 className="section-title">{t('about.title')}</h2>
                        <p className="about-description">{t('about.description')}</p>

                        {/* Stats */}
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div className="stat-item" key={index}>
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
