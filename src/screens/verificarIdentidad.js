import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Lottie from 'lottie-react-native'; // Importa Lottie para la animación
import GoIdentitySVG from "../assets/img/goIdentity.svg";
import InstitutoSVG from "../assets/img/instituto.svg";
import UsuarioSvg from "../assets/img/usuarios.svg";
import LogoEjercito from "../assets/img/ejercito.svg";
import FondoQrSvg from "../assets/img/fondoQr.svg";
import menuEstilos from '../../assets/css/menu';
import identidadInicialEstilos from '../../assets/css/identidad';
import pasarelaEsitlos from '../../assets/css/pasarela';
import BerficarEstilos from '../../assets/css/verificar';

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
      Alert.alert(
        "QR Escaneado",
        `Datos: ${data}`,
        [{ text: "OK", onPress: () => { } }]
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

      <Text style={BerficarEstilos.title}>Verificar Identidad</Text>

      {!isCameraVisible && (
        <TouchableOpacity style={BerficarEstilos.verifyButton} onPress={handleVerifyPress}>
          <LinearGradient
            colors={['#e5ecfd', '#bdccf4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={pasarelaEsitlos.gradientButton}
          >
            <Text style={BerficarEstilos.verifyButtonText}>Verificar</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {isCameraVisible && (
        <View style={BerficarEstilos.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarcodeScanned}
          />

          {/* Animación de escaneo de QR */}
          <View style={BerficarEstilos.animationContainer}>
            <Lottie
              source={require('../../assets/json/qrAnimacion.json')} // Ruta de la animación
              autoPlay
              loop
              style={BerficarEstilos.animation}
            />
            <Text style={BerficarEstilos.scanningText}>Escaneando...</Text>
          </View>
        </View>
      )}

      {qrData && (
        <View style={styles.cardContainer}>
          <View style={menuEstilos.card}>
            <View style={menuEstilos.cardHeader}>
              <Text style={menuEstilos.cardTitle}>ISSFA</Text>
            </View>

            <View style={menuEstilos.cardContent}>
              <View style={menuEstilos.cardImagen}>
                <Image source={require('../assets/img/imagenPrueba.jpg')} style={{
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
        </View>
      )}
    </LinearGradient>
  );
};

export default QRScanner;