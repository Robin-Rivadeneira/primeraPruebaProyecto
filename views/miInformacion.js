import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Button, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';

// Componentes SVG
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import LogoEjercito from "../public/img/ejercito.svg";

// Estilos
import menuEstilos from '../public/css/menu';
import miIdentidadEstilos from '../public/css/miIdentidad';
import identidadInicialEstilos from '../public/css/identidad';

const { width, height } = Dimensions.get('window');

const MiIdentidad = () => {
  const cameraRef = useRef(null);
  const [qrData, setQrData] = useState(null);
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageRefBase64, setImageRefBase64] = useState(null);
  const [showBiometricAnimation, setShowBiometricAnimation] = useState(true);
  const [showCircleAnimation, setShowCircleAnimation] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const isMounted = useRef(true);
  const validationInterval = useRef(null);
  const [isVerificationActive, setIsVerificationActive] = useState(false);

  // ================================================================
  // MÉTODOS PARA SILENCIO ABSOLUTO
  // ================================================================
  const silenceSystemCompletely = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        volume: 0, // Volumen en 0 para silenciar completamente
      });

      if (Platform.OS === 'android') {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'sounds/', { intermediates: true });
        await FileSystem.writeAsStringAsync(
          FileSystem.documentDirectory + 'sounds/silent.mp3',
          'dummy',
          { encoding: FileSystem.EncodingType.UTF8 }
        );
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.log("Error en configuración de silencio:", error);
    }
  };

  const restoreSystemAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
      shouldDuckAndroid: false,
      volume: 1,
    });
  };

  // ================================================================
  // CAPTURA SILENCIOSA DE FOTOS
  // ================================================================
  const captureSilentPhoto = async () => {
    try {
      await silenceSystemCompletely();

      const photoConfig = {
        quality: 0.8,
        base64: true,
        exif: false,
        sound: false, // Desactiva el sonido de la cámara
        pauseAfterCapture: true,
        mirror: false,
        ...(Platform.OS === 'android' && {
          disableShutterSound: true, // Desactiva el sonido del obturador en Android
          skipProcessing: false,
        }),
      };

      if (!cameraRef.current) {
        throw new Error("Cámara no inicializada");
      }

      const photo = await cameraRef.current.takePictureAsync(photoConfig);
      return photo;
    } catch (error) {
      console.log("Error en captura silenciosa:", error);
      throw error;
    } finally {
      await restoreSystemAudio();
    }
  };

  // ================================================================
  // FUNCIONALIDAD PRINCIPAL
  // ================================================================
  const showErrorAlert = (message) => {
    if (qrData) return; // No mostrar alertas si ya se generó el QR

    Alert.alert(
      "Error de verificación",
      message,
      [
        {
          text: "Reintentar",
          onPress: () => restartVerificationProcess(),
        },
      ],
      { cancelable: false }
    );
  };

  const restartVerificationProcess = () => {
    console.log("🔄 Reiniciando proceso...");
    setIsVerificationActive(false);
    setShowBiometricAnimation(true);
    setShowCircleAnimation(false);
    setValidationAttempts(0);
    clearInterval(validationInterval.current);
  };

  useEffect(() => {
    const initializeComponent = async () => {
      console.log("[1/5] 🚀 Inicializando componente");
      await silenceSystemCompletely();
      await loadReferenceImage();
    };

    initializeComponent();

    return () => {
      isMounted.current = false;
      clearInterval(validationInterval.current);
      restoreSystemAudio();
      console.log("[1/5] 🚀 Componente desmontado");
    };
  }, []);

  useEffect(() => {
    if (qrData) {
      console.log("[5/5] 🎉 QR generado con éxito");
      setShowCircleAnimation(false);
      setShowBiometricAnimation(false);
      clearInterval(validationInterval.current);
    }
  }, [qrData]);

  const loadReferenceImage = async () => {
    try {
      console.log("[1/5] 📂 Cargando imagen de referencia...");
      const asset = Asset.fromModule(require('../public/img/prueba2.jpeg'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageRefBase64(base64);
      console.log("[1/5] ✅ Imagen cargada");
    } catch (error) {
      console.error('[1/5] ❌ Error cargando imagen:', error);
      showErrorAlert("Error cargando imagen de referencia");
    }
  };

  const startVerification = async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsVerificationActive(true);
    console.log("[2/5] 🚦 Iniciando verificación...");
    setShowBiometricAnimation(false);
    setShowCircleAnimation(true);

    validationInterval.current = setInterval(async () => {
      if (!isProcessing && !qrData && isMounted.current) {
        try {
          console.log(`[3/5] 📸 Intento #${validationAttempts + 1}`);
          setIsProcessing(true);

          const photo = await captureSilentPhoto();
          console.log("[3/5] ✅ Foto capturada:", photo.uri.substring(0, 30) + '...');
          setValidationAttempts(prev => prev + 1);

          const success = await processImageSilently(photo.base64);
          if (success) {
            handleVerificationSuccess();
            clearInterval(validationInterval.current);
          } else {
            showErrorAlert("Enfoque mejor su rostro");
          }

        } catch (error) {
          console.log("[4/5] ⚠️ Error en captura:", error.message);
          showErrorAlert("Error al capturar imagen");
        } finally {
          setIsProcessing(false);
        }
      }
    }, 5000);
  };

  const processImageSilently = async (base64Image) => {
    try {
      console.log("[4/5] 🔍 Procesando imagen...");

      const hasFace = await checkFace(base64Image);
      if (!hasFace) return false;

      const livenessResult = await checkLiveness(base64Image);
      if (livenessResult.result !== "real") return false;

      const biometricResult = await verifyBiometrics(base64Image);
      return biometricResult.match;

    } catch (error) {
      console.log("[4/5] ⚠️ Error en procesamiento:", error);
      return false;
    }
  };

  const checkFace = async (base64Image) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: `data:image/jpeg;base64,${base64Image}`,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('https://api.luxand.cloud/photo/detect', {
        method: 'POST',
        headers: {
          'token': 'ad37885a36ac42fca9f052f1b0487520',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      return Array.isArray(result) && result.length > 0;
    } catch (error) {
      console.log("❌ Error en detección de rostro:", error);
      return false;
    }
  };

  const checkLiveness = async (base64Image) => {
    try {
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
      return await response.json();
    } catch (error) {
      console.log("❌ Error en vivacidad:", error);
      return { status: 'error' };
    }
  };

  const verifyBiometrics = async (base64Image) => {
    try {
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
      return { match: result.is_same_person };
    } catch (error) {
      console.log("❌ Error en biometría:", error);
      return { match: false };
    }
  };

  const handleVerificationSuccess = () => {
    if (!isMounted.current) return;
    console.log("[5/5] 🎉¡Verificación exitosa!");
    setIsVerificationActive(false);
    setQrData({
      cedula: "1234567890",
      nombre: "LARREA PAREDES DIEGO FRANCISCO",
      grado: "Teniente Coronel",
      caduca: "01/01/2030",
    });
  };

  const switchCamera = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={miIdentidadEstilos.container}>
        <Text style={miIdentidadEstilos.message}>Permisos de cámara requeridos</Text>
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
                enableTorch={false} // Desactiva el flash
                pictureSize="3840x2160"
                useCamera2Api={true}
              />
            </View>

            <TouchableOpacity
              style={styles.switchCameraButton}
              onPress={switchCamera}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.startButton,
                isVerificationActive && styles.disabledButton
              ]}
              onPress={startVerification}
              disabled={isVerificationActive}
            >
              <Text style={styles.startButtonText}>
                {isVerificationActive ? "VERIFICANDO..." : "INICIAR VERIFICACIÓN"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {qrData && (
          <View style={[miIdentidadEstilos.qrContainer, styles.qrBorder]}>
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
    width: '70%',
    marginLeft: '15%',
    marginVertical: 20,
  },
  cameraContainer: {
    height: height * 0.3,
    borderRadius: 1000,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderWidth: 3,
    borderColor: '#2c3e50',
    elevation: 5,
  },
  camera: {
    flex: 1,
  },
  borderAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  borderAnimation: {
    width: '120%',
    height: '120%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  startButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#6c7c8c',
    opacity: 0.7,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchCameraButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 1000,
    elevation: 3,
  },
  qrBorder: {
    borderWidth: 3,
    borderColor: '#2c3e50',
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default MiIdentidad;