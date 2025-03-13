import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import registroEsrilo from '../../assets/css/registro';

// Importar lógica de negocio
import { loadReferenceImage, takePicture, registerUser } from './registroLogic';

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

    // Cargar imagen de referencia al montar el componente
    useEffect(() => {
        const loadImage = async () => {
            try {
                const base64 = await loadReferenceImage();
                setImageRefBase64(base64);
            } catch (error) {
                Alert.alert('Error', 'No se pudo cargar la imagen de referencia');
            }
        };
        loadImage();
    }, []);

    // Solicitar permisos de cámara
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    // Manejar la captura de foto
    const handleTakePicture = async () => {
        try {
            const { uri, base64 } = await takePicture(cameraRef);
            setPhotoUri(uri);
            setPhotoBase64(base64);
        } catch (error) {
            Alert.alert('Error', 'No se pudo capturar la foto');
        }
    };

    // Manejar el registro
    const handleRegister = async () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !isChecked || !photoBase64 || !imageRefBase64) {
            Alert.alert('Error', 'Complete todos los campos');
            return;
        }

        try {
            await registerUser({
                imageRefBase64,
                photoBase64,
                name,
                surname,
                idNumber,
                fingerCode,
                email,
            });
            navigation.navigate('pasarela');
        } catch (error) {
            Alert.alert('Error', error.message || 'Error en el registro');
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
                    <View style={registroEsrilo.cameraContainer}>
                        {!photoUri ? (
                            <CameraView
                                ref={cameraRef}
                                style={registroEsriloheet.absoluteFill}
                                facing="front"
                                autoFocus="on"
                                focusMode="continuous"
                            >
                                <View style={registroEsrilo.overlay}>
                                    <View style={registroEsrilo.frame}>
                                        <View style={registroEsrilo.frameInner}>
                                            <View style={registroEsrilo.guideLines} />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={registroEsrilo.captureButton}
                                        onPress={handleTakePicture}
                                    />
                                </View>
                            </CameraView>
                        ) : (
                            <Image source={{ uri: photoUri }} style={registroEsrilo.previewImage} />
                        )}
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