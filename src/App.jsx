import { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Layout Components
import { Header, Footer } from '@components/layout'

// Pages
import Home from '@pages/Home'
import GalleryPage from '@pages/GalleryPage'
import ContactPage from '@pages/ContactPage'
import AboutPage from '@pages/AboutPage'
import RoomsPage from '@pages/RoomsPage'
import RoomDetailPage from '@pages/RoomDetailPage'
import ActivitiesPage from '@pages/ActivitiesPage'
import ActivityDetailPage from '@pages/ActivityDetailPage'
import AdminPage from '@pages/AdminPage'
import CheckoutPage from '@pages/CheckoutPage'

// Loading component
const Loading = () => (
    <div className="loading">
        <div className="loading-spinner"></div>
    </div>
)

function App() {
    const { i18n } = useTranslation()
    const location = useLocation()

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    // Update document direction based on language
    useEffect(() => {
        const rtlLanguages = ['ar']
        const isRtl = rtlLanguages.includes(i18n.language)
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
        document.documentElement.lang = i18n.language
    }, [i18n.language])

    return (
        <Suspense fallback={<Loading />}>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/activities" element={<ActivitiesPage />} />
                        <Route path="/activities/:id" element={<ActivityDetailPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Suspense>
    )
}

export default App
