/**
 * Utility functions for formatting values
 */

/**
 * Format a date to Turkish locale string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...options
    });
};

/**
 * Format a date to YYYY-MM-DD string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateISO = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Format price with Turkish Lira symbol
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
    return price.toLocaleString('tr-TR') + ' ₺';
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    }
    return phone;
};
