// perfilLogic.js
import apiConeccion from './coneccion.Service';
import { getTokenData } from './token.service'; // Importar el servicio de token
import * as Location from 'expo-location';


// Función para obtener los datos del usuario combinados con el token y el registro civil
export const getUserInfo = async () => {
    try {
        // Obtener los datos del token
        const tokenData = await getTokenData();
        console.log("Datos del token:", tokenData);

        // Extraer el idIdentidad del token
        const idIdentidad = tokenData.idIdentidad;

        // Realizar la petición HTTP para obtener los datos del registro civil
        const response = await fetch(`${apiConeccion.coneccionRegsitro}/registrocivil/${idIdentidad}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la solicitud:", errorData);
            throw new Error(errorData.message || 'Error al obtener los datos del registro civil');
        }

        // Obtener los datos de la respuesta
        const registroCivilData = await response.json();
        console.log("Datos del registro civil:", registroCivilData);

        // Actualizar initialUserInfo con los datos del token y del registro civil
        const initialUserInfo = {
            name: registroCivilData.nombres || 'DIEGO FRANCISCO', // Usa los nombres del registro civil o un valor por defecto
            lastName: registroCivilData.apellido1+ ' ' + registroCivilData.apellido2 || 'LARREA PAREDES', // Usa el nombre del registro civil o un valor por defecto
            cedula: registroCivilData.nui || '1234567890', // Usa el NUI del registro civil o un valor por defecto
            direccion: registroCivilData.direccion || '', // Usa la dirección del registro civil o un valor por defecto
            celular: registroCivilData.celular || '0976289216', // Usa el celular del registro civil o un valor por defecto
            imagenBase64: registroCivilData.fotografia || '', // Usa la imagen en Base64 del token o un valor por defecto
        };

        return initialUserInfo; // Retornar los datos actualizados
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        throw error;
    }
};

// Obtener la dirección actual
export const getCurrentAddress = async () => {
    try {
        // Solicitar permisos
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permiso de ubicación denegado');
        }

        // Obtener ubicación actual
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Obtener dirección desde las coordenadas
        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode.length > 0) {
            const { street, city, region, postalCode } = reverseGeocode[0];
            return `${street}, ${city}, ${region}, ${postalCode}`;
        } else {
            return 'Dirección no encontrada';
        }
    } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener la ubicación actual');
    }
};