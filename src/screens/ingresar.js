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
import ingresarEstilos from '../../assets/css/ingresar';

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
                <Text style={ingresarEstilos.title}>Ingresar</Text>
            </View>

            {/* Iconos de las vistas anteriores */}
            <View style={ingresarEstilos.iconContainer}>
                <TouchableOpacity style={ingresarEstilos.iconButton}>
                    <InstitutoSVG width={50} height={50} />
                </TouchableOpacity>
                <TouchableOpacity style={ingresarEstilos.iconButton}>
                    <UsuarioSvg width={50} height={50} />
                </TouchableOpacity>
                <TouchableOpacity style={ingresarEstilos.iconButton}>
                    <LogoEjercito width={50} height={50} />
                </TouchableOpacity>
            </View>

            {/* Cámara en un círculo */}
            <View style={ingresarEstilos.cameraCircleContainer}>
                {isCameraVisible ? (
                    <CameraView
                        ref={cameraRef}
                        style={ingresarEstilos.camera}
                        facing="back"
                    />
                ) : (
                    <TouchableOpacity style={ingresarEstilos.cameraPlaceholder} onPress={handleCameraToggle}>
                        <Text style={ingresarEstilos.cameraPlaceholderText}>Activar Cámara</Text>
                    </TouchableOpacity>
                )}
            </View>
        </LinearGradient>
    );
};

export default Ingresar;