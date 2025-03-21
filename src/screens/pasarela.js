import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import PasarelaInicioSvg from "../../assets/img/pasarelainicio.svg";
import PasarelaFinalSvg from "../../assets/img/pasarelafinal.svg";
import pasarelaEsitlos from '../../assets/css/pasarela';

const Pasarela = () => {
  const navigation = useNavigation();

  const handleMenu = useCallback(() => {
    navigation.navigate('menu');
  }, [navigation]);

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
      <View style={pasarelaEsitlos.imagen}>
        <PasarelaFinalSvg width='100%' height="100%" />
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
};

export default React.memo(Pasarela); // Evitar rerenders innecesarios