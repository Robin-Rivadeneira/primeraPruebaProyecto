// miIdentidadConfig.js
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Asset } from 'expo-asset';
import { getTokenData } from './token.service';
import apiConeccion from '../services/coneccion.Service';
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

    const response = await fetch(apiConeccion.FACE_DETECTION_URL, {
      method: 'POST',
      headers: {
        'token': apiConeccion.LUXAND_TOKEN,
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

    const response = await fetch(apiConeccion.LIVENESS_CHECK_URL, {
      method: 'POST',
      headers: {
        'token': apiConeccion.LUXAND_TOKEN,
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
    const response = await fetch(apiConeccion.BIOMETRICS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_img: sourceImg,
        target_img: targetImg,
        id: Math.random().toString(36).substr(2, 10),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const result = await response.json();

    if (!result.hasOwnProperty('is_same_person')) {
      throw new Error("Respuesta inválida de la API");
    }

    return { match: result.is_same_person };
  } catch (error) {
    console.error("❌ Error en biometría:", error);
    return { match: false, error: error.message };
  }
};

// Datos de ejemplo para el QR
export const getQRData = async () => {
  try {
    const tokenData = await getTokenData();
    if (!tokenData || !tokenData.idIdentidad) {
      throw new Error("No se pudo obtener el idIdentidad del token.");
    }
    return {
      idIdentidad: tokenData.idIdentidad,
    };
  } catch (error) {
    console.error("Error al obtener los datos del QR:", error);
    throw error;
  }
};