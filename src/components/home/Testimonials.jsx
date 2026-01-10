import { useState, useEffect } from 'react'
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

    if (loading && reviews.length === 0) return null

    // Duplicate reviews multiple times to ensure seamless loop even on wide screens
    // 6x duplication ensures we have plenty of content
    const displayReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews]

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container-fluid">
                <div className="section-header">
                    <h2 className="section-title">{t('testimonials.subtitle')}</h2>
                    <p className="section-subtitle">{t('testimonials.title')}</p>
                </div>

                <div className="testimonials-slider">
                    <div className="testimonial-track">
                        {displayReviews.map((review, index) => (
                            <div className="testimonial-card" key={`${review.id}-${index}`}>
                                <div className="testimonial-header">
                                    <div className="testimonial-quote-icon">
                                        <QuoteIcon />
                                    </div>
                                    <div className="testimonial-rating">
                                        {[...Array(review.rating || 5)].map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>
                                <p className="testimonial-text">"{review.text}"</p>
                                <div className="testimonial-author-info">
                                    <h4 className="author-name">{review.author}</h4>
                                    {review.location && <span className="author-location">{review.location}</span>}
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
