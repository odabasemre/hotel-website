# 🏔️ Ayder Kuzey Houses - Hotel Booking Website

A modern, responsive hotel booking website built with React and Vite.

## 📁 Project Structure

```
src/
├── assets/                    # Static assets (images, icons, fonts)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                # Reusable UI components
│   ├── layout/                # Page layout components
│   │   ├── Header/            # Site header with navigation
│   │   └── Footer/            # Site footer
│   │
│   ├── ui/                    # Generic UI components
│   │   └── PhoneInput/        # Custom phone input with country codes
│   │
│   └── features/              # Feature-specific components
│       ├── home/              # Homepage components
│       │   ├── Hero/          # Hero section with booking form
│       │   ├── About/         # About section
│       │   ├── Services/      # Services showcase
│       │   ├── RoomShowcase/  # Room features display
│       │   └── Testimonials/  # Customer reviews slider
│       ├── admin/             # Admin panel components
│       ├── booking/           # Booking flow components
│       └── gallery/           # Photo gallery components
│
├── pages/                     # Route-level page components
│   ├── Home.jsx
│   ├── AdminPage.jsx
│   ├── RoomDetailPage.jsx
│   ├── RoomsPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── GalleryPage.jsx
│   └── CheckoutPage.jsx
│
├── hooks/                     # Custom React hooks
│   ├── useAvailability.js     # Calendar availability checker
│   ├── useCustomAvailability.js
│   ├── useGoogleReviews.js    # Google reviews integration
│   ├── usePlaceDetails.js     # Google Places data
│   └── useScrollReveal.js     # Scroll animations
│
├── services/                  # External services & APIs
│   └── adminSettings.js       # Admin panel data management
│
├── store/                     # State management
│   └── context/               # React Context providers
│
├── utils/                     # Utility functions
│   ├── formatters.js          # Date, price, phone formatting
│   ├── validators.js          # Form validation functions
│   └── constants.js           # App-wide constants
│
├── config/                    # App configuration
│   ├── images.js              # Image paths
│   └── reviewsConfig.js       # Reviews API config
│
├── data/                      # Static data files
│   ├── galleryData.js
│   ├── roomsData.js
│   └── testimonials.js
│
├── styles/                    # Global styles
│   ├── base/                  # Reset, typography, variables
│   ├── themes/                # Light/dark themes
│   ├── components/            # Component-specific styles
│   ├── pages/                 # Page-specific styles
│   └── index.css              # Main stylesheet
│
├── i18n/                      # Internationalization
│   └── index.js               # i18next configuration
│
├── App.jsx                    # Root component
└── main.jsx                   # Entry point
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **i18next** - Internationalization (TR, EN, AR, FR)
- **CSS3** - Modern styling with CSS variables

## 📦 Path Aliases

The project uses path aliases for cleaner imports:

```javascript
import { Header, Footer } from '@components/layout'
import { useAvailability } from '@hooks'
import { adminSettings } from '@services'
import { formatDate } from '@utils'
```

Available aliases:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@hooks/` → `src/hooks/`
- `@services/` → `src/services/`
- `@utils/` → `src/utils/`
- `@config/` → `src/config/`
- `@data/` → `src/data/`
- `@styles/` → `src/styles/`
- `@assets/` → `src/assets/`

## 🎨 Design System

CSS variables are defined in `src/styles/base/variables.css`:

```css
--color-primary: #2d4a3e;
--color-secondary: #d4af37;
--font-primary: 'Outfit', sans-serif;
--font-heading: 'Cormorant Garamond', serif;
```

## 🌐 Internationalization

Supports 4 languages:
- 🇹🇷 Turkish (default)
- 🇺🇸 English
- 🇸🇦 Arabic (RTL)
- 🇫🇷 French

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

## 👨‍💼 Admin Panel

Access at `/admin` with password authentication.

Features:
- 📅 Pricing & availability calendar
- 📊 Booking management
- 🏷️ Promo code management
- ⚙️ Property settings

---

Built with ❤️ for Ayder Kuzey Houses
