import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import loginEstilos from '../public/css/login';
import GoIdentitySVG from "../public/img/goIdentity.svg";

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (!isChecked) {
            Alert.alert('Error', 'Debe aceptar los términos y condiciones.');
            return;
        }
        // Navegar a la pantalla "Home" después de iniciar sesión
        navigation.navigate('Home');
    };

    const handleCrearCuenta = () => {
        // Navegar a la pantalla "CrearCuenta"
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