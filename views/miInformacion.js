import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Button } from 'react-native'; // Asegúrate de importar Button
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
  const [showBiometricAnimation, setShowBiometricAnimation] = useState(true);
  const [showCircleAnimation, setShowCircleAnimation] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const isMounted = useRef(true);
  const validationInterval = useRef(null);

  // Función para mostrar alerta de error
  const showErrorAlert = (message) => {
    Alert.alert(
      "Error de verificación",
      message,
      [
        {
          text: "Reintentar",
          onPress: () => restartVerificationProcess(), // Reiniciar el proceso
        },
      ],
      { cancelable: false }
    );
  };

  // Función para reiniciar el proceso de verificación
  const restartVerificationProcess = () => {
    console.log("🔄 Reiniciando proceso de verificación...");
    setShowStartButton(true);
    setShowBiometricAnimation(true);
    setShowCircleAnimation(false);
    setValidationAttempts(0);
    clearInterval(validationInterval.current);
  };

  useEffect(() => {
    console.log("[1/5] 🚀 Componente montado");
    loadReferenceImage();

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

  useEffect(() => {
    if (validationAttempts > 0 && validationAttempts % 2 === 0) {
      console.log("🔄 Reiniciando cámara para evitar sonidos...");
      cameraRef.current?.pausePreview();
      setTimeout(() => {
        if (isMounted.current) cameraRef.current?.resumePreview();
      }, 500);
    }
  }, [validationAttempts]);

  const loadReferenceImage = async () => {
    try {
      console.log("[1/5] 📂 Cargando imagen de referencia...");
      const asset = Asset.fromModule(require('../public/img/prueba2.jpeg'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImageRefBase64(base64);
      console.log("[1/5] ✅ Imagen de referencia cargada");
    } catch (error) {
      console.error('[1/5] ❌ Error cargando imagen:', error);
      showErrorAlert("Hubo un error al cargar la imagen de referencia. Por favor, reintente.");
    }
  };

  const startVerification = async () => {
    if (!cameraRef.current || isProcessing) return;

    console.log("[2/5] 🚦 Iniciando verificación...");
    setShowStartButton(false);
    setShowBiometricAnimation(false);
    setShowCircleAnimation(true);

    validationInterval.current = setInterval(async () => {
      if (!isProcessing && !qrData && isMounted.current) {
        try {
          console.log(`[3/5] 📸 Intento de captura #${validationAttempts + 1}`);
          setIsProcessing(true);

          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            base64: true,
            skipProcessing: true,
            exif: false,
            sound: false,
            pauseAfterCapture: true,
            mirror: false,
            androidCameraPermissionOptions: {
              title: 'Permiso de cámara',
              message: 'Necesitamos acceso para la verificación',
              buttonPositive: 'Aceptar',
              buttonNegative: 'Cancelar'
            }
          });

          console.log("[3/5] ✅ Foto capturada:", photo.uri.substring(0, 50) + '...');
          setValidationAttempts(prev => prev + 1);

          const success = await processImageSilently(photo.base64);

          if (success) {
            handleVerificationSuccess();
          } else {
            console.log("[4/5] ❌ Fallo en validación, reintentando...");
            showErrorAlert("Por favor, enfoque bien su rostro en la cámara.");
          }

        } catch (error) {
          console.log("[4/5] ⚠️ Error en captura:", error.message);
          showErrorAlert("Hubo un error al capturar la imagen. Por favor, reintente.");
        } finally {
          setIsProcessing(false);
        }
      }
    }, 5000);
  };

  const processImageSilently = async (base64Image) => {
    try {
      console.log("[4/5] 🔍 Procesando imagen...");

      console.log("   └─ [Paso 1/3] Detectando rostro...");
      const hasFace = await checkFace(base64Image);
      console.log(`   └─ [Paso 1/3] ${hasFace ? '✅ Rostro detectado' : '❌ Sin rostro detectado'}`);
      if (!hasFace) {
        showErrorAlert("No se detectó un rostro. Por favor, enfoque bien su rostro en la cámara.");
        return false;
      }

      console.log("   └─ [Paso 2/3] Verificando vivacidad...");
      const livenessResult = await checkLiveness(base64Image);
      console.log(`   └─ [Paso 2/3] Vivacidad: ${livenessResult.result}`);
      if (livenessResult.result !== "real") {
        showErrorAlert("La verificación de vivacidad falló. Por favor, reintente.");
        return false;
      }

      console.log("   └─ [Paso 3/3] Comparando biometría...");
      const biometricResult = await verifyBiometrics(base64Image);
      console.log(`   └─ [Paso 3/3] Coincidencia: ${biometricResult.match ? '✅ Éxito' : '❌ Fallo'}`);
      return biometricResult.match;

    } catch (error) {
      console.log("[4/5] ⚠️ Error en procesamiento:", error.message);
      showErrorAlert("Hubo un error al procesar la imagen. Por favor, reintente.");
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
      console.log(result);
      return Array.isArray(result) && result.length > 0;
    } catch (error) {
      console.log("   └─ ❌ Error en detección de rostro:", error);
      showErrorAlert("Hubo un error al detectar el rostro. Por favor, reintente.");
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
      const livenessResult = await response.json();

      console.log("   └─ [Paso 2/3] Vivacidad:", livenessResult);
      return livenessResult;
    } catch (error) {
      console.log("   └─ ❌ Error en vivacidad:", error);
      showErrorAlert("Hubo un error al verificar la vivacidad. Por favor, reintente.");
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
      console.log("   └─ ❌ Error en biometría:", error.message);
      showErrorAlert("Hubo un error al verificar la biometría. Por favor, reintente.");
      return { match: false };
    }
  };

  const handleVerificationSuccess = () => {
    if (!isMounted.current) return;
    console.log("[5/5] 🎉¡Verificación exitosa! Mostrando QR...");
    setQrData({
      cedula: "1234567890",
      nombre: "LARREA PAREDES DIEGO FRANCISCO",
      grado: "Teniente Coronel",
      caduca: "01/01/2030",
    });
  };

  const switchCamera = () => {
    console.log("🔄 Cambiando cámara a", facing === 'back' ? 'frontal' : 'trasera');
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  if (!permission) return <View />;

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
                pictureSize="3840x2160"
                useCamera2Api={true}
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
                    <Text style={styles.startButtonText}>INICIAR VERIFICACIÓN</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.switchCameraButton}
              onPress={switchCamera}
            >
              <MaterialIcons name="switch-camera" size={28} color="white" />
              <Text style={styles.switchCameraButtonText}>CAMBIAR CÁMARA</Text>
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
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
  },
  cameraContainer: {
    height: 300,
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
  startButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 3,
  },
  preparationText: {
    color: 'white',
    fontSize: 20,
    width: '70%',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginLeft:'15%'
  },
  startButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15,
    textAlign:'center',
    borderRadius: 30,
    elevation: 5,
    width:'60%',
    marginLeft:'20%',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    width:'100%',
    textAlign:'center',
  },
  switchCameraButton: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    elevation: 3,
  },
  switchCameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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