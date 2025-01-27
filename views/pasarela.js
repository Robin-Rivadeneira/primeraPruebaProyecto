import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import pasarelaEsitlos from '../public/css/pasarela';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import PasarelaInicioSvg from "../public/img/pasarelainicio.svg"
import PasarelaFinalSvg from "../public/img/pasarelafinal.svg"


export default function pasarela() {
  const navigation = useNavigation();

  const handleMenu = () => {
    // Navegar a la pantalla "CrearCuenta"
    navigation.navigate('menu');
  };
  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={pasarelaEsitlos.container}
    >
      <View style={pasarelaEsitlos.header}>
        <GoIdentitySVG />
      </View>
      <Text style={pasarelaEsitlos.title}>MI MEMBRESÍA</Text>
      <View style={pasarelaEsitlos.image}>
        <PasarelaInicioSvg />
      </View>
      <Text style={pasarelaEsitlos.description}>
        Disfruta de tus servicios internos y beneficios por un solo pago anual de:
      </Text>
      <Text style={pasarelaEsitlos.price}>$4,99/año</Text>
      <View style={pasarelaEsitlos.images}>
        <PasarelaFinalSvg />
      </View>
      <TouchableOpacity style={pasarelaEsitlos.payButton} onPress={handleMenu}>
        <LinearGradient
          colors={['#e5ecfd', '#bdccf4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={pasarelaEsitlos.gradientButton}
        >
          <Text style={pasarelaEsitlos.payButtonText}>PAGAR</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}
