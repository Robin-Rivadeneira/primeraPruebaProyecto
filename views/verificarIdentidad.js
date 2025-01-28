import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.jpeg";
import LogoEjercito from "../public/img/ejercito.png";
import { RNCamera } from 'react-native-camera';
import menuEstilos from '../public/css/menu';

export default function VerificarIdentidad() {
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Código de barra ${type} con datos ${data} ha sido escaneado!`);
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={menuEstilos.container}
        >
            {/* QR Code Scanner */}
            <RNCamera
                style={styles.camera}
                onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
                type={RNCamera.Constants.Type.back}
            />
            {scanned && (
                <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
                    <Text style={styles.buttonText}>Escanear nuevamente</Text>
                </TouchableOpacity>
            )}

            {/* Header */}
            <View style={menuEstilos.header}>
                <GoIdentitySVG style={menuEstilos.logo} />
            </View>

            {/* Title */}
            <Text style={menuEstilos.title}>Verificar Identidad</Text>

            {/* ID Card */}
            <View style={menuEstilos.card}>
                <View style={menuEstilos.cardHeader}>
                    <Text style={menuEstilos.cardTitle}>ISSFA</Text>
                </View>
                <View style={menuEstilos.cardContent}>
                    <View>
                        <Image source={UsuarioSvg} />
                    </View>
                    <View style={menuEstilos.cardInfo}>
                        <View style={menuEstilos.imagenCard}>
                            <Image source={LogoEjercito} style={menuEstilos.logosEjercito} />
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
}

const styles = StyleSheet.create({
    camera: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});