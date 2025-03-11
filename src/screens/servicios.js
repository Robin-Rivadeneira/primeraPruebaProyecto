import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview"; // Importamos WebView
import identidadInicialEstilos from '../../assets/css/identidad';
import VerificarSbg from "../assets/img/serviciosSupervivencia.svg";
import MostrarSbg from "../assets/img/firmarCredito.svg";
import GoIdentitySVG from "../assets/img/goIdentity.svg";
import menuEstilos from '../../assets/css/menu';
import InstitutoSVG from "../assets/img/instituto.svg";

const ServiciosScreen = () => {
  const [currentUrl, setCurrentUrl] = useState(null); // Estado para controlar la URL

  // Función para abrir WebView con la URL
  const openInApp = (url) => {
    setCurrentUrl(url);
  };

  // Si hay una URL activa, mostrar el WebView en pantalla completa
  if (currentUrl) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity 
          style={{ padding: 10, backgroundColor: "black", alignItems: "center" }}
          onPress={() => setCurrentUrl(null)} // Cerrar el WebView
        >
          <Text style={{ color: "white" }}>Cerrar</Text>
        </TouchableOpacity>
        <WebView source={{ uri: currentUrl }} style={{ flex: 1 }} />
      </View>
    );
  }

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

      <TouchableOpacity style={identidadInicialEstilos.button} onPress={() => openInApp('https://enext.online/issfa_creditos/assets/index.php?s=JnVzPXByb2Nlc29zRXF1aWZheEBnbWFpbC5jb20mcGFzcz1hVVFMSkgmaWRUcmFtaXRlPTE2OTg0')}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
            <View style={identidadInicialEstilos.imagenCards}>
              <VerificarSbg width='100%' height="100%" />
            </View>
            <Text style={identidadInicialEstilos.buttonText}>Servicio Supervivencia</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={identidadInicialEstilos.buttons} onPress={() => openInApp('https://enext.online/issfa_supervivencia/assets/index.php?s=JnVzPWhjYXJyZXJhQGVuZXh0LmVjJnBhc3M9WTBHOUE2JmlkVHJhbWl0ZT0zNTAy')}>
        <View style={identidadInicialEstilos.card}>
          <View style={identidadInicialEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
            <View style={identidadInicialEstilos.imagenCards}>
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