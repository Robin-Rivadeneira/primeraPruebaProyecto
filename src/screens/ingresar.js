import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../assets/img/goIdentity.svg";
import InstitutoSVG from "../assets/img/instituto.svg";
import UsuarioSvg from "../assets/img/usuarios.svg";
import LogoEjercito from "../assets/img/ejercito.svg";
import FondoQrSvg from "../assets/img/fondoQr.svg";
import menuEstilos from '../../assets/css/menu';
import identidadInicialEstilos from '../../assets/css/identidad';

const Ingresar = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleCameraToggle = () => {
        setIsCameraVisible(!isCameraVisible);
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={menuEstilos.container}
        >
            {/* Título "Ingresar" */}
            <View style={identidadInicialEstilos.header}>
                <GoIdentitySVG style={identidadInicialEstilos.logo} />
                <Text style={styles.title}>Ingresar</Text>
            </View>

            {/* Iconos de las vistas anteriores */}
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <InstitutoSVG width={50} height={50} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <UsuarioSvg width={50} height={50} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <LogoEjercito width={50} height={50} />
                </TouchableOpacity>
            </View>

            {/* Cámara en un círculo */}
            <View style={styles.cameraCircleContainer}>
                {isCameraVisible ? (
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                    />
                ) : (
                    <TouchableOpacity style={styles.cameraPlaceholder} onPress={handleCameraToggle}>
                        <Text style={styles.cameraPlaceholderText}>Activar Cámara</Text>
                    </TouchableOpacity>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginVertical: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraCircleContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    cameraPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraPlaceholderText: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: 'bold',
    },
});

export default Ingresar;