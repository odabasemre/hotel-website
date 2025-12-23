import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import RoomShowcase from '../components/home/RoomShowcase'
import Testimonials from '../components/home/Testimonials'

import { useScrollReveal } from '../hooks/useScrollReveal'

function Home() {
    useScrollReveal()
    return (
        <>
            <Hero />
            <div className="reveal"><Services /></div>
            <div className="reveal"><RoomShowcase /></div>
            <div className="reveal"><Testimonials /></div>
        </>
    )
}

export default Home
