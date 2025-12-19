import { useTranslation } from 'react-i18next'

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

    const testimonials = [
        {
            id: 1,
            text: "An absolutely wonderful experience! The staff was incredibly attentive, and the room exceeded all our expectations. We will definitely be returning.",
            author: "Sarah Johnson",
            location: "New York, USA",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            text: "The perfect getaway destination. Breathtaking views, luxurious amenities, and the most comfortable bed I've ever slept in. Highly recommended!",
            author: "Michael Chen",
            location: "London, UK",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            text: "From the moment we arrived, we felt like royalty. The attention to detail is impeccable, and the spa treatments were divine. A truly memorable stay.",
            author: "Emma Wilson",
            location: "Paris, France",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        }
    ]

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">{t('testimonials.subtitle')}</p>
                    <h2 className="section-title">{t('testimonials.title')}</h2>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div className="testimonial-card" key={testimonial.id}>
                            <div className="testimonial-quote">
                                <QuoteIcon />
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="testimonial-avatar"
                                />
                                <div className="testimonial-info">
                                    <h4>{testimonial.author}</h4>
                                    <p>{testimonial.location}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
