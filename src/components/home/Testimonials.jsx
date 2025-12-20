import { useTranslation } from 'react-i18next'

import useGoogleReviews from '../../hooks/useGoogleReviews'

// Star icon for ratings
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

// Quote icon
const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
)

function Testimonials() {
    const { t } = useTranslation()
    const { reviews, loading } = useGoogleReviews()

    // If loading, we could show a spinner, but since we have fallback data in the hook/config
    // we can just wait or show a skeleton. For now, let's just render what we have.
    // If reviews is empty (very first load before API returns), we might want to wait.
    if (loading && reviews.length === 0) {
        return (
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <p className="section-subtitle">{t('testimonials.subtitle')}</p>
                        <h2 className="section-title">{t('testimonials.title')}</h2>
                    </div>
                    <div className="testimonials-wrapper">
                        <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
                            Loading reviews...
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">{t('testimonials.subtitle')}</p>
                    <h2 className="section-title">{t('testimonials.title')}</h2>
                </div>

                <div className="testimonials-wrapper">
                    <div className="testimonials-scroll">
                        {/* First set of reviews */}
                        {reviews.map((review) => (
                            <div className="testimonial-card" key={`first-${review.id}`}>
                                <div className="testimonial-quote">
                                    <QuoteIcon />
                                </div>
                                <p className="testimonial-text">{review.text}</p>
                                <div className="testimonial-author">
                                    <h4>{review.author}</h4>
                                    <p>{review.location}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate set for seamless infinite scroll */}
                        {reviews.map((review) => (
                            <div className="testimonial-card" key={`second-${review.id}`}>
                                <div className="testimonial-quote">
                                    <QuoteIcon />
                                </div>
                                <p className="testimonial-text">{review.text}</p>
                                <div className="testimonial-author">
                                    <h4>{review.author}</h4>
                                    <p>{review.location}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
