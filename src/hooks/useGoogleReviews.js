import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsConfig from '../config/reviewsConfig';

const useGoogleReviews = () => {
    const { i18n } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get fallback reviews for current language
    const getFallbackForLanguage = (lang) => {
        const baseLang = lang.split('-')[0];
        const fallbackObj = reviewsConfig.fallbackReviews || {};
        const list = fallbackObj[baseLang] || fallbackObj['tr'] || [];
        return list;
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
            author: review.author_name,
            location: review.relative_time_description, // showing time as location/subtitle since location isn't in review object
            rating: review.rating,
            profile_photo_url: review.profile_photo_url // keeping just in case, though we don't display it
        }));
};

export default useGoogleReviews;
