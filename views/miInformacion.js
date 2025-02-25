import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Componentes SVG
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import LogoEjercito from "../public/img/ejercito.svg";

// Estilos
import menuEstilos from '../public/css/menu';
import miIdentidadEstilos from '../public/css/miIdentidad';
import identidadInicialEstilos from '../public/css/identidad';

const MiIdentidad = () => {
  const cameraRef = useRef(null);
  const [qrData, setQrData] = useState(null);
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageRefBase64, setImageRefBase64] = useState(null);
  const [showBorderAnimation, setShowBorderAnimation] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    console.log("1. Componente montado");
    loadReferenceImage();
    return () => {
      isMounted.current = false;
      console.log("Componente desmontado");
    };
  }, []);

  useEffect(() => {
    const initializeCamera = async () => {
      if (permission?.granted) {
        console.log("2. Permisos concedidos, iniciando cámara...");
        try {
          await cameraRef.current?.resumePreview();
          console.log("3. Cámara iniciada correctamente");
        } catch (error) {
          console.error("Error al iniciar cámara:", error);
        }
      }
    };
    initializeCamera();
  }, [permission]);

  const loadReferenceImage = async () => {
    try {
      console.log("Cargando imagen de referencia...");
      const asset = Asset.fromModule(require('../public/img/imagenPrueba1.png'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageRefBase64(base64);
      console.log("Imagen de referencia cargada:", base64 ? "✅" : "❌");
    } catch (error) {
      console.error('Error cargando imagen:', error);
    }
  };

  const processFrame = async (frame) => {
    if (!isMounted.current || isProcessing || qrData) return;

    console.log("Procesando frame...");
    setIsProcessing(true);
    setShowBorderAnimation(true);

    try {
      console.log("Dimensiones del frame:", frame.width, "x", frame.height);
      if (!frame.base64) throw new Error("Frame sin datos base64");

      const base64Data = `data:image/jpeg;base64,${frame.base64}`;
      console.log("Base64 recibido:", base64Data.substring(0, 30) + "...");

      // 1. Detección de rostro
      console.log("Iniciando detección de rostro...");
      const hasFace = await checkFace(base64Data);
      if (!hasFace) throw new Error('No se detectó un rostro');
      console.log("Rostro detectado correctamente.");

      // 2. Verificación de vivacidad
      console.log("Iniciando verificación de vivacidad...");
      const livenessResult = await checkLiveness(base64Data);
      if (!livenessResult.live) throw new Error('El rostro no parece ser real');
      console.log("Vivacidad verificada correctamente:", livenessResult);

      // 3. Comparación biométrica
      console.log("Iniciando comparación biométrica...");
      const biometricResult = await verifyBiometrics(base64Data);
      if (!biometricResult.match) throw new Error('No coincide con la referencia');
      console.log("Comparación biométrica exitosa:", biometricResult);

      // Éxito en la verificación
      handleVerificationSuccess();

    } catch (error) {
      console.error("Error en processFrame:", error);
      Alert.alert('Error', error.message);
    } finally {
      setIsProcessing(false);
      setShowBorderAnimation(false);
      console.log("Procesamiento finalizado.");
    }
  };

  const checkFace = async (base64Image) => {
    try {
      console.log("Enviando imagen a la API de detección de rostros...");
      const response = await fetch('https://api.luxand.cloud/photo/detect', {
        method: 'POST',
        headers: { 'token': 'ad37885a36ac42fca9f052f1b0487520' },
        body: JSON.stringify({ photo: base64Image }),
      });
      const result = await response.json();
      console.log("Respuesta de la API de detección de rostros:", result);
      return result.faces?.length > 0;
    } catch (error) {
      console.error('Error en detección de rostro:', error);
      return false;
    }
  };

  const checkLiveness = async (base64Image) => {
    try {
      console.log("Enviando imagen a la API de verificación de vivacidad...");
      const formData = new FormData();
      formData.append('photo', {
        uri: `data:image/jpeg;base64,${base64Image}`,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('https://api.luxand.cloud/photo/liveness/v2', {
        method: 'POST',
        headers: { 'token': 'ad37885a36ac42fca9f052f1b0487520' },
        body: formData,
      });
      const result = await response.json();
      console.log("Respuesta de la API de vivacidad:", result);
      return result;
    } catch (error) {
      console.error('Error en verificación de vivacidad:', error);
      return { status: 'error' };
    }
  };

  const verifyBiometrics = async (base64Image) => {
    try {
      console.log("Enviando imagen a la API de verificación biométrica...");
      const response = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_img: imageRefBase64,
          target_img: base64Image,
          id: Math.random().toString(36).substr(2, 10),
        }),
      });
      const result = await response.json();
      console.log("Respuesta de la API biométrica:", result);
      return result;
    } catch (error) {
      console.error('Error en verificación biométrica:', error);
      return { match: false };
    }
  };

  const handleVerificationSuccess = () => {
    if (!isMounted.current) return;

    console.log("Verificación exitosa. Generando QR...");
    setQrData({
      cedula: "1234567890",
      nombre: "LARREA PAREDES DIEGO FRANCISCO",
      grado: "Teniente Coronel",
      caduca: "01/01/2030",
    });
  };

  const switchCamera = () => {
    console.log("Cambiando de cámara...");
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
            <Image 
              source={require('../public/img/imagenPrueba.jpg')} 
              style={styles.cardImage}
              resizeMode="contain" 
            />
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

        {!qrData && (
          <View style={styles.cameraContainer}>
            {showBorderAnimation && (
              <View style={styles.borderAnimationContainer}>
                <Lottie
                  source={require('../public/json/circuloAnimation.json')}
                  autoPlay
                  loop
                  style={styles.borderAnimation}
                />
              </View>
            )}

            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              enableTorch={false}
              frameProcessor={(frame) => {
                console.log("Frame recibido, timestamp:", frame.timestamp);
                processFrame(frame);
              }}
              frameProcessorFps={5}
              onCameraReady={() => console.log("Evento onCameraReady activado!")}
              focusDepth={0}
              autoFocus="on"
              zoom={0}
            />

            <TouchableOpacity
              style={miIdentidadEstilos.button}
              onPress={switchCamera}
            >
              <MaterialIcons name="switch-camera" size={28} color="white" />
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  cameraContainer: {
    height: 300,
    width: '90%',
    marginVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
    marginLeft: '5%',
  },
  camera: {
    flex: 1,
  },
  borderAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  borderAnimation: {
    width: '110%',
    height: '110%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default MiIdentidad;