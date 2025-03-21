import * as FileSystem from 'expo-file-system';
import apiConeccion from './coneccion.Service';

// Tomar foto
export const takePicture = async (cameraRef) => {
    if (!cameraRef.current) throw new Error("Cámara no inicializada");

    try {
        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: true, // Asegúrate de que esto esté en true para obtener la imagen en base64
            skipProcessing: true,
        });

        const base64 = await FileSystem.readAsStringAsync(photo.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return { uri: photo.uri, base64 };
    } catch (error) {
        console.error('Error al capturar foto:', error);
        throw error;
    }
};

// Registrar usuario
export const registerUser = async (userData) => {
    try {
        // Extraer los primeros 6 dígitos del código dactilar
        const codigoDactilar = userData.fingerCode.substring(0, 6);

        const response = await fetch(`${apiConeccion.coneccionGeneral}/usuario`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombres: `${userData.name}`,
                apellidos: userData.surname,
                ci: userData.idNumber,
                codigo_dactilar: codigoDactilar,
                email: userData.email,
                contrasena: userData.contrasena,
                empresa_id: "d4eb8760-3ec2-4db2-b2bd-19ae00300784",
                grupo_id: "060249d7-fc91-4cec-a1b0-50b5120a62ee",
                estado: "activo"
            }),
        });

        const data = await response.json();

        // Verificar si el correo ya está registrado
        if (data.data && data.data.message === "El correo electronico se encuentra registrado.") {
            throw new Error(data.data.message);
        }

        // Verificar si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }

        // Verificar si el registro fue exitoso
        if (data.mesagge === "Proceso Exitoso") {
            return {
                success: true,
                referenceImage: data.data.apiResponse.fotografia // Imagen de referencia para comparación
            };
        }

        // Si no se cumple ninguna de las condiciones anteriores, lanzar un error genérico
        throw new Error('Error desconocido en el registro');
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
};