import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Lottie from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';

// Componentes SVG
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import InstitutoSVG from "../../assets/img/instituto.svg";
import LogoEjercito from "../../assets/img/ejercito.svg";

// Estilos
import menuEstilos from '../../assets/css/menu';
import miIdentidadEstilos from '../../assets/css/miIdentidad';
import identidadInicialEstilos from '../../assets/css/identidad';

// Funciones y datos de configuración
import {
  loadReferenceImage,
  extractFramesFromVideo,
  checkFace,
  checkLiveness,
  verifyBiometrics,
  getQRData,
} from '../services/miIdentidadConfig.Service.js';
import { getMenuData } from '../services/menu.Service';


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

  const [menuData, setMenuData] = useState({
    cedula: '1713489514',
    nombre: 'Gerald Orlando Moreno Jadan',
    grado: 'Teniente Coronel',
    caduca: '01/01/2030',
    imagenPerfil: '',
    imagenTarjeta: '',
  });

  const checkPermissions = async () => {
    const cameraStatus = await requestPermission();
    const microphoneStatus = await requestMicrophonePermission();
    return cameraStatus.granted && microphoneStatus.granted;
  };

  const captureVideo = async () => {
    try {
      if (!cameraRef.current) throw new Error("Cámara no inicializada");
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

  const showErrorAlert = (message) => {
    if (qrData) return;
    Alert.alert("Error de verificación", message, [
      { text: "Reintentar", onPress: () => restartVerificationProcess() },
    ], { cancelable: false });
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
        Alert.alert("Permisos requeridos", "Necesitamos acceso a la cámara y micrófono para continuar.", [{ text: "OK" }]);
        return;
      }
      const base64 = await loadReferenceImage();
      setImageRefBase64(base64);
    };

    initializeComponent();

    const loadMenuData = async () => {
      try {
        const data = await getMenuData();
        setMenuData(data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos del menú.');
      }
    };
    loadMenuData();

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

      for (const frame of frames) {
        console.log("[4/5] 🔍 Verificando rostro...");
        const faceDetection = await checkFace(frame);
        if (faceDetection.success) {
          validFrame = frame;
          break;
        }
      }

      if (!validFrame) throw new Error("No se encontró un frame válido con rostro detectado");
      console.log("[4/5] ✅ Frame válido encontrado");

      console.log("[4/5] 🔍 Verificando vivacidad...");
      const livenessResult = await checkLiveness(validFrame);
      if (livenessResult.result !== "real") throw new Error("Prueba de vivacidad fallida");

      console.log("[4/5] 🔍 Verificando biometría...");
      const biometricResult = await verifyBiometrics(menuData.imagenTarjeta, validFrame);
      if (biometricResult.match == false) {
        console.error("Error en verificación biométrica:", biometricResult.error);
        throw new Error("Verificación biométrica fallida", biometricResult.error);
      }

      verificationSuccess = true;

      if (verificationSuccess) handleVerificationSuccess();
      else showErrorAlert("No se pudo verificar en ningún frame");
    } catch (error) {
      console.log("[4/5] ⚠️ Error en verificación:", error.message);
      showErrorAlert(error.message);
    } finally {
      setIsProcessing(false);
      setShowCircleAnimation(false);
    }
  };

  const handleVerificationSuccess = async () => {
    if (!isMounted.current) return;
    console.log("[5/5] 🎉¡Verificación exitosa!");
    setIsVerificationActive(false);

    try {
      const qrData = await getQRData(); // Obtiene los datos del QR
      setQrData(qrData); // Establece los datos en el estado
    } catch (error) {
      console.error("Error al obtener los datos del QR:", error);
      showErrorAlert("Error al generar el código QR. Intente nuevamente.");
    }
  };

  const switchCamera = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  if (!permission) return <View />;

  if (!permission?.granted || !microphonePermission?.granted) {
    return (
      <View style={miIdentidadEstilos.container}>
        <Text style={miIdentidadEstilos.message}>Necesitamos acceso a:</Text>
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
              source={{ uri: `data:image/png;base64,${menuData.imagenTarjeta}` }}
              width='100%' height="100%"
              resizeMode="contain"
            />
          </View>

          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <LogoEjercito width='100%' height="100%" />
            </View>

            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>CÉDULA:</Text> {menuData.cedula}
              </Text>
              <Text style={menuEstilos.cardText}>{menuData.nombre}</Text>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>GRADO:</Text> {menuData.grado}
              </Text>
              <Text style={menuEstilos.cardText}>
                <Text style={{ fontWeight: 'bold' }}>CADUCA:</Text> {menuData.caduca}
              </Text>
            </View>

            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>

        {!qrData && (
          <View style={miIdentidadEstilos.cameraSection}>
            <View style={miIdentidadEstilos.cameraContainer}>
              {showBiometricAnimation && (
                <View style={miIdentidadEstilos.borderAnimationContainer}>
                  <Lottie
                    source={require('../../assets/json/biometrica.json')}
                    autoPlay
                    loop
                    style={miIdentidadEstilos.borderAnimation}
                  />
                </View>
              )}

              {showCircleAnimation && (
                <View style={miIdentidadEstilos.borderAnimationContainer}>
                  <Lottie
                    source={require('../../assets/json/circuloAnimation.json')}
                    autoPlay
                    loop
                    style={miIdentidadEstilos.borderAnimation}
                  />
                </View>
              )}

              <CameraView
                ref={cameraRef}
                style={miIdentidadEstilos.camera}
                facing={facing}
                enableTorch={false}
                pictureSize="3840x2160"
                useCamera2Api={true}
                mode="video"
              />
            </View>

            <TouchableOpacity
              style={miIdentidadEstilos.switchCameraButton}
              onPress={switchCamera}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                miIdentidadEstilos.startButton,
                isVerificationActive && miIdentidadEstilos.disabledButton
              ]}
              onPress={startVerification}
              disabled={isVerificationActive}
            >
              <Text style={miIdentidadEstilos.startButtonText}>
                {isVerificationActive ? "VERIFICANDO..." : "INICIAR VERIFICACIÓN"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {qrData && (
          <View style={[miIdentidadEstilos.qrContainer, miIdentidadEstilos.qrBorder]}>
            <QRCode
              value={JSON.stringify(qrData)} // Convierte el objeto a JSON
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