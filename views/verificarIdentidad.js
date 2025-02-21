import React, { useState, useEffect, useRef } from 'react'; // Importa useEffect correctamente
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg";
import FondoQrSvg from "../public/img/fondoQr.svg";
import menuEstilos from '../public/css/menu';
import identidadInicialEstilos from '../public/css/identidad';
import pasarelaEsitlos from '../public/css/pasarela';

const QRScanner = () => {
  const [qrData, setQrData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }) => {
    if (data && data !== qrData) {
      setQrData(data);
      setIsCameraVisible(false);
      Alert.alert(
        "QR Escaneado",
        `Datos: ${data}`,
        [{ text: "OK", onPress: () => setQrData(null) }]
      );
    }
  };

  const handleVerifyPress = () => {
    setIsCameraVisible(true);
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

      <Text style={styles.title}>Verificar Identidad</Text>

      {!isCameraVisible && (
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyPress}>
          <LinearGradient
            colors={['#e5ecfd', '#bdccf4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={pasarelaEsitlos.gradientButton}
          >
            <Text style={styles.verifyButtonText}>Verificar</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {isCameraVisible && (
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarcodeScanned}
          />
        </View>
      )}

      {qrData && (
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
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A6289',
    textAlign: 'center',
    marginVertical: 20,
  },
  verifyButton: {
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    width: '80%',
  },
  verifyButtonText: {
    color: '#5b749e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '60%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)'
  },
});

export default QRScanner;