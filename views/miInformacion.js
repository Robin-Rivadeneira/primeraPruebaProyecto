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
  const [showBiometricAnimation, setShowBiometricAnimation] = useState(true); // Animación de biometría
  const [showCircleAnimation, setShowCircleAnimation] = useState(false); // Animación del círculo
  const [showStartButton, setShowStartButton] = useState(true); // Mostrar botón "Iniciar" inicialmente
  const isMounted = useRef(true);
  const [frameReceived, setFrameReceived] = useState(false);

  useEffect(() => {
    console.log("1. Componente montado");
    loadReferenceImage();

    return () => {
      isMounted.current = false;
      console.log("Componente desmontado");
    };
  }, []);

  // Efecto para depurar el estado qrData
  useEffect(() => {
    if (qrData) {
      console.log("QR Data actualizado:", qrData);
      // Detener todas las animaciones al mostrar el QR
      setShowCircleAnimation(false);
      setShowBiometricAnimation(false);
    }
  }, [qrData]);

  const loadReferenceImage = async () => {
    try {
      console.log("Cargando imagen de referencia...");
      const asset = Asset.fromModule(require('../public/img/prueba2.jpeg'));
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

  const startVerification = async () => {
    if (!cameraRef.current || isProcessing) return;

    try {
      setIsProcessing(true);
      setShowBiometricAnimation(false); // Ocultar animación de biometría
      setShowCircleAnimation(true); // Mostrar animación del círculo
      setShowStartButton(false); // Ocultar botón "Iniciar"

      // Capturar una foto manualmente
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      });

      console.log("Frame capturado manualmente:", photo.uri);
      await saveBase64Image(photo.base64); // Guardar la imagen para depuración
      await processImage(photo.base64); // Llamar a processImage
    } catch (error) {
      console.error("Error capturando frame manualmente:", error);
      Alert.alert('Error', 'No se pudo capturar el frame');
      resetUI(); // Restaurar animación y botón en caso de error
    }
  };

  const resetUI = () => {
    setIsProcessing(false);
    setShowBiometricAnimation(true); // Restaurar animación de biometría
    setShowCircleAnimation(false); // Ocultar animación del círculo
    setShowStartButton(true); // Restaurar botón "Iniciar"
  };

  const saveBase64Image = async (base64Image) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'debug_image.jpg';
      await FileSystem.writeAsStringAsync(fileUri, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Imagen guardada en:", fileUri);
    } catch (error) {
      console.error("Error guardando la imagen:", error);
    }
  };

  const processImage = async (base64Image) => {
    try {
      console.log("Procesando imagen capturada...");

      // 1. Detección de rostro
      console.log("Iniciando detección de rostro...");
      const hasFace = await checkFace(base64Image);
      if (!hasFace) throw new Error('No se detectó un rostro');
      console.log("Rostro detectado correctamente.");

      // 2. Verificación de vivacidad
      console.log("Iniciando verificación de vivacidad...");
      const livenessResult = await checkLiveness(base64Image);
      if (livenessResult.result !== "real") throw new Error('El rostro no parece ser real');
      console.log("Vivacidad verificada correctamente:", livenessResult);

      // 3. Comparación biométrica
      console.log("Iniciando comparación biométrica...");
      const biometricResult = await verifyBiometrics(base64Image);
      if (!biometricResult.match) throw new Error('No coincide con la referencia');
      console.log("Comparación biométrica exitosa:", biometricResult);

      // Éxito en la verificación
      handleVerificationSuccess();
    } catch (error) {
      console.error("Error en processImage:", error);
      Alert.alert('Error', error.message);
      resetUI(); // Restaurar animación y botón en caso de error
    }
  };

  const checkFace = async (base64Image) => {
    try {
      console.log("Enviando imagen a la API de detección de rostros...");

      const formData = new FormData();
      formData.append('photo', {
        uri: `data:image/jpeg;base64,${base64Image}`,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('https://api.luxand.cloud/photo/detect', {
        method: 'POST',
        headers: {
          'token': 'ad37885a36ac42fca9f052f1b0487520', // Reemplaza con tu token
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Respuesta de la API de detección de rostros:", result);

      // Verificar si la respuesta es un array y tiene al menos un elemento
      if (Array.isArray(result) && result.length > 0) {
        console.log("Rostro detectado correctamente.");
        return true; // Hay al menos un rostro detectado
      } else {
        throw new Error('No se detectó un rostro');
      }
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
      
      return {
        match: result.is_same_person, // Usar la propiedad correcta de la respuesta
        similarity: result.similarity
      };
    } catch (error) {
      console.error('Error en verificación biométrica:', error);
      return { match: false };
    }
  };

  const handleVerificationSuccess = () => {
    try {
      if (!isMounted.current) return;

      console.log("Verificación exitosa. Generando QR...");
      
      // Forzar una actualización del estado
      setQrData(null); // Resetear primero
      setTimeout(() => {
        setQrData({
          cedula: "1234567890",
          nombre: "LARREA PAREDES DIEGO FRANCISCO",
          grado: "Teniente Coronel",
          caduca: "01/01/2030",
        });
      }, 100);
      
    } catch (error) {
      console.error("Error en handleVerificationSuccess:", error);
    }
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
          <View style={styles.cameraSection}>
            <View style={styles.cameraContainer}>
              {showBiometricAnimation && (
                <View style={styles.borderAnimationContainer}>
                  <Lottie
                    source={require('../public/json/biometrica.json')}
                    autoPlay
                    loop
                    style={styles.borderAnimation}
                  />
                </View>
              )}

              {showCircleAnimation && (
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

              {showStartButton && (
                <View style={styles.startButtonContainer}>
                  <Text style={styles.preparationText}>
                    Prepárate para la verificación biométrica
                  </Text>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={startVerification}
                  >
                    <Text style={styles.startButtonText}>Iniciar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Botón para cambiar cámara */}
            <TouchableOpacity
              style={styles.switchCameraButton}
              onPress={switchCamera}
            >
              <MaterialIcons name="switch-camera" size={28} color="white" />
              <Text style={styles.switchCameraButtonText}>Cambiar cámara</Text>
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
  cameraSection: {
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
  },
  cameraContainer: {
    height: 300,
    borderRadius: 10000, // Bordes redondeados
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderWidth: 3, // Grosor del borde
    borderColor: '#2c3e50', // Color del borde
    elevation: 5,
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
  startButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 2, // Asegura que el texto y el botón estén sobre la animación
  },
  preparationText: {
    color: 'white',
    fontSize: 25,
    width: '50%',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchCameraButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  switchCameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MiIdentidad;