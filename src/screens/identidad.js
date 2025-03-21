import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import VerificarSbg from "../../assets/img/Verificar.svg";
import MostrarSbg from "../../assets/img/generar.svg";
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import identidadInicialEstilos from '../../assets/css/identidad';

export default function IdentidadInicial() {
    const navigation = useNavigation();
    const handVerificar = () => {
        // Navegar a la pantalla "Verificacion"
        navigation.navigate('verificar');
    };

    const handIdentidad = () => {
        // Navegar a la pantalla "Verificacion"
        navigation.navigate('miIdentidad');
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={identidadInicialEstilos.container}
        >
            <View style={identidadInicialEstilos.header}>
                <GoIdentitySVG style={identidadInicialEstilos.logo} />
            </View>

            <Text style={identidadInicialEstilos.title}>MI IDENTIDAD</Text>
            <Text style={identidadInicialEstilos.parrafo}>Servicios de Identidad</Text>
            <TouchableOpacity style={identidadInicialEstilos.button} onPress={handVerificar}>
                <View style={identidadInicialEstilos.card}>
                    <View style={identidadInicialEstilos.cardInfo}>
                        <View style={identidadInicialEstilos.imagenCard}>
                            <VerificarSbg width='100%' height="100%"></VerificarSbg>
                        </View>
                        <Text style={identidadInicialEstilos.buttonText}>Verificar Identidad</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={identidadInicialEstilos.buttons} onPress={handIdentidad}>
                <View style={identidadInicialEstilos.card}>
                    <View style={identidadInicialEstilos.cardInfo}>
                        <View style={identidadInicialEstilos.imagenCard}>
                            <MostrarSbg width='100%' height="100%"></MostrarSbg>
                        </View>
                        <Text style={identidadInicialEstilos.buttonTextG}>Generar Identidad</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );
}