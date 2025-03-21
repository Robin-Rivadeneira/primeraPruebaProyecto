import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; // Incorrecto (no es una exportación nombrada)

export const getTokenData = async () => {
    try {
        // Obtener el token de AsyncStorage
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
            // Verificar que el token tenga el formato correcto
            if (typeof token === 'string' && token.split('.').length === 3) {
                // Decodificar el token
                const decodedToken = jwtDecode(token);
                return decodedToken;
            } else {
                console.error("El token no tiene un formato válido.");
                return null;
            }
        } else {
            console.log("No se encontró ningún token.");
            return null;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        throw error;
    }
};