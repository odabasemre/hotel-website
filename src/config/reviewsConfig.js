import testimonials from '../data/testimonials';

const reviewsConfig = {
    // Google Places API Key
    apiKey: "AIzaSyAtfWWECh_JsksaGJCgQPJiUCnZtExgOBk",

    // Google Place ID
    // You can find your Place ID here: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
    // Or leave empty if you want to search by name (less accurate)
    placeId: "ChIJCagPAQ0ZZkARwIbiDyDff2Y", // Default placeholder, please update with your actual Place ID

    // Caching settings
    cacheDurationDays: 30, // Update reviews once every 30 days

    // Display settings
    maxReviews: 10,
    minRating: 4, // Only show reviews with 4 or 5 stars
    maxTextLength: 200, // Limit message length for better UI fit

    // Fallback static reviews (shown if API fails or quota exceeded)
    fallbackReviews: testimonials
}

export default reviewsConfig;
