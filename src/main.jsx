import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n'
import './styles/index.css'
import './styles/components/header.css'
import './styles/components/hero.css'
import './styles/components/services.css'
import './styles/components/room.css'
import './styles/components/about.css'
import './styles/components/gallery.css'
import './styles/components/footer.css'
import './styles/components/contact.css'
import './styles/components/testimonials.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
