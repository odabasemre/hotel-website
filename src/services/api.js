// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch wrapper with error handling
async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // Auth token ekle
    const token = localStorage.getItem('admin_token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Settings API
export const settingsApi = {
    getAll: () => fetchApi('/settings'),
    get: (key) => fetchApi(`/settings/${key}`),
    update: (key, value) => fetchApi(`/settings/${key}`, {
        method: 'PUT',
        body: JSON.stringify(value),
    }),
    
    // Site Images
    getAllImages: () => fetchApi('/settings/images/all'),
    updateImage: (section, imageKey, imagePath) => fetchApi(`/settings/images/${section}/${imageKey}`, {
        method: 'PUT',
        body: JSON.stringify({ imagePath }),
    }),
    
    // Gallery
    getGalleryImages: () => fetchApi('/settings/gallery/images'),
    addGalleryImage: (data) => fetchApi('/settings/gallery/images', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    deleteGalleryImage: (id) => fetchApi(`/settings/gallery/images/${id}`, {
        method: 'DELETE',
    }),
    
    // Property Info
    getPropertyInfo: () => fetchApi('/settings/property/info'),
    updatePropertyInfo: (key, value) => fetchApi(`/settings/property/info/${key}`, {
        method: 'PUT',
        body: JSON.stringify(value),
    }),
    
    // Pricing
    getPricing: (startDate, endDate) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        return fetchApi(`/settings/pricing?${params}`);
    },
    updatePricing: (date, data) => fetchApi(`/settings/pricing/${date}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    // Site Texts
    getTexts: (lang = 'tr') => fetchApi(`/settings/texts?lang=${lang}`),
    updateTexts: (section, lang, content) => fetchApi(`/settings/texts/${section}`, {
        method: 'PUT',
        body: JSON.stringify({ lang, content }),
    }),
};

// Bookings API
export const bookingsApi = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return fetchApi(`/bookings?${params}`);
    },
    get: (id) => fetchApi(`/bookings/${id}`),
    create: (data) => fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => fetchApi(`/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => fetchApi(`/bookings/${id}`, {
        method: 'DELETE',
    }),
    checkAvailability: (checkIn, checkOut) => 
        fetchApi(`/bookings/check/availability?checkIn=${checkIn}&checkOut=${checkOut}`),
};

// Upload API
export const uploadApi = {
    // Tek dosya yükle
    uploadSingle: async (file, section, imageKey) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('section', section);
        if (imageKey) formData.append('imageKey', imageKey);

        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}/upload/single`, {
            method: 'POST',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Upload failed');
        }

        return response.json();
    },

    // Çoklu dosya yükle
    uploadMultiple: async (files, section = 'gallery') => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        formData.append('section', section);

        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
            method: 'POST',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Upload failed');
        }

        return response.json();
    },

    // Base64 yükle
    uploadBase64: (image, section, imageKey, filename) => fetchApi('/upload/base64', {
        method: 'POST',
        body: JSON.stringify({ image, section, imageKey, filename }),
    }),

    // Dosya sil
    delete: (section, filename) => fetchApi(`/upload/${section}/${filename}`, {
        method: 'DELETE',
    }),

    // Dosyaları listele
    list: (section) => fetchApi(`/upload/list${section ? `/${section}` : ''}`),
};

// Auth API
export const authApi = {
    login: (username, password) => fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    }),
    verify: () => fetchApi('/auth/verify'),
    changePassword: (currentPassword, newPassword) => fetchApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
    }),
    setup: (username, password) => fetchApi('/auth/setup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    }),
};

// Health check
export const healthCheck = () => fetchApi('/health');

export default {
    settings: settingsApi,
    bookings: bookingsApi,
    upload: uploadApi,
    auth: authApi,
    healthCheck,
};
