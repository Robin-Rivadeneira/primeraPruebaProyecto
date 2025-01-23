import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import app from "../public/css/app";

export default function inicio({ navigation }) {
  return (
    <View style={app.container}>
      {/* Logo y título */}
      <Image
        source={require("../public/img/goIdentity.png")} // Ruta relativa al logo
        style={app.issfaLogo}
        resizeMode="contain"
      />

      {/* Huella digital */}
      <Image
        source={require("../public/img/goIdentity.png")} // Ruta relativa a la huella
        style={app.fingerprint}
        resizeMode="contain"
      />

      {/* Botón de ingresar */}
      <TouchableOpacity
        style={app.button}
        onPress={() => navigation.navigate("carucel")} // Navegar a la vista del carrusel
      >
        <Text style={app.buttonText}>INGRESAR</Text>
      </TouchableOpacity>
    </View>
  );
}
