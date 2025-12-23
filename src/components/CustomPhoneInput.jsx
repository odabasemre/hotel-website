import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/components/custom-phone-input.css';

const CustomPhoneInput = ({ value, onChange, onValidation, placeholder }) => {

    const handleChange = (val, data, event, formattedValue) => {
        // formattedValue is like "+90 555 123 45 67"
        onChange(formattedValue);

        // Validation logic
        // val contains only digits like "905551234567"
        const dialCode = data.dialCode;
        const numberOnly = val.slice(dialCode.length);

        // General rule: International numbers are between 7 and 15 digits (excluding dial code)
        // But with this library, it's better to check if it's longer than just the dial code
        // and meets a reasonable minimum for the specific country if possible.
        // For simplicity and "world standard", at least 7 digits is a safe bet for a real number.
        const isValid = numberOnly.length >= 7 && val.length > dialCode.length;

        if (onValidation) {
            onValidation(isValid);
        }
    };

    return (
        <div className="custom-phone-input-container">
            <PhoneInput
                country={'tr'}
                value={value}
                onChange={handleChange}
                placeholder={placeholder || "5XX XXX XX XX"}
                enableSearch={true}
                searchPlaceholder="Ülke ara..."
                searchNotFound="Ülke bulunamadı"
                containerClass="phone-input-wrapper"
                inputClass="phone-input-field"
                buttonClass="phone-input-button"
                dropdownClass="phone-input-dropdown"
                autoFormat={true}
                copyNumbersOnly={false}
                countryCodeEditable={false}
            />
        </div>
    );
};

export default CustomPhoneInput;
