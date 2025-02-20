import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false); // Estado para la animación de carga

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
      setLoading(true); // Iniciar animación de carga
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        skipProcessing: true
      });

      const base64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setPhotoBase64(base64);
      await handleRegister(photo.uri, base64);
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    } finally {
      setLoading(false); // Detener animación de carga
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

      // Verificar ambas respuestas
      if (luxandResult.status === 'success' && biometricResponse.ok) {
        setQrData({
          cedula: "1234567890",
          nombre: "LARREA PAREDES DIEGO FRANCISCO",
          grado: "Teniente Coronel",
          caduca: "01/01/2030",
        });
        setQrGenerated(true);
        Alert.alert('Éxito', 'Verificación biométrica completada!');
      } else {
        const errorMessage = luxandResult.message || biometricResult.message || 'Error en la verificación';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Problema de conexión');
      console.error(error);
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
              <Text style={menuEstilos.cardText}>CÉDULA: 1713489514</Text>
              <Text style={menuEstilos.cardText}>Gerald Orlando Moreno Jadan</Text>
              <Text style={menuEstilos.cardText}>GRADO: Teniente Coronel</Text>
              <Text style={menuEstilos.cardText}>CADUCA: 01/01/2030</Text>
            </View>

            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>

        {!qrGenerated && (
          <CameraView
            ref={cameraRef}
            style={miIdentidadEstilos.camera}
            facing={facing}
            enableTorch={false}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
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
            )}
          </CameraView>
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