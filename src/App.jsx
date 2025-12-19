import { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'

// Loading component
const Loading = () => (
    <div className="loading">
        <div className="loading-spinner"></div>
    </div>
)

function App() {
    const { i18n } = useTranslation()

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
                    </Routes>
                </main>
                <Footer />
            </div>
        </Suspense>
    )
}

export default App
