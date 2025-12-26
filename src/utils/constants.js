/**
 * Application-wide constants
 */

// API
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
export const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || '';

// Pricing
export const DEFAULT_PRICE = 12000;
export const MIN_NIGHTS = 2;
export const MAX_GUESTS = 6;
export const MAX_CHILDREN = 3;

// Booking
export const CHECK_IN_TIME = '14:00';
export const CHECK_OUT_TIME = '11:00';

// Date formatting
export const DATE_FORMAT_TR = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    ADMIN_AUTH: 'admin_authenticated',
    PRICING_DATA: 'admin_pricing_data',
    PRICING_CONFIG: 'admin_pricing_config',
    PROPERTY_DATA: 'admin_property_data',
    BOOKINGS: 'admin_bookings',
    PROMOTIONS: 'admin_promotions'
};

// Phone Country Codes
export const COUNTRY_CODES = [
    { code: 'TR', dialCode: '+90', name: 'Türkiye', flag: '🇹🇷' },
    { code: 'SA', dialCode: '+966', name: 'Suudi Arabistan', flag: '🇸🇦' },
    { code: 'AE', dialCode: '+971', name: 'BAE', flag: '🇦🇪' },
    { code: 'US', dialCode: '+1', name: 'USA', flag: '🇺🇸' },
    { code: 'GB', dialCode: '+44', name: 'UK', flag: '🇬🇧' },
    { code: 'DE', dialCode: '+49', name: 'Almanya', flag: '🇩🇪' },
];

// Social Media Links
export const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/ayderkuzey/',
    whatsapp: 'https://wa.me/905304289355'
};
