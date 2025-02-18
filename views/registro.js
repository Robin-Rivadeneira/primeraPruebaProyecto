import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
    const navigation = useNavigation();

    // Función para cargar la imagen de referencia en Base64
    const loadReferenceImage = async () => {
        try {
            const asset = Asset.fromModule(require('../public/img/imagenPrueba.jpeg'));
            await asset.downloadAsync(); // Asegura que la imagen esté disponible

            const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            setImageRefBase64(base64);
        } catch (error) {
            console.error('Error cargando la imagen de referencia:', error);
        }
    };

    useEffect(() => {
        loadReferenceImage();
    }, []);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar una foto.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: false, // No convertir aquí, lo haremos manualmente
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setPhotoUri(uri);

            try {
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setPhotoBase64(base64);
            } catch (error) {
                Alert.alert('Error', 'No se pudo convertir la imagen a Base64.');
            }
        }
    };

    const handleRegister = async () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !isChecked || !photoBase64 || !imageRefBase64) {
            Alert.alert('Error', 'Por favor, complete todos los campos y tome una foto.');
            return;
        }

        const randomId = Math.random().toString(36).substr(2, 10); // ID aleatorio

        const requestBody = {
            source_img: imageRefBase64, // Imagen de referencia en Base64
            target_img: photoBase64, // Imagen capturada en Base64
            id: randomId,
        };

        try {
            const response = await fetch('http://54.189.63.53:9100/biometria_DEMO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();
            console.log('Respuesta API:', result);

            if (response.ok) {
                Alert.alert('Registro exitoso', '¡Verificación biométrica completada!');
                navigation.navigate('pasarela');
            } else {
                Alert.alert('Error', result.message || 'Error en la verificación biométrica.');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
            console.error(error);
        }
    };

    return (
        <View>
            <LinearGradient
                colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
                locations={[0.2, 0.4, 0.6, 0.8]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={registroEsrilo.container}
            >
                <ScrollView contentContainerStyle={registroEsrilo.container}>

                    <TouchableOpacity style={registroEsrilo.biometricButton} onPress={openCamera}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={registroEsrilo.biometricImage} />
                        ) : (
                            <Image style={registroEsrilo.biometricImagePlaceholder} />
                        )}
                    </TouchableOpacity>
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

                    <View style={registroEsrilo.checkboxContainer}>
                        <TouchableOpacity
                            style={[registroEsrilo.checkbox, isChecked && registroEsrilo.checked]}
                            onPress={() => setIsChecked(!isChecked)}
                        />
                        <Text style={registroEsrilo.checkboxText}>Acepto los términos y condiciones</Text>
                    </View>

                    <TouchableOpacity style={registroEsrilo.registerButton} onPress={handleRegister}>
                        <LinearGradient
                            colors={['#e5ecfd', '#bdccf4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={registroEsrilo.gradientButton}
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