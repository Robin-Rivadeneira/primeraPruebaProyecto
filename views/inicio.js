import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import app from "../public/css/app";
import { LinearGradient } from 'expo-linear-gradient';

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
      <Image
        source={require("../public/img/goIdentity.png")} // Ruta relativa al logo
        style={app.issfaLogo}
        resizeMode="contain"
      />

      {/* Logo y título */}
      <Image
        source={require("../public/img/instituto.png")} // Ruta relativa al logo
        style={app.issfaLogo}
        resizeMode="contain"
      />

      {/* Huella digital */}
      <Image
        source={require("../public/img/buella.png")} // Ruta relativa a la huella
        style={app.fingerprint}
        resizeMode="contain"
      />

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
