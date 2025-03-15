import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import registroEsrilo from '../../assets/css/registro';

// Importar lógica de negocio
import { loadReferenceImage, takePicture, registerUser } from '../services/registro.Service';
import { verifyBiometrics } from '../services/miIdentidadConfig.Service'; // Importar la función de verificación biométrica

const RegistroBiometrico = () => {
    const [photoUri, setPhotoUri] = useState(null);
    const [photoBase64, setPhotoBase64] = useState('');
    const [imageRefBase64, setImageRefBase64] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [fingerCode, setFingerCode] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [countdown, setCountdown] = useState(5); // Estado para la cuenta regresiva
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    // Solicitar permisos de cámara
    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                Alert.alert('Permisos de cámara no otorgados', 'Necesitas otorgar permisos para usar la cámara.');
            }
        })();
    }, []);

    // Temporizador para tomar la foto automáticamente después de 5 segundos
    useEffect(() => {
        if (permission?.granted && !photoUri) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(timer); // Detener el temporizador
                        handleTakePicture(); // Tomar la foto
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000); // Actualizar cada segundo

            // Limpiar el temporizador si el componente se desmonta
            return () => clearInterval(timer);
        }
    }, [permission, photoUri]);

    // Manejar la captura de foto
    const handleTakePicture = async () => {
        try {
            console.log("Capturando foto...");
            const { uri, base64 } = await takePicture(cameraRef);
            console.log("Foto capturada:", uri);
            setPhotoUri(uri);
            setPhotoBase64(base64);
        } catch (error) {
            console.error("Error al capturar foto:", error);
            Alert.alert('Error', 'No se pudo capturar la foto');
        }
    };

    // Manejar el registro
    const handleRegister = async () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !contrasena || !isChecked || !photoBase64) {
            Alert.alert('Error', 'Complete todos los campos');
            return;
        }

        try {
            // Registrar al usuario
            const registroResult = await registerUser({
                name,
                surname,
                idNumber,
                fingerCode,
                email,
                contrasena
            });

            if (registroResult.success) {
                // Obtener la imagen de referencia desde el backend
                const referenceImage = registroResult.referenceImage;
                console.log('holas',registroResult)
                // Comparar la imagen de referencia con la imagen tomada por la cámara
                const biometricResult = await verifyBiometrics(referenceImage, photoBase64);
                console.log(biometricResult)
                if (biometricResult.match) {
                    Alert.alert('Éxito', 'Verificación biométrica exitosa');
                    navigation.navigate('login');
                } else {
                    Alert.alert('Error', 'La verificación biométrica falló. Las imágenes no coinciden.');
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Error en el registro');
        }
    };

    if (!permission?.granted) {
        return (
            <View>
                <Text>Necesitas otorgar permisos para usar la cámara.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
                locations={[0.2, 0.4, 0.6, 0.8]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={registroEsrilo.container}
            >
                <ScrollView contentContainerStyle={registroEsrilo.container}>
                    {/* Contenedor de cámara con marco oscuro */}
                    <View style={registroEsrilo.cameraContainer}>
                        <CameraView
                            ref={cameraRef}
                            style={{ flex: 1 }}
                            facing="front"
                            autoFocus="on"
                            focusMode="continuous"
                        />
                        {photoUri && (
                            <View style={registroEsrilo.photoOverlay}>
                                <Image source={{ uri: photoUri }} style={registroEsrilo.previewImage} />
                            </View>
                        )}
                        <Text style={registroEsrilo.countdownText}>
                            La foto se tomará en {countdown} segundos...
                        </Text>
                    </View>

                    {/* Botón para retomar foto */}
                    {photoUri && (
                        <TouchableOpacity
                            style={registroEsrilo.retakeButton}
                            onPress={() => setPhotoUri(null)}
                        >
                            <Text style={registroEsrilo.retakeText}>VOLVER A TOMAR FOTO</Text>
                        </TouchableOpacity>
                    )}

                    {/* Formulario */}
                    <Text style={registroEsrilo.title}>VERIFICACIÓN BIOMÉTRICA</Text>
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Nombres"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Apellidos"
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Cédula"
                        value={idNumber}
                        onChangeText={setIdNumber}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Código Dactilar"
                        value={fingerCode}
                        onChangeText={setFingerCode}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Correo Electrónico"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Contraseña"
                        value={contrasena}
                        onChangeText={setContrasena}
                    />

                    {/* Checkbox y botón de registro */}
                    <View style={registroEsrilo.checkboxContainer}>
                        <TouchableOpacity
                            style={[registroEsrilo.checkbox, isChecked && registroEsrilo.checked]}
                            onPress={() => setIsChecked(!isChecked)}
                        />
                        <Text style={registroEsrilo.checkboxText}>Acepto términos y condiciones</Text>
                    </View>

                    <TouchableOpacity style={registroEsrilo.registerButton} onPress={handleRegister}>
                        <LinearGradient
                            colors={['#e5ecfd', '#bdccf4']}
                            style={registroEsrilo.gradientButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={registroEsrilo.registerButtonText}>REGISTRAR</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default RegistroBiometrico;