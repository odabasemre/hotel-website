import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import RoomShowcase from '../components/home/RoomShowcase'
import About from '../components/home/About'
import Gallery from '../components/home/Gallery'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/contact/Contact'

function Home() {
    return (
        <>
            <Hero />
            <Services />
            <RoomShowcase />
            <About />
            <Gallery />
            <Testimonials />
            <Contact />
        </>
    )
}

export default Home
