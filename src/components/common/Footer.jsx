import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// Icons
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
)

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

function Footer() {
    const { t } = useTranslation()

    const quickLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/#rooms', label: t('nav.rooms') },
        { to: '/#about', label: t('nav.about') },
        { to: '/#gallery', label: t('nav.gallery') },
        { to: '/#contact', label: t('nav.contact') },
    ]

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        // Newsletter subscription logic would go here
        alert('Thank you for subscribing!')
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-text">Grand Palace Hotel</span>
                        </div>
                        <p className="footer-description">
                            {t('footer.description')}
                        </p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link" aria-label="Facebook">
                                <FacebookIcon />
                            </a>
                            <a href="#" className="footer-social-link" aria-label="Twitter">
                                <TwitterIcon />
                            </a>
                            <a href="#" className="footer-social-link" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-title">{t('footer.quickLinks')}</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-title">{t('footer.contactInfo')}</h4>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <MapPinIcon />
                            </div>
                            <p className="footer-contact-text">
                                123 Mountain View Road<br />
                                Alpine Valley, 34000
                            </p>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <PhoneIcon />
                            </div>
                            <p className="footer-contact-text">
                                +90 (212) 555 12 34
                            </p>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <MailIcon />
                            </div>
                            <p className="footer-contact-text">
                                info@grandpalace.com
                            </p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-column">
                        <h4 className="footer-title">{t('footer.newsletter')}</h4>
                        <p className="footer-newsletter-text">
                            {t('footer.newsletterText')}
                        </p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                className="newsletter-input"
                                placeholder={t('footer.emailPlaceholder')}
                                required
                            />
                            <button type="submit" className="newsletter-btn">
                                {t('footer.subscribe')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            {t('footer.copyright')}
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#" className="footer-bottom-link">Privacy Policy</a>
                            <a href="#" className="footer-bottom-link">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
