import { Hero, Services, Testimonials } from '@components/features/home'
import { useScrollReveal } from '@hooks'

function Home() {
    useScrollReveal()
    return (
        <>
            <Hero />
            <div className="reveal"><Services /></div>
            <div className="reveal"><Testimonials /></div>
        </>
    )
}

export default Home
