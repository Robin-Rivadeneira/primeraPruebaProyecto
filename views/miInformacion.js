import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg";
import menuEstilos from '../public/css/menu';
import miIdentidadEstilos from '../public/css/miIdentidad';


const miIdentidad = () => {
  const qrValue = JSON.stringify({
    cedula: "1234567890",
    nombre: "LARREA PAREDES DIEGO FRANCISCO",
    grado: "Teniente Coronel",
    caduca: "01/01/2030"
  });

  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={menuEstilos.container}
    >
      <View style={menuEstilos.card}>
        <View style={menuEstilos.cardHeader}>
          <Text style={menuEstilos.cardTitle}>ISSFA</Text>
        </View>
        <View style={menuEstilos.cardContent}>
          <View style={menuEstilos.cardImagen}>
            <UsuarioSvg width='100%' height="100%"></UsuarioSvg>
          </View>
          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <LogoEjercito  width='100%' height="100%"></LogoEjercito>
            </View>
            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>CÉDULA:</Text>
              <Text style={menuEstilos.cardTexts}>1234567890</Text>
              <Text style={menuEstilos.cardText}>LARREA PAREDES DIEGO FRANCISCO</Text>
              <Text style={menuEstilos.cardText}>GRADO:</Text>
              <Text style={menuEstilos.cardTexts}>Teniente Coronel</Text>
              <Text style={menuEstilos.cardText}>CADUCA:</Text>
              <Text style={menuEstilos.cardTexts}>01/01/2030</Text>
            </View>
            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>
        <View style={miIdentidadEstilos.qrContainer}>
          <Text style={miIdentidadEstilos.cardText}>Código QR:</Text>
          <QRCode value={qrValue} size={250} />
        </View>
      </View>
    </LinearGradient>
  );
}

export default miIdentidad;