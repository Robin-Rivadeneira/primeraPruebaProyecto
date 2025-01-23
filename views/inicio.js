import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import app from "../public/css/app";
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import HuellaSVG from "../public/img/huella.svg";

export default function inicio({ navigation }) {
  return (
    <View style={app.container}>
      <LinearGradient
          colors={['#bed9f4', '#c4f4fd', '#ecf2ff']} // Colores del gradiente
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={app.gradieFond}
        >
      {/* Logo y título */}
      <GoIdentitySVG style={app.issfaLogo} />

      {/* Logo y título */}
      <InstitutoSVG style={app.issfaLogo} />

      {/* Huella digital */}
      <HuellaSVG style={app.fingerprint} />

      {/* Botón de ingresar */}
      <TouchableOpacity
        style={app.button}
        onPress={() => navigation.navigate("carucel")} // Navegar a la vista del carrusel
      >
        <LinearGradient
          colors={['#e5ecfd', '#bdccf4']} // Colores del gradiente
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={app.gradientButton}
        >
          <Text style={app.buttonText}>INGRESAR</Text>
        </LinearGradient>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}