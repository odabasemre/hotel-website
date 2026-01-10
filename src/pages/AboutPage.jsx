import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '../services/adminSettings'
import '../styles/pages/about-page.css'

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
                <section className="about-page-story about-page-story-centered">
                    <div className="about-page-story-content">
                        <h2 className="about-page-section-title text-center">{t('about.storyTitle')}</h2>
                        <p className="about-page-text">{t('about.description')}</p>
                        <p className="about-page-text">{t('about.mission')}</p>
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

            </div>
        </div>
    )
}

export default AboutPage
