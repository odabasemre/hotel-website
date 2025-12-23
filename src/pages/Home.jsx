import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import RoomShowcase from '../components/home/RoomShowcase'
import About from '../components/home/About'
import Gallery from '../components/home/Gallery'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/contact/Contact'

import { useScrollReveal } from '../hooks/useScrollReveal'

function Home() {
    useScrollReveal()
    return (
        <>
            <Hero />
            <div className="reveal"><Services /></div>
            <div className="reveal"><RoomShowcase /></div>
            <div className="reveal"><About /></div>
            <div className="reveal"><Gallery /></div>
            <div className="reveal"><Testimonials /></div>
            <div className="reveal"><Contact /></div>
        </>
    )
}

export default Home
