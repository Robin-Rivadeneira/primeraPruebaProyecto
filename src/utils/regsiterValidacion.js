// utils/registerValidacion.js

// Validar nombre y apellido (solo letras y espacios)
export const validateName = (text) => {
    const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
    return regex.test(text);
};

// Validar cédula (solo números, máximo 10 dígitos)
export const validateCedula = (text) => {
    const regex = /^\d{0,10}$/; // Solo números, máximo 10 dígitos
    return regex.test(text);
};

// Validar código dactilar (texto y números, exactamente 10 caracteres)
export const validateFingerCode = (text) => {
    const regex = /^[a-zA-Z0-9]{0,10}$/; // Letras y números, máximo 10 caracteres
    return regex.test(text);
};

// Validar correo electrónico
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de correo válido
    return regex.test(email);
};

// Validar contraseña (al menos 8 caracteres, una mayúscula, una minúscula y un número)
export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
};

// Validar coincidencia de contraseñas
export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};