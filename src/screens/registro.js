import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Para el ícono del ojo
import registroEsrilo from '../../assets/css/registro';

// Importar lógica de negocio
import { loadReferenceImage, takePicture, registerUser } from '../services/registro.Service';
import { verifyBiometrics } from '../services/miIdentidadConfig.Service';

// Importar validaciones
import {
    validateName,
    validateCedula,
    validateFingerCode,
    validateEmail,
    validatePassword,
    validatePasswordMatch,
} from '../utils/regsiterValidacion';

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
    const [confirmContrasena, setConfirmContrasena] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [countdown, setCountdown] = useState(5);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    }, [requestPermission]);

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
    const handleTakePicture = useCallback(async () => {
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
    }, []);

    // Manejar cambios en el nombre y apellido
    const handleNameChange = useCallback((text, setState) => {
        if (validateName(text)) {
            setState(text);
        }
    }, []);

    // Manejar cambios en la cédula (solo números, máximo 10 dígitos)
    const handleCedulaChange = useCallback((text, setState) => {
        if (validateCedula(text)) {
            setState(text);
        }
    }, []);

    // Manejar cambios en el código dactilar (texto y números, máximo 10 caracteres)
    const handleFingerCodeChange = useCallback((text, setState) => {
        if (validateFingerCode(text)) {
            setState(text);
        }
    }, []);

    // Manejar cambios en el correo electrónico
    const handleEmailChange = useCallback((text, setState) => {
        setState(text);
    }, []);

    // Manejar cambios en la contraseña
    const handlePasswordChange = useCallback((text, setState) => {
        setState(text);
    }, []);

    // Manejar el registro
    const handleRegister = useCallback(async () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !contrasena || !confirmContrasena || !isChecked || !photoBase64) {
            Alert.alert('Error', 'Complete todos los campos');
            return;
        }

        // Validaciones
        if (!validateName(name) || !validateName(surname)) {
            Alert.alert('Error', 'Nombre y apellido solo pueden contener letras y espacios.');
            return;
        }

        if (!validateCedula(idNumber)) {
            Alert.alert('Error', 'La cédula debe tener 10 dígitos.');
            return;
        }

        if (!validateFingerCode(fingerCode)) {
            Alert.alert('Error', 'El código dactilar debe tener exactamente 10 caracteres (letras y números).');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido.');
            return;
        }

        if (!validatePassword(contrasena)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            return;
        }

        if (!validatePasswordMatch(contrasena, confirmContrasena)) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
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
                contrasena,
            });

            if (registroResult.success) {
                // Obtener la imagen de referencia desde el backend
                const referenceImage = registroResult.referenceImage;
                console.log('holas', registroResult);
                // Comparar la imagen de referencia con la imagen tomada por la cámara
                const biometricResult = await verifyBiometrics(referenceImage, photoBase64);
                console.log(biometricResult);
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
    }, [name, surname, idNumber, fingerCode, email, contrasena, confirmContrasena, isChecked, photoBase64, navigation]);

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
                        onChangeText={(text) => handleNameChange(text, setName)}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Apellidos"
                        value={surname}
                        onChangeText={(text) => handleNameChange(text, setSurname)}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Cédula"
                        value={idNumber}
                        onChangeText={(text) => handleCedulaChange(text, setIdNumber)}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Código Dactilar"
                        value={fingerCode}
                        onChangeText={(text) => handleFingerCodeChange(text, setFingerCode)}
                        maxLength={10}
                    />
                    <TextInput
                        style={registroEsrilo.input}
                        placeholder="Correo Electrónico"
                        value={email}
                        onChangeText={(text) => handleEmailChange(text, setEmail)}
                        keyboardType="email-address"
                    />

                    {/* Campo de contraseña */}
                    <View style={registroEsrilo.passwordContainer}>
                        <TextInput
                            style={registroEsrilo.input}
                            placeholder="Contraseña"
                            value={contrasena}
                            onChangeText={(text) => handlePasswordChange(text, setContrasena)}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={registroEsrilo.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <MaterialIcons
                                name={showPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Campo de confirmación de contraseña */}
                    <View style={registroEsrilo.passwordContainer}>
                        <TextInput
                            style={registroEsrilo.input}
                            placeholder="Confirmar Contraseña"
                            value={confirmContrasena}
                            onChangeText={(text) => handlePasswordChange(text, setConfirmContrasena)}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            style={registroEsrilo.eyeIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <MaterialIcons
                                name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

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

export default React.memo(RegistroBiometrico); // Evitar rerenders innecesarios