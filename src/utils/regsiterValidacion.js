// utils/registerValidacion.js

// ==================================================
// Funciones de validación de cédula y RUC (del archivo cedulaRuc.ts.txt)
// ==================================================

// Función para validar el dígito verificador mediante el algoritmo de módulo 10
const validarModulo10 = (numero) => {
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      let producto = parseInt(numero.charAt(i)) * coeficientes[i];
      if (producto > 9) {
        producto -= 9;
      }
      suma += producto;
    }
    const residuo = suma % 10;
    return residuo === 0 ? residuo : 10 - residuo;
  };
  
  // Función para validar el dígito verificador mediante el algoritmo de módulo 11
  const validarModulo11 = (numero) => {
    let suma = 0;
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < coeficientes.length; i++) {
      suma += parseInt(numero.charAt(i)) * coeficientes[i];
    }
    const residuo = suma % 11;
    return residuo === 0 ? 0 : 11 - residuo;
  };
  
  // Función para validar cédula o RUC
  export const validateCedula = (text) => {
    // Verificar si el texto es válido (solo números, máximo 13 dígitos)
    const regex = /^\d{0,13}$/;
    if (!regex.test(text)) {
      return false; // Si no cumple con el formato básico, retorna falso
    }
  
    // Validar cédula (10 dígitos)
    if (text.length === 10) {
      const digitoVerificador = parseInt(text.charAt(9));
      const resultadoModulo10 = validarModulo10(text.substring(0, 9));
      return digitoVerificador === resultadoModulo10; // Retorna true si la cédula es válida
    }
  
    // Validar RUC (13 dígitos)
    if (text.length === 13) {
      const digitoVerificador = parseInt(text.charAt(9));
      const resultadoModulo11 = validarModulo11(text.substring(0, 9));
      const tercerDigito = parseInt(text.charAt(2));
  
      if (digitoVerificador === resultadoModulo11) {
        if (tercerDigito === 9 || tercerDigito === 6) {
          return true; // RUC de personas jurídicas, extranjeros o entidades públicas
        }
      } else if (tercerDigito >= 0 && tercerDigito <= 5) {
        const resultadoModulo10 = validarModulo10(text.substring(0, 9));
        return digitoVerificador === resultadoModulo10; // RUC de personas naturales
      }
    }
  
    // Si no cumple con ninguna validación, retorna falso
    return false;
  };
  
  // ==================================================
  // Funciones de validación existentes (no se modifican)
  // ==================================================
  
  // Validar nombre y apellido (solo letras y espacios)
  export const validateName = (text) => {
    const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
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
  
  // ==================================================
  // Exportar todas las funciones
  // ==================================================
  
  export default {
    validateCedula,
    validateName,
    validateFingerCode,
    validateEmail,
    validatePassword,
    validatePasswordMatch,
  };