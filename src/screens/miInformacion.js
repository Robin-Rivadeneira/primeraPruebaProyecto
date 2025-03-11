import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Button, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';

// Componentes SVG
import GoIdentitySVG from "../assets/img/goIdentity.svg";
import InstitutoSVG from "../assets/img/instituto.svg";
import LogoEjercito from "../assets/img/ejercito.svg";

// Estilos
import menuEstilos from '../../assets/css/menu';
import miIdentidadEstilos from '../../assets/css/miIdentidad';
import identidadInicialEstilos from '../../assets/css/identidad';

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
  const [microphonePermission, requestMicrophonePermission] = Audio.usePermissions();

  const checkPermissions = async () => {
    // Verificar permisos de cámara
    const cameraStatus = await requestPermission();
    
    // Verificar permisos de micrófono
    const microphoneStatus = await requestMicrophonePermission();
    
    return cameraStatus.granted && microphoneStatus.granted;
  };

  // ================================================================
  // CAPTURA DE VIDEO
  // ================================================================
  const captureVideo = async () => {
    try {
      if (!cameraRef.current) {
        throw new Error("Cámara no inicializada");
      }

      const video = await cameraRef.current.recordAsync({
        maxDuration: 5,
        quality: '1080p',
      });

      return video;
    } catch (error) {
      console.log("Error en captura de video:", error);
      throw error;
    }
  };

  // ================================================================
  // FUNCIONALIDAD PRINCIPAL
  // ================================================================
  const showErrorAlert = (message) => {
    if (qrData) return;

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
      const hasPermissions = await checkPermissions();
      
      if (!hasPermissions) {
        Alert.alert(
          "Permisos requeridos",
          "Necesitamos acceso a la cámara y micrófono para continuar.",
          [{ text: "OK" }]
        );
        return;
      }
      
      await loadReferenceImage();
    };

    initializeComponent();

    return () => {
      isMounted.current = false;
      clearInterval(validationInterval.current);
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

  // Cargar la imagen de referencia como Base64
  const loadReferenceImage = async () => {
    try {

      const asset = Asset.fromModule(require('../assets/img/imagenPrueba1.png'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageRefBase64(base64);

    } catch (error) {
      console.error('Error cargando imagen:', error);
    }
  };

  const extractFramesFromVideo = async (videoUri) => {
    const frames = [];
    try {
      for (let time = 1; time <= 5; time++) {
        const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: time * 1000,
          quality: 0.8
        });
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        frames.push(base64);
      }
    } catch (error) {
      console.error("Error extrayendo frames:", error);
    }
    return frames;
  };

  const startVerification = async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsVerificationActive(true);
    console.log("[2/5] 🚦 Iniciando verificación...");
    setShowBiometricAnimation(false);
    setShowCircleAnimation(true);

    try {
      setIsProcessing(true);

      console.log("[3/5] 🎥 Grabando video...");
      const video = await captureVideo();
      console.log("[3/5] ✅ Video grabado:", video.uri);

      console.log("[4/5] 🖼️ Extrayendo frames...");
      const frames = await extractFramesFromVideo(video.uri);
      if (frames.length === 0) throw new Error("No se pudieron extraer frames");

      let verificationSuccess = false;
      let validFrame = null;

      // Primera pasada: Detección de rostro
      for (const frame of frames) {
        console.log("[4/5] 🔍 Verificando rostro...");
        const faceDetection = await checkFace(frame);
        if (faceDetection.success) {
          validFrame = frame;
          break;
        }
      }

      if (!validFrame) {
        throw new Error("No se encontró un frame válido con rostro detectado");
      }

      console.log("[4/5] ✅ Frame válido encontrado");

      // Segunda pasada: Vivacidad y biometría con el frame válido
      console.log("[4/5] 🔍 Verificando vivacidad...");
      const livenessResult = await checkLiveness(validFrame);
      if (livenessResult.result !== "real") {
        throw new Error("Prueba de vivacidad fallida");
      }

      console.log("[4/5] 🔍 Verificando biometría...");
      const biometricResult = await verifyBiometrics(validFrame);
      if (!biometricResult.match) {
        throw new Error("Verificación biométrica fallida");
      }

      verificationSuccess = true;

      if (verificationSuccess) {
        handleVerificationSuccess();
      } else {
        showErrorAlert("No se pudo verificar en ningún frame");
      }
    } catch (error) {
      console.log("[4/5] ⚠️ Error en verificación:", error.message);
      showErrorAlert(error.message);
    } finally {
      setIsProcessing(false);
      setShowCircleAnimation(false);
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
      console.log(result)
      return {
        success: Array.isArray(result) && result.length > 0,
        data: result
      };
    } catch (error) {
      console.log("❌ Error en detección de rostro:", error);
      return { success: false };
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
        headers: { 
          'token': 'ad37885a36ac42fca9f052f1b0487520',
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      });
      console.log(response.json())
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
      console.log(result)
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

  if (!permission?.granted || !microphonePermission?.granted) {
    return (
      <View style={miIdentidadEstilos.container}>
        <Text style={miIdentidadEstilos.message}>
          Necesitamos acceso a:
        </Text>
        <Text style={miIdentidadEstilos.permissionItem}>🎥 Cámara</Text>
        <Text style={miIdentidadEstilos.permissionItem}>🎤 Micrófono</Text>
        <Button 
          title="Otorgar permisos" 
          onPress={() => {
            requestPermission();
            requestMicrophonePermission();
          }} 
        />
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
              source={require('../assets/img/imagenPrueba.jpg')} 
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
                    source={require('../../assets/json/biometrica.json')}
                    autoPlay
                    loop
                    style={styles.borderAnimation}
                  />
                </View>
              )}

              {showCircleAnimation && (
                <View style={styles.borderAnimationContainer}>
                  <Lottie
                    source={require('../../assets/json/circuloAnimation.json')}
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
                mode="video"
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