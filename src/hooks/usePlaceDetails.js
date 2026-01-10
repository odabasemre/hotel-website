import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsConfig from '../config/reviewsConfig';

const usePlaceDetails = () => {
    const { i18n } = useTranslation();
    const [details, setDetails] = useState({
        address: 'Ayder Yaylası Galer Düzü No:182, Çamlıhemşin, Rize',
        phone: '+90 530 428 93 55',
        email: 'ayderkuzeyhouses@gmail.com',
        website: 'https://ayderkuzeyhouses.com',
        loading: true
    });

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                // If Google Maps isn't loaded yet, we wait or use fallbacks
                if (!window.google || !window.google.maps || !window.google.maps.places) {
                    // Script loading is handled by useGoogleReviews, so we can just wait
                    // or define a simple check. To be safe, we use the fallback first.
                    setDetails(prev => ({ ...prev, loading: false }));
                    return;
                }

                const mapDiv = document.createElement('div');
                const service = new window.google.maps.places.PlacesService(mapDiv);

                const request = {
                    placeId: reviewsConfig.placeId,
                    fields: ['formatted_address', 'international_phone_number', 'website', 'url']
                };

                service.getDetails(request, (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        setDetails({
                            address: place.formatted_address || details.address,
                            phone: place.international_phone_number || details.phone,
                            email: 'ayderkuzeyhouses@gmail.com', // Email is not provided by Places API
                            website: place.website || details.website,
                            loading: false
                        });
                    } else {
                        setDetails(prev => ({ ...prev, loading: false }));
                    }
                });
            } catch (error) {
                console.error('Error fetching place details:', error);
                setDetails(prev => ({ ...prev, loading: false }));
            }
        };

        // Delay slightly to ensure script is loaded (as useGoogleReviews triggers it)
        const timer = setTimeout(fetchPlaceDetails, 1000);
        return () => clearTimeout(timer);
    }, [i18n.language]);

    return details;
};

export default usePlaceDetails;
