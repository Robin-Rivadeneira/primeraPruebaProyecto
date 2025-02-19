import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import registroEsrilo from '../public/css/registro';

const RegistroBiometrico = () => {
    const [photoUri, setPhotoUri] = useState(null);
    const [photoBase64, setPhotoBase64] = useState('');
    const [imageRefBase64, setImageRefBase64] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [fingerCode, setFingerCode] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    // Cargar imagen de referencia
    const loadReferenceImage = async () => {
        try {
            const asset = Asset.fromModule(require('../public/img/imagenPrueba.png'));
            await asset.downloadAsync();
            const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setImageRefBase64(base64);
        } catch (error) {
            console.error('Error cargando imagen:', error);
        }
    };

    useEffect(() => {
        loadReferenceImage();
    }, []);

    // Manejar permisos de cámara
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    // Tomar foto
    const takePicture = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
                base64: false,
                skipProcessing: true
            });
            
            setPhotoUri(photo.uri);
            const base64 = await FileSystem.readAsStringAsync(photo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setPhotoBase64(base64);
            
        } catch (error) {
            Alert.alert('Error', 'Error al capturar foto');
        }
    };

    // Registro
    const handleRegister = async () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !isChecked || !photoBase64 || !imageRefBase64) {
            Alert.alert('Error', 'Complete todos los campos');
            return;
        }

        try {
            const response = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source_img: imageRefBase64,
                    target_img: photoBase64,
                    id: Math.random().toString(36).substr(2, 10),
                }),
            });

            const result = await response.json();
            response.ok ? navigation.navigate('pasarela') : Alert.alert('Error', result.message);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        }
    };

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
                    <View style={styles.cameraContainer}>
                        {!photoUri ? (
                            <CameraView
                                ref={cameraRef}
                                style={StyleSheet.absoluteFill}
                                facing="front"
                            >
                                <View style={styles.overlay}>
                                    <View style={styles.frame}>
                                        <View style={styles.frameInner}>
                                            <View style={styles.guideLines} />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.captureButton}
                                        onPress={takePicture}
                                    />
                                </View>
                            </CameraView>
                        ) : (
                            <Image source={{ uri: photoUri }} style={styles.previewImage} />
                        )}
                    </View>

                    {/* Botón para retomar foto */}
                    {photoUri && (
                        <TouchableOpacity
                            style={styles.retakeButton}
                            onPress={() => setPhotoUri(null)}
                        >
                            <Text style={styles.retakeText}>VOLVER A TOMAR FOTO</Text>
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

const styles = StyleSheet.create({
    cameraContainer: {
        width: '50%',
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 20,
        alignSelf: 'center',
        // Sombra exterior
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 15, // Para Android
        // Borde
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,0.5)'
    },
});

export default RegistroBiometrico;