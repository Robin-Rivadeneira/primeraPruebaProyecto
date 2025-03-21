// menuLogic.js
import { getTokenData } from './token.service'; // Importar el servicio de token
import apiConeccion from './coneccion.Service';
// Función para obtener los datos de la tarjeta ISSFA y la foto de perfil
export const getMenuData = async () => {
    try {
        // Obtener los datos del token
        const tokenData = await getTokenData();

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
            throw new Error(errorData.message || 'Error al obtener los datos del registro civil');
        }

        // Obtener los datos de la respuesta
        const registroCivilData = await response.json();

        // Actualizar los datos de la tarjeta ISSFA y la foto de perfil
        const menuData = {
            cedula: registroCivilData.nui || '1713489514', // Usa el NUI del registro civil o un valor por defecto
            nombre: registroCivilData.nombre || 'Gerald Orlando Moreno Jadan', // Usa el nombre del registro civil o un valor por defecto
            grado: registroCivilData.grado || 'Teniente Coronel', // Usa el grado del registro civil o un valor por defecto
            caduca: registroCivilData.caduca || '01/01/2030', // Usa la fecha de caducidad del registro civil o un valor por defecto
            imagenPerfil: registroCivilData.fotografia || '', // Usa la imagen en Base64 del token o un valor por defecto
            imagenTarjeta: registroCivilData.fotografia || '', // Usa la imagen en Base64 de la tarjeta ISSFA o un valor por defecto
        };

        return menuData; // Retornar los datos actualizados
    } catch (error) {
        console.error("Error al obtener los datos del menú:", error);
        throw error;
    }
};