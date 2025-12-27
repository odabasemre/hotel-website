import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/about-page.css'

// Icons for features
const MountainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
    </svg>
)

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
)

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
)

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

function AboutPage() {
    const { t } = useTranslation()
    const propertyData = adminSettings.getPropertyData()
    
    // Get about image from admin settings or use default
    const aboutImage = propertyData.siteImages?.about?.image1 || '/images/hero/Gemini_Generated_Image_1e0ht31e0ht31e0h.png'

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const features = [
        { icon: <MountainIcon />, title: t('about.features.nature'), description: t('about.features.natureDesc') },
        { icon: <HeartIcon />, title: t('about.features.hospitality'), description: t('about.features.hospitalityDesc') },
        { icon: <HomeIcon />, title: t('about.features.comfort'), description: t('about.features.comfortDesc') },
        { icon: <UsersIcon />, title: t('about.features.family'), description: t('about.features.familyDesc') },
    ]

    const team = [
        { name: t('about.team.member1.name'), role: t('about.team.member1.role'), image: '/images/team/member1.jpg' },
        { name: t('about.team.member2.name'), role: t('about.team.member2.role'), image: '/images/team/member2.jpg' },
        { name: t('about.team.member3.name'), role: t('about.team.member3.role'), image: '/images/team/member3.jpg' },
        { name: t('about.team.member4.name'), role: t('about.team.member4.role'), image: '/images/team/member4.jpg' },
    ]

    return (
        <div className="about-page">
            {/* Hero Section Removed */}
            <div className="page-spacer"></div>

            <div className="container">
                {/* Story Section */}
                <section className="about-page-story">
                    <div className="about-page-story-content">
                        <h2 className="about-page-section-title">{t('about.storyTitle')}</h2>
                        <p className="about-page-text">{t('about.description')}</p>
                        <p className="about-page-text">{t('about.mission')}</p>
                    </div>
                    <div className="about-page-story-image">
                        <img
                            src={aboutImage}
                            alt="Ayder Kuzey Houses Houses"
                        />
                        <div className="about-page-badge">
                            <span className="badge-number">25+</span>
                            <span className="badge-text">{t('about.experience')}</span>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="about-page-features">
                    <h2 className="about-page-section-title text-center">{t('about.features.nature').split(' ')[0]}</h2>
                    <div className="about-page-features-grid">
                        {features.map((feature, index) => (
                            <div className="about-page-feature-card" key={index}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="about-page-team">
                    <div className="about-page-team-header">
                        <span className="about-page-team-subtitle">{t('about.teamSubtitle')}</span>
                        <h2 className="about-page-section-title">{t('about.teamTitle')}</h2>
                        <p className="about-page-team-description">{t('about.teamDescription')}</p>
                    </div>
                    <div className="about-page-team-grid">
                        {team.map((member, index) => (
                            <div className="about-page-team-card" key={index}>
                                <div className="team-image-container">
                                    <div className="team-image-placeholder">
                                        <UserIcon />
                                        <span>{t('about.addPhoto')}</span>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h4 className="team-name">{member.name}</h4>
                                    <p className="team-role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-page-cta">
                    <div className="about-page-cta-content">
                        <h3>{t('about.ctaTitle')}</h3>
                        <p>{t('about.ctaDescription')}</p>
                    </div>
                    <Link to="/contact" className="about-page-cta-button">{t('about.ctaButton')}</Link>
                </section>
            </div>
        </div>
    )
}

export default AboutPage
