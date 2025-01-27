import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UsuarioSvg from "../public/img/usuarios.jpeg";
import GoIdentitySVG from "../public/img/goIdentity.svg";
import identidadInicialEstilos from '../public/css/identidad';

export default function IdentidadInicial() {
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
            <View style={identidadInicialEstilos.card}>
                <View style={identidadInicialEstilos.cardContent}>
                    <View style={identidadInicialEstilos.cardInfo}>
                        <View style={identidadInicialEstilos.imagenCard}>
                            <GoIdentitySVG />
                        </View>
                        <TouchableOpacity style={identidadInicialEstilos.button} onPress={ }>
                            <Text style={identidadInicialEstilos.buttonText}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={identidadInicialEstilos.card}>
                <View style={identidadInicialEstilos.cardContent}>
                    <View style={identidadInicialEstilos.cardInfo}>

                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}