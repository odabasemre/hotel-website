/**
 * Utility functions for validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Turkish format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Validate name (at least 6 chars, contains space, only letters and period)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const isValidName = (name) => {
    if (!name || name.length < 6) return false;
    if (!name.includes(' ')) return false;
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s.]+$/;
    return nameRegex.test(name);
};

/**
 * Validate date range
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @returns {boolean} True if valid
 */
export const isValidDateRange = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return false;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkOutDate > checkInDate;
};

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} True if not empty
 */
export const isRequired = (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return !isNaN(value);
    return value !== null && value !== undefined;
};
