// registroLogic.js
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Cargar imagen de referencia
export const loadReferenceImage = async () => {
    try {
        const asset = Asset.fromModule(require('../../assets/img/imagenPrueba1.png'));
        await asset.downloadAsync();
        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    } catch (error) {
        console.error('Error cargando imagen:', error);
        throw error;
    }
};

// Tomar foto
export const takePicture = async (cameraRef) => {
    if (!cameraRef.current) throw new Error("Cámara no inicializada");

    try {
        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: false,
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
        const response = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source_img: userData.imageRefBase64,
                target_img: userData.photoBase64,
                id: Math.random().toString(36).substr(2, 10),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro');
        }

        return response.json();
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
};