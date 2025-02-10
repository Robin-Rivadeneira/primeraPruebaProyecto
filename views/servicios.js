import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import identidadInicialEstilos from '../public/css/identidad';
import VerificarSbg from "../public/img/serviciosSupervivencia.svg";
import MostrarSbg from "../public/img/firmarCredito.svg";
import GoIdentitySVG from "../public/img/goIdentity.svg";
import { Linking } from 'react-native'; // Importa Linking

const ServiciosScreen = () => {

  // Funciones para abrir los enlaces
  const openServicioSupervivencia = () => {
    Linking.openURL('https://enext.online/issfa_creditos/public/index.php?s=JnVzPXByb2Nlc29zRXF1aWZheEBnbWFpbC5jb20mcGFzcz1hVVFMSkgmaWRUcmFtaXRlPTE2OTg0'); // Cambia esta URL por la que desees
  };

  const openFirmarCredito = () => {
    Linking.openURL('https://enext.online/issfa_supervivencia/public/index.php?s=JnVzPWhjYXJyZXJhQGVuZXh0LmVjJnBhc3M9WTBHOUE2JmlkVHJhbWl0ZT0zNTAy'); // Cambia esta URL por la que desees
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

      <Text style={identidadInicialEstilos.title}>Mis Servicios</Text>
      <Text style={identidadInicialEstilos.parrafo}>ISSFA</Text>

      <TouchableOpacity style={identidadInicialEstilos.button} onPress={openServicioSupervivencia}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={identidadInicialEstilos.imagenCard}>
              <VerificarSbg width='100%' height="100%" />
            </View>
            <Text style={identidadInicialEstilos.buttonText}>Servicio Supervivencia</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={identidadInicialEstilos.buttons} onPress={openFirmarCredito}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={identidadInicialEstilos.imagenCard}>
              <MostrarSbg width='100%' height="100%" />
            </View>
            <Text style={identidadInicialEstilos.buttonTextG}>Firmar Crédito</Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ServiciosScreen;