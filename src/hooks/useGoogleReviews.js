import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsConfig from '../config/reviewsConfig';

// Helper function to capitalize first letter of each word
const capitalizeWords = (str) => {
    if (!str) return str;
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
};

const useGoogleReviews = () => {
    const { i18n } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get fallback reviews for current language, consolidating all available reviews
    const getFallbackForLanguage = (lang) => {
        const baseLang = lang.split('-')[0];
        const fallbackObj = reviewsConfig.fallbackReviews || {};

        // 1. Get all unique review IDs from all languages
        const allIds = new Set();
        Object.values(fallbackObj).forEach(langReviews => {
            langReviews.forEach(review => allIds.add(review.id));
        });

        // 2. Map each ID to the best available translation
        const consolidatedReviews = Array.from(allIds).map(id => {
            // Try to find the review in the current language
            let review = fallbackObj[baseLang]?.find(r => r.id === id);

            // Fallback to English
            if (!review) review = fallbackObj['en']?.find(r => r.id === id);

            // Fallback to Turkish
            if (!review) review = fallbackObj['tr']?.find(r => r.id === id);

            // Fallback to any available
            if (!review) {
                for (const l in fallbackObj) {
                    review = fallbackObj[l]?.find(r => r.id === id);
                    if (review) break;
                }
            }

            return review;
        }).filter(Boolean); // Remove nulls/undefined

        // Sort by ID to maintain consistent order
        return consolidatedReviews.sort((a, b) => a.id - b.id);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const currentLang = i18n.language || 'tr';
                const baseLang = currentLang.split('-')[0];
                const cacheKey = `googleReviews_${reviewsConfig.placeId}`;
                const filteredFallback = getFallbackForLanguage(currentLang);

                // 1. DİL KONTROLÜ
                // Türkçe dışındaki dillerde Google API kullanılmasın (çünkü karışık dilli yorumlar gelebiliyor)
                if (baseLang !== 'tr') {
                    setReviews(filteredFallback);
                    setLoading(false);
                    return;
                }

                // 2. Önbellek Kontrolü (Sadece Türkçe için)
                const cachedData = localStorage.getItem(cacheKey);
                if (cachedData) {
                    const { timestamp, data } = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    const daysSinceUpdate = (now - timestamp) / (1000 * 60 * 60 * 24);

                    if (daysSinceUpdate < reviewsConfig.cacheDurationDays) {
                        setReviews([...data, ...filteredFallback]);
                        setLoading(false);
                        return;
                    }
                }

                // 2. Load Google Maps Script if not present
                if (!window.google || !window.google.maps || !window.google.maps.places) {
                    await loadGoogleMapsScript(reviewsConfig.apiKey, currentLang);
                }

                // 3. Fetch from API
                console.log('Fetching new Google Reviews from API...');
                const fetchedReviews = await getReviewsFromGoogle(reviewsConfig.placeId);
                const processedReviews = processReviews(fetchedReviews);

                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: new Date().getTime(),
                    data: processedReviews
                }));

                setReviews([...processedReviews, ...filteredFallback]);
                setLoading(false);

            } catch (err) {
                console.error('Error fetching Google Reviews:', err);
                setError(err);
                setReviews(getFallbackForLanguage(i18n.language || 'tr'));
                setLoading(false);
            }
        };

        fetchReviews();
    }, [i18n.language]);

    return { reviews, loading, error };
};

// Helper to load the Google Maps script dynamically
const loadGoogleMapsScript = (apiKey, lang) => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=${lang}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.head.appendChild(script);
    });
};

// Helper to fetch reviews using Places Service
const getReviewsFromGoogle = (placeId) => {
    return new Promise((resolve, reject) => {
        const mapDiv = document.createElement('div');
        const service = new window.google.maps.places.PlacesService(mapDiv);

        const request = {
            placeId: placeId,
            fields: ['reviews'] // requesting only reviews to save data/cost
        };

        service.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                resolve(place.reviews);
            } else {
                reject(`Places API Error: ${status}`);
            }
        });
    });
};

// Process and filter reviews
const processReviews = (googleReviews) => {
    return googleReviews
        .filter(review => review.rating >= (reviewsConfig.minRating || 4)) // Filter by rating
        .filter(review => review.text && review.text.length <= (reviewsConfig.maxTextLength || 200)) // Filter by length
        .sort((a, b) => b.time - a.time) // Sort by date (newest first)
        .slice(0, reviewsConfig.maxReviews || 10) // Limit count
        .map(review => ({
            id: review.time, // using timestamp as ID
            text: review.text,
            author: capitalizeWords(review.author_name),
            location: 'Türkiye', // Using fixed location instead of relative time
            rating: review.rating,
            profile_photo_url: review.profile_photo_url // keeping just in case, though we don't display it
        }));
};

export default useGoogleReviews;
