import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg"
import FondoQrSvg from "../public/img/fondoQr.svg"
import menuEstilos from '../public/css/menu';
import identidadInicialEstilos from '../public/css/identidad';

const QRScanner = () => {
    const [qrData, setQrData] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
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
                "QR Detectado",
                `Datos: ${data}`,
                [{ text: "OK", onPress: () => setQrData(null) }]
            );
        }
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

            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                >
                </CameraView>
            </View>

            <View style={menuEstilos.card}>
                <View style={menuEstilos.cardHeader}>
                    <Text style={menuEstilos.cardTitle}>ISSFA</Text>
                </View>
                <View style={menuEstilos.cardContent}>
                    <View style={menuEstilos.cardImagen}>
                        <UsuarioSvg width='100%' height="100%" />
                    </View>
                    <View style={menuEstilos.cardInfo}>
                        <View style={menuEstilos.imagenCard}>
                            <LogoEjercito width='100%' height="100%" />
                        </View>
                        <View style={menuEstilos.subida}>
                            <Text style={menuEstilos.cardText}>CÉDULA:</Text>
                            <Text style={menuEstilos.cardTexts}>1234567890</Text>
                            <Text style={menuEstilos.cardText}>LARREA PAREDES DIEGO FRANCISCO</Text>
                            <Text style={menuEstilos.cardText}>GRADO:</Text>
                            <Text style={menuEstilos.cardTexts}>Teniente Coronel</Text>
                            <Text style={menuEstilos.cardText}>CADUCA:</Text>
                            <Text style={menuEstilos.cardTexts}>01/01/2030</Text>
                        </View>
                        <View style={menuEstilos.imagenCards}>
                            <InstitutoSVG width='100%' height="100%" />
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '60%', // Tamaño reducido
        aspectRatio: 1,
        borderRadius: 100, // Borde redondeado
        overflow: 'hidden',
        marginVertical: 20,
        alignSelf: 'center',
        // Sombra para efecto de profundidad
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
        // Borde decorativo
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Fondo semitransparente
        padding: 20 // Espacio interno
    }
});

export default QRScanner;