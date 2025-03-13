// miIdentidadConfig.js
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Asset } from 'expo-asset';

// URLs y tokens de la API
const API_CONFIG = {
  FACE_DETECTION_URL: 'https://api.luxand.cloud/photo/detect',
  LIVENESS_CHECK_URL: 'https://api.luxand.cloud/photo/liveness/v2',
  BIOMETRICS_URL: 'http://54.189.63.53:9100/biometria_DEMO',
  LUXAND_TOKEN: 'ad37885a36ac42fca9f052f1b0487520',
};

// Cargar la imagen de referencia como Base64
export const loadReferenceImage = async () => {
  try {
    const asset = Asset.fromModule(require('../assets/img/imagenPrueba1.png'));
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

// Extraer frames de un video
export const extractFramesFromVideo = async (videoUri) => {
  const frames = [];
  try {
    for (let time = 1; time <= 5; time++) {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: time * 1000,
        quality: 0.8,
      });
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      frames.push(base64);
    }
  } catch (error) {
    console.error("Error extrayendo frames:", error);
    throw error;
  }
  return frames;
};

// Verificar rostro
export const checkFace = async (base64Image) => {
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: `data:image/jpeg;base64,${base64Image}`,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch(API_CONFIG.FACE_DETECTION_URL, {
      method: 'POST',
      headers: {
        'token': API_CONFIG.LUXAND_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const result = await response.json();
    return {
      success: Array.isArray(result) && result.length > 0,
      data: result,
    };
  } catch (error) {
    console.log("❌ Error en detección de rostro:", error);
    return { success: false };
  }
};

// Verificar vivacidad
export const checkLiveness = async (base64Image) => {
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: `data:image/jpeg;base64,${base64Image}`,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch(API_CONFIG.LIVENESS_CHECK_URL, {
      method: 'POST',
      headers: {
        'token': API_CONFIG.LUXAND_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const clonedResponse = response.clone();
    if (!response.ok) {
      const errorData = await clonedResponse.json();
      throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return await clonedResponse.json();
  } catch (error) {
    console.log("❌ Error en vivacidad:", error.message);
    return { status: 'error', error: error.message };
  }
};

// Verificar biometría
export const verifyBiometrics = async (sourceImg, targetImg) => {
  try {
    const response = await fetch(API_CONFIG.BIOMETRICS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_img: sourceImg,
        target_img: targetImg,
        id: Math.random().toString(36).substr(2, 10),
      }),
    });
    const result = await response.json();
    return { match: result.is_same_person };
  } catch (error) {
    console.log("❌ Error en biometría:", error);
    return { match: false };
  }
};

// Datos de ejemplo para el QR
export const QR_DATA = {
  cedula: "1234567890",
  nombre: "LARREA PAREDES DIEGO FRANCISCO",
  grado: "Teniente Coronel",
  caduca: "01/01/2030",
};