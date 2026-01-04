import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { adminSettings } from '@services'
import roomData from '../../../../data/roomsData'
import './RoomShowcase.css'

// Icons
const GuestsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const SizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

function RoomShowcase() {
    const { t } = useTranslation()
    const [propertyData, setPropertyData] = useState(adminSettings.getPropertyData())

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await adminSettings.getPropertyDataAsync()
                setPropertyData(data)
            } catch (error) {
                console.error('Error loading property data:', error)
            }
        }
        loadData()
    }, [])

    // Get room images from admin settings or defaults
    const rooms = propertyData?.siteImages?.rooms || {}
    const roomImages = Object.keys(rooms)
        .filter(key => key.startsWith('slide') && rooms[key])
        .sort((a, b) => {
            const numA = parseInt(a.replace('slide', ''))
            const numB = parseInt(b.replace('slide', ''))
            return numA - numB
        })
        .map(key => rooms[key])

    const mainImage = roomImages[0] || '/images/rooms/room1.jpg'

    return (
        <section className="room-showcase-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header-center">
                    <h2 className="section-title-large">{t('rooms.title')}</h2>
                    <p className="section-subtitle-large">{t('rooms.subtitle')}</p>
                </div>

                {/* Room Card */}
                <div className="room-showcase-card">
                    {/* Room Image */}
                    <div className="room-showcase-image">
                        <img src={mainImage} alt={t('rooms.roomName')} />
                        <div className="room-image-overlay">
                            <span className="room-badge">PREMIUM</span>
                        </div>
                    </div>

                    {/* Room Content */}
                    <div className="room-showcase-content">
                        <h3 className="room-name">{t('rooms.roomName')}</h3>
                        <p className="room-short-desc">{t('rooms.shortDescription')}</p>

                        {/* Room Features */}
                        <div className="room-quick-features">
                            <div className="quick-feature">
                                <GuestsIcon />
                                <span>{roomData.capacity} {t('rooms.guests')}</span>
                            </div>
                            <div className="quick-feature">
                                <SizeIcon />
                                <span>{roomData.size} m²</span>
                            </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="room-footer">
                            <div className="room-price-info">
                                <span className="price-from">{t('rooms.priceFrom')}</span>
                                <span className="price-amount">{roomData.price} {roomData.currency}</span>
                                <span className="price-per-night">/ {t('booking.checkInPlaceholder')}</span>
                            </div>
                            <Link to="/rooms/bungalov" className="btn-view-room">
                                <span>{t('rooms.viewDetails')}</span>
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomShowcase
