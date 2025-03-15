import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Lottie from 'lottie-react-native';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import InstitutoSVG from "../../assets/img/instituto.svg";
import LogoEjercito from "../../assets/img/ejercito.svg";
import menuEstilos from '../../assets/css/menu';
import identidadInicialEstilos from '../../assets/css/identidad';
import pasarelaEsitlos from '../../assets/css/pasarela';
import BerficarEstilos from '../../assets/css/verificar';
import { getQrIdormationData } from '../services/verificarIdentidad.Service'; // Asegúrate de tener la ruta correcta

const QRScanner = () => {
  const [qrData, setQrData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = async ({ data }) => {
    try {
      if (!data || data === qrData) return;

      setLoading(true);
      setError(null);
      setUserData(null);

      // Decodificar datos del QR
      const parsedData = JSON.parse(data);

      if (!parsedData.idIdentidad) {
        throw new Error('QR inválido: Falta idIdentidad');
      }

      // Obtener datos del servicio
      const responseData = await getQrIdormationData(parsedData.idIdentidad);

      setUserData(responseData);
      setQrData(data);

    } catch (error) {
      setError(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPress = () => {
    setIsCameraVisible(true);
    setQrData(null);
    setUserData(null);
    setError(null);
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
        <TouchableOpacity
          style={BerficarEstilos.verifyButton}
          onPress={handleVerifyPress}
          disabled={loading}
        >
          <LinearGradient
            colors={['#e5ecfd', '#bdccf4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={pasarelaEsitlos.gradientButton}
          >
            <Text style={BerficarEstilos.verifyButtonText}>
              {loading ? 'CARGANDO...' : 'VERIFICAR'}
            </Text>
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

          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.overlayText}>Validando datos...</Text>
            </View>
          )}

          <View style={BerficarEstilos.animationContainer}>
            <Lottie
              source={require('../../assets/json/qrAnimacion.json')}
              autoPlay
              loop
              style={BerficarEstilos.animation}
            />
            <Text style={BerficarEstilos.scanningText}>Escaneando...</Text>
          </View>
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {userData && (
        <View style={menuEstilos.card}>
          <View style={menuEstilos.cardHeader}>
            <Text style={menuEstilos.cardTitle}>ISSFA</Text>
          </View>

          <View style={menuEstilos.cardContent}>
            <View style={menuEstilos.cardImagen}>
              <Image
                source={{ uri: `data:image/png;base64,${userData.imagenTarjeta}` }}
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
                  <Text style={{ fontWeight: 'bold' }}>CÉDULA:</Text> {userData.cedula}
                </Text>
                <Text style={menuEstilos.cardText}>{userData.nombre}</Text>
                <Text style={menuEstilos.cardText}>
                  <Text style={{ fontWeight: 'bold' }}>GRADO:</Text> {userData.grado}
                </Text>
                <Text style={menuEstilos.cardText}>
                  <Text style={{ fontWeight: 'bold' }}>CADUCA:</Text> {userData.caduca}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  overlayText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  }
});

export default QRScanner;