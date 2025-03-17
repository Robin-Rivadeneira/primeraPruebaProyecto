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
<<<<<<< HEAD
    console.log("URL de la solicitud:", `${apiConeccion.coneccionGeneral}/auth`);
    console.log("Datos enviados:", { email, password });

    // Realiza la solicitud POST con Axios
    const response = await api.post('/auth', {
=======
    console.log("URL de la solicitud:", `${apiConeccion.coneccionGeneral}/Login`);
    console.log("Datos enviados:", { email, password });

    // Realiza la solicitud POST con Axios
    const response = await api.post('/Login', {
>>>>>>> 3299c77dc823f9017850f1afc7cf18cf3ec7ca9e
      email: email,
      password: password,
    });

<<<<<<< HEAD
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error("Error en la solicitud:", error);

=======
    // Muestra alertas con la información de la respuesta
    Alert.alert(
      "Estado de la respuesta",
      `Código de estado: ${response.status}`,
      [{ text: "OK" }]
    );

    Alert.alert(
      "Headers de la respuesta",
      JSON.stringify(response.headers, null, 2),
      [{ text: "OK" }]
    );

    Alert.alert(
      "Datos recibidos",
      `Token: ${response.data.data.token}`,
      [{ text: "OK" }]
    );

    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error("Error en la solicitud:", error);

>>>>>>> 3299c77dc823f9017850f1afc7cf18cf3ec7ca9e
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      Alert.alert(
        "Error del servidor",
        JSON.stringify(error.response.data, null, 2),
        [{ text: "OK" }]
      );
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      Alert.alert(
        "Error de conexión",
        "No se recibió respuesta del servidor. Verifica tu conexión a Internet.",
        [{ text: "OK" }]
      );
      throw new Error('No se pudo conectar al servidor');
    } else {
      // Algo más causó el error
      Alert.alert(
        "Error",
        error.message || 'Error al iniciar sesión',
        [{ text: "OK" }]
      );
      throw new Error('Error al iniciar sesión');
    }
  }
};