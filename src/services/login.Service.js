// services/authService.js
import axios from 'axios'; // Importa Axios
import apiConeccion from './coneccion.Service';
import { Alert } from 'react-native'; // Importa Alert de React Native

// Configura Axios con la URL base y los encabezados
const api = axios.create({
  baseURL: apiConeccion.coneccionGeneral, // Usa la URL base de tu servicio
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {

    // Realiza la solicitud POST con Axios
    const response = await api.post('/auth', {
      email: email,
      password: password,
    });

    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error("Error en la solicitud:", error);

    let errorMessage = 'Error al iniciar sesión'; // Mensaje de error por defecto

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { data } = error.response;

      // Extraer el mensaje de error del servidor
      if (data && data.message) {
        errorMessage = data.message; // Usar el mensaje del servidor
      } else if (data && data.error) {
        errorMessage = data.error; // Usar el campo "error" si existe
      } else {
        errorMessage = 'Error en el servidor'; // Mensaje genérico si no hay detalles
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No se recibió respuesta del servidor. Verifica tu conexión a Internet.';
    } else {
      // Algo más causó el error
      errorMessage = error.message || 'Error al iniciar sesión';
    }

    // Mostrar el mensaje de error en una alerta
    Alert.alert(
      "Error",
      errorMessage,
      [{ text: "OK" }]
    );

    // Lanzar el error para que pueda ser manejado por el componente que llama a esta función
    throw new Error(errorMessage);
  }
};