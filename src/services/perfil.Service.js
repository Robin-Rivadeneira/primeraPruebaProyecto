// perfilLogic.js
import * as Location from 'expo-location';

// Datos iniciales del usuario
const initialUserInfo = {
  name: 'DIEGO FRANCISCO',
  lastName: 'LARREA PAREDES',
  cedula: '1234567890',
  direccion: '',
  celular: '0976289216',
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

// Exportar datos iniciales
export { initialUserInfo };