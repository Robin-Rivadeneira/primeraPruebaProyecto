import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import loginEstilos from '../../assets/css/login';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import { login } from '../services/login.Service'; // Importa el servicio de autenticación
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!isChecked) {
            Alert.alert('Error', 'Debe aceptar los términos y condiciones.');
            return;
        }

        if (!email || !password) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            // Llamar al servicio de autenticación
            const token = await login(email, password);
            console.log("Token recibido:", token.data.token);
            // Guardar el token en el almacenamiento local (AsyncStorage)
            await AsyncStorage.setItem('userToken', token.data.token);

            // Navegar a la pantalla "Home" o "Pasarela" después de iniciar sesión
            navigation.navigate('pasarela');
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al iniciar sesión');
        }
    };

    const handleCrearCuenta = () => {
        navigation.navigate('registro');
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={loginEstilos.container}
        >
            <View style={loginEstilos.logoContainer}>
                <GoIdentitySVG />
            </View>
            <Text style={loginEstilos.welcomeText}>BIENVENIDOS</Text>
            <Text style={loginEstilos.letras}>Correo</Text>
            <TextInput
                style={loginEstilos.input}
                placeholder="CORREO ELECTRÓNICO"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={loginEstilos.letras}>Contraseña</Text>
            <TextInput
                style={loginEstilos.input}
                placeholder="CONTRASEÑA"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={loginEstilos.checkboxContainer}>
                <TouchableOpacity
                    style={[loginEstilos.checkbox, isChecked && loginEstilos.checked]}
                    onPress={() => setIsChecked(!isChecked)}
                />
                <Text style={loginEstilos.checkboxLabel}>Acepto los términos y condiciones</Text>
            </View>
            <LinearGradient
                colors={['#e5ecfd', '#bdccf4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={loginEstilos.gradientButton}
            >
                <TouchableOpacity style={loginEstilos.button} onPress={handleLogin}>
                    <Text style={loginEstilos.buttonText}>INGRESAR</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={loginEstilos.footerText}>
                No tienes cuenta,{' '}
                <Text style={loginEstilos.link} onPress={handleCrearCuenta}>
                    CREAR CUENTA
                </Text>
            </Text>
        </LinearGradient>
    );
};

export default Login;