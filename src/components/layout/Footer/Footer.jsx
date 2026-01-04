import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import usePlaceDetails from '../../../hooks/usePlaceDetails'
import './Footer.css'

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

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.628 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
)

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)

function Footer() {
    const { t } = useTranslation()
    const { address, phone, email, loading } = usePlaceDetails()

    const quickLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/#rooms', label: t('nav.rooms') },
        { to: '/#about', label: t('nav.about') },
        { to: '/gallery', label: t('nav.gallery') },
        { to: '/contact', label: t('nav.contact') },
    ]

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-text">Ayder Kuzey Houses</span>
                        </div>
                        <p className="footer-description">
                            {t('footer.description')}
                        </p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/ayderkuzey/" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="https://wa.me/905304289355" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <WhatsAppIcon />
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
                                {loading ? t('common.loading') : address}
                            </p>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <PhoneIcon />
                            </div>
                            <p className="footer-contact-text">
                                {loading ? t('common.loading') : phone}
                            </p>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <MailIcon />
                            </div>
                            <p className="footer-contact-text">
                                {email}
                            </p>
                        </div>
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

