import { useState, useEffect } from 'react';
import reviewsConfig from '../config/reviewsConfig';

const useGoogleReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // 1. Check Cache
                const cacheKey = `googleReviews_${reviewsConfig.placeId}`;
                const cachedData = localStorage.getItem(cacheKey);

                if (cachedData) {
                    const { timestamp, data } = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    const daysSinceUpdate = (now - timestamp) / (1000 * 60 * 60 * 24);

                    if (daysSinceUpdate < reviewsConfig.cacheDurationDays) {
                        console.log('Using cached Google Reviews');
                        setReviews([...data, ...reviewsConfig.fallbackReviews]);
                        setLoading(false);
                        return;
                    }
                }

                // 2. Load Google Maps Script if not present
                if (!window.google || !window.google.maps || !window.google.maps.places) {
                    await loadGoogleMapsScript(reviewsConfig.apiKey);
                }

                // 3. Fetch from API
                console.log('Fetching new Google Reviews from API...');
                const fetchedReviews = await getReviewsFromGoogle(reviewsConfig.placeId);

                // 4. Cache and Set State
                const processedReviews = processReviews(fetchedReviews);

                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: new Date().getTime(),
                    data: processedReviews
                }));

                setReviews([...processedReviews, ...reviewsConfig.fallbackReviews]);
                setLoading(false);

            } catch (err) {
                console.error('Error fetching Google Reviews:', err);
                setError(err);
                // Fallback to static reviews on error
                setReviews(reviewsConfig.fallbackReviews);
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return { reviews, loading, error };
};

// Helper to load the Google Maps script dynamically
const loadGoogleMapsScript = (apiKey) => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=tr`;
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
