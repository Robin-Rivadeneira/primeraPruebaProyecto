import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>VERIFICACIÓN BIOMÉTRICA</Text>

            <TouchableOpacity style={styles.biometricButton} onPress={openCamera}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.biometricImage} />
                ) : (
                    <Image
                        style={styles.biometricImagePlaceholder}
                    />
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Nombres"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellidos"
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                value={idNumber}
                onChangeText={setIdNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Código Dactilar"
                value={fingerCode}
                onChangeText={setFingerCode}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, isChecked && styles.checked]}
                    onPress={() => setIsChecked(!isChecked)}
                />
                <Text style={styles.checkboxText}>Acepto los términos y condiciones</Text>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>REGISTRAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E5F6FE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 20,
    },
    biometricButton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    biometricImage: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
    biometricImagePlaceholder: {
        width: 80,
        height: 80,
    },
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    checked: {
        backgroundColor: '#4A90E2',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
    registerButton: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: '#4A90E2',
        borderRadius: 25,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistroBiometrico;