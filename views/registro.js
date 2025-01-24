import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import registroEsrilo from '../public/css/registro';
import { LinearGradient } from 'expo-linear-gradient';

const RegistroBiometrico = () => {
    const [photoUri, setPhotoUri] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [fingerCode, setFingerCode] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
            const fileName = result.assets[0].uri.split('/').pop().replace('.jpeg', '.jpg');
            const destinationPath = `${FileSystem.documentDirectory}${fileName}`;

            try {
                await FileSystem.copyAsync({
                    from: result.assets[0].uri,
                    to: destinationPath,
                });
            } catch (error) {
                Alert.alert('Error', 'No se pudo guardar la foto.');
            }
        }
    };

    const handleRegister = () => {
        if (!name || !surname || !idNumber || !fingerCode || !email || !isChecked) {
            Alert.alert('Error', 'Por favor, complete todos los campos y acepte los términos y condiciones.');
            return;
        }
        Alert.alert('Registro exitoso', '¡Gracias por registrarte!');
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

                    <Text style={registroEsrilo.title}>VERIFICACIÓN BIOMÉTRICA</Text>

                    <TouchableOpacity style={registroEsrilo.biometricButton} onPress={openCamera}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={registroEsrilo.biometricImage} />
                        ) : (
                            <Image
                                style={registroEsrilo.biometricImagePlaceholder}
                            />
                        )}
                    </TouchableOpacity>

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
        </View >
    );
};

export default RegistroBiometrico;