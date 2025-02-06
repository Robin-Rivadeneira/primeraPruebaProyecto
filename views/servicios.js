import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import identidadInicialEstilos from '../public/css/identidad';
import VerificarSbg from "../public/img/serviciosSupervivencia.svg";
import MostrarSbg from "../public/img/firmarCredito.svg";
import GoIdentitySVG from "../public/img/goIdentity.svg";
const ServiciosScreen = () => {
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

      <Text style={identidadInicialEstilos.title}>Mis Servicios</Text>
      <Text style={identidadInicialEstilos.parrafo}>ISSFA</Text>
      <TouchableOpacity style={identidadInicialEstilos.button}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={identidadInicialEstilos.imagenCard}>
              <VerificarSbg width='100%' height="100%"></VerificarSbg>
            </View>
            <Text style={identidadInicialEstilos.buttonText}>Servicio Supervivencia</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={identidadInicialEstilos.buttons}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={identidadInicialEstilos.imagenCard}>
              <MostrarSbg width='100%' height="100%"></MostrarSbg>
            </View>
            <Text style={identidadInicialEstilos.buttonTextG}>Firmar Crédito</Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ServiciosScreen;