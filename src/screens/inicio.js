import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import app from "../../assets/css/app";
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import InstitutoSVG from "../../assets/img/instituto.svg";

export default function inicio({ navigation }) {
  return (
    <View style={app.container}>
      <LinearGradient
          colors={[
            '#bed9f4',        // Color 1
            '#c4f4fd',        // Color 2
            'rgb(236, 242, 255)', // Color 3 con opacidad
            'rgba(255, 255, 255, 0.38)',  // Color 4 (blanco sin opacidad)
          ]}
          locations={[0.2, 0.5, 0.7, 0.8]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={app.gradieFond}
        >
      {/* Logo y título */}
      <GoIdentitySVG width="100%" style={app.issfaLogo} />

      {/* Logo y título */}
      <InstitutoSVG  width="50%" style={app.issfaLogos}/>

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