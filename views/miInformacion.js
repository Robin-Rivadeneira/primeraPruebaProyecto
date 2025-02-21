import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg";
import menuEstilos from '../public/css/menu';
import miIdentidadEstilos from '../public/css/miIdentidad';
import identidadInicialEstilos from '../public/css/identidad';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { CameraView, useCameraPermissions } from 'expo-camera';

const MiIdentidad = () => {
  const cameraRef = useRef(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [imageRefBase64, setImageRefBase64] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(true); // Estado para controlar la visibilidad de la cámara
  const [isProcessing, setIsProcessing] = useState(false); // Estado para mostrar "Cargando..."

  useEffect(() => {
    loadReferenceImage();
  }, []);

  const loadReferenceImage = async () => {
    try {
      const asset = Asset.fromModule(require('../public/img/imagenPrueba1.png'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageRefBase64(base64);
    } catch (error) {
      console.error('Error cargando imagen:', error);
    }
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        skipProcessing: true
      });

      const base64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setPhotoBase64(base64);
      setCameraVisible(false); // Ocultar la cámara después de tomar la foto
      setIsProcessing(true); // Mostrar "Cargando..."
      Alert.alert('Foto tomada', 'La foto se ha capturado correctamente.'); // Alerta de foto tomada
      await handleRegister(photo.uri, base64);
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
      setCameraVisible(true); // Restaurar la cámara en caso de error
      setIsProcessing(false); // Ocultar "Cargando..."
    }
  };

  const handleRegister = async (photoUri, photoBase64) => {
    if (!imageRefBase64) return;

    try {
      const randomId = Math.random().toString(36).substr(2, 10);

      // Primera petición a Luxand
      const formData = new FormData();
      formData.append('photo', {
        uri: photoUri,
        name: 'photo.png',
        type: 'image/png',
      });

      const luxandResponse = await fetch('https://api.luxand.cloud/photo/liveness/v2', {
        method: 'POST',
        headers: { 'token': 'ad37885a36ac42fca9f052f1b0487520' },
        body: formData,
      });

      const luxandResult = await luxandResponse.json();
      console.log(luxandResult)
      // Segunda petición a biometria_DEMO
      const biometricBody = {
        source_img: imageRefBase64,
        target_img: photoBase64,
        id: randomId
      };

      const biometricResponse = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(biometricBody),
      });

      const biometricResult = await biometricResponse.json();
      console.log(biometricResult)
      if (luxandResult.status === 'success' && biometricResponse.ok) {
        setQrData({
          cedula: "1234567890",
          nombre: "LARREA PAREDES DIEGO FRANCISCO",
          grado: "Teniente Coronel",
          caduca: "01/01/2030",
        });
        setQrGenerated(true);
        setIsProcessing(false); // Ocultar "Cargando..."
        Alert.alert('Éxito', 'Verificación biométrica completada!');
      } else {
        const errorMessage = luxandResult.message || biometricResult.message || 'Error en la verificación';
        Alert.alert('Error', errorMessage);
        setCameraVisible(true); // Restaurar la cámara en caso de error
        setIsProcessing(false); // Ocultar "Cargando..."
      }
    } catch (error) {
      Alert.alert('Error', 'Problema de conexión');
      setCameraVisible(true); // Restaurar la cámara en caso de error
      setIsProcessing(false); // Ocultar "Cargando..."
    }
  };

  if (!permission?.granted) {
    return (
      <View style={miIdentidadEstilos.container}>
        <Text style={miIdentidadEstilos.message}>Se necesitan permisos para la cámara</Text>
        <Button title="Otorgar permisos" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
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
            <Image source={require('../public/img/imagenPrueba.jpg')} style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }} resizeMode="contain" />
          </View>

          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <LogoEjercito width='100%' height="100%" />
            </View>

            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>CÉDULA:</Text> 1713489514
              </Text>
              <Text style={menuEstilos.cardText}>Gerald Orlando Moreno Jadan</Text>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>GRADO:</Text> Teniente Coronel
              </Text>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>CADUCA:</Text> 01/01/2030
              </Text>
            </View>

            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>

        {!qrGenerated && cameraVisible && (
          <CameraView
            ref={cameraRef}
            style={miIdentidadEstilos.camera}
            facing={facing}
            enableTorch={false}
          >
            <View style={miIdentidadEstilos.buttonContainer}>
              <TouchableOpacity
                style={miIdentidadEstilos.button}
                onPress={() => setFacing(current => current === 'back' ? 'front' : 'back')}
              >
                <Text style={miIdentidadEstilos.text}>Cambiar cámara</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={miIdentidadEstilos.captureButton}
                onPress={takePhoto}
              >
                <Text style={miIdentidadEstilos.text}>Tomar foto</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}

        {!cameraVisible && isProcessing && (
          <View style={miIdentidadEstilos.loadingContainer}>
            <Text style={miIdentidadEstilos.loadingText}>Cargando...</Text>
          </View>
        )}

        {qrData && (
          <View style={miIdentidadEstilos.qrContainer}>
            <QRCode
              value={JSON.stringify(qrData)}
              size={250}
              color="#2c3e50"
              backgroundColor="#ffffff"
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default MiIdentidad;