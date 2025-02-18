import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg";
import menuEstilos from '../public/css/menu';
import miIdentidadEstilos from '../public/css/miIdentidad';
import identidadInicialEstilos from '../public/css/identidad';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const MiIdentidad = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [imageRefBase64, setImageRefBase64] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false); // Estado para controlar si el QR ya fue generado

  // Cargar imagen de referencia
  const loadReferenceImage = async () => {
    try {
      const asset = Asset.fromModule(require('../public/img/imagenPrueba.png'));
      await asset.downloadAsync(); // Asegura que la imagen esté disponible

      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setImageRefBase64(base64);
    } catch (error) {
      console.error('Error cargando la imagen de referencia:', error);
    }
  };

  // Llamar la función para cargar la imagen de referencia cuando el componente se monta
  useEffect(() => {
    loadReferenceImage();
  }, []);

  // Función para abrir la cámara y tomar la foto
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar una foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: false, // No convertir aquí, lo haremos manualmente
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);

      try {
        // Convertir la imagen a formato PNG
        const pngUri = FileSystem.documentDirectory + 'captura.png';
        await FileSystem.copyAsync({
          from: uri,
          to: pngUri,
        });

        // Leer la imagen en formato Base64
        const base64 = await FileSystem.readAsStringAsync(pngUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setPhotoBase64(base64);

        // Enviar la foto para verificación biométrica después de tomarla
        await handleRegister(pngUri); // Usar la URI de la imagen en formato PNG
      } catch (error) {
        Alert.alert('Error', 'No se pudo convertir la imagen a PNG.');
      }
    }
  };

  // Manejar el registro
  const handleRegister = async (photoUri) => {
    if (!photoUri || !imageRefBase64) {
      Alert.alert('Error', 'Por favor, tome una foto antes de continuar.');
      return;
    }

    const randomId = Math.random().toString(36).substr(2, 10); // ID aleatorio

    // Crear un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      name: 'photo.png', // Nombre del archivo (asegurado como .png)
      type: 'image/png', // Tipo de archivo
    });

    const requestBody = {
      source_img: imageRefBase64, // Imagen de referencia en Base64
      target_img: photoBase64, // Imagen capturada en Base64
      id: randomId,
    };

    try {
      const responses = await fetch('https://api.luxand.cloud/photo/liveness/v2', {
        method: 'POST',
        headers: {
          'token': 'ad37885a36ac42fca9f052f1b0487520', // Token de autenticación
        },
        body: formData, // Usamos FormData para enviar la imagen
      });

      const response = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await responses.json();
      const results = await response.json();
      console.log('Respuesta API:', result);
      console.log('Respuesta API:', results);
      if (result.status == 'success' && response.ok) { // Verifica si el valor de "result" es "real"
        Alert.alert('Éxito', '¡Verificación biométrica completada!');
        // Solo generar el QR si la respuesta es exitosa
        setQrData({
          cedula: "1234567890",
          nombre: "LARREA PAREDES DIEGO FRANCISCO",
          grado: "Teniente Coronel",
          caduca: "01/01/2030",
        });
        setQrGenerated(true); // Cambiar el estado a true después de generar el QR
      } else {
        Alert.alert('Error', result.message || 'Error en la verificación biométrica.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={menuEstilos.container}
    >
      <View style={identidadInicialEstilos.header}>
        <GoIdentitySVG style={identidadInicialEstilos.logo} />
      </View>
      <View style={menuEstilos.card}>
        <View style={menuEstilos.cardHeader}>
          <Text style={menuEstilos.cardTitle}>ISSFA</Text>
        </View>
        <View style={menuEstilos.cardContent}>
          <View style={menuEstilos.cardImagen}>
            <UsuarioSvg width='100%' height="100%" />
          </View>
          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <LogoEjercito width='100%' height="100%" />
            </View>
            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>CÉDULA:</Text>
              <Text style={menuEstilos.cardTexts}>1234567890</Text>
              <Text style={menuEstilos.cardText}>LARREA PAREDES DIEGO FRANCISCO</Text>
              <Text style={menuEstilos.cardText}>GRADO:</Text>
              <Text style={menuEstilos.cardTexts}>Teniente Coronel</Text>
              <Text style={menuEstilos.cardText}>CADUCA:</Text>
              <Text style={menuEstilos.cardTexts}>01/01/2030</Text>
            </View>
            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>

        {/* Mostrar el botón solo si el QR aún no fue generado */}
        {!qrGenerated && (
          <View style={miIdentidadEstilos.cameraContainer}>
            <Button title="Generar QR" onPress={openCamera} />
          </View>
        )}

        {/* Mostrar el QR solo si la verificación fue exitosa */}
        {qrData && (
          <View style={miIdentidadEstilos.qrContainer}>
            <Text style={miIdentidadEstilos.cardText}>Código QR:</Text>
            <QRCode value={JSON.stringify(qrData)} size={250} />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default MiIdentidad;