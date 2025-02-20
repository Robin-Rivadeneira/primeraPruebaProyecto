import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg"
import menuEstilos from '../public/css/menu';
import IdentidadSVG from "../public/img/qr.svg";
import ServiciosSVG from "../public/img/servicios.svg";
import BeneficiosSVG from "../public/img/beneficios.svg";
import AmigosSVG from "../public/img/amigosMenu.svg";

export default function menu() {

  const navigation = useNavigation();
  const handPerfil = () => {
    // Navegar a la pantalla "perfil"
    navigation.navigate('perfil');
  };

  const handIdentidad = () => {
    navigation.navigate('identidadInicial');
  };

  const handServicos = () => {
    navigation.navigate('servicios');
  };

  const handBeneficios = () => {
    navigation.navigate('beneficioFiltro');
  };

  const handAmigos = () => {
    navigation.navigate('amigos');
  };

  const buttons = [
    { text: 'Identidad', icon: <IdentidadSVG width={60} height={60} />, link: handIdentidad },
    { text: 'Servicios', icon: <ServiciosSVG width={60} height={60} />, link: handServicos },
    { text: 'Beneficios', icon: <BeneficiosSVG width={60} height={60} />, link: handBeneficios },
    { text: 'Amigos', icon: <AmigosSVG width={60} height={60} />, link: handAmigos },
  ];

  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={menuEstilos.container}
    >
      {/* Header */}
      <View style={menuEstilos.header}>
        <GoIdentitySVG style={menuEstilos.logo} />
        <TouchableOpacity style={menuEstilos.menuButton} onPress={handPerfil}>
          <UsuarioSvg width='100%' height="100%" ></UsuarioSvg>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={menuEstilos.title}>MI ESPACIO</Text>

      {/* ID Card */}
      <View style={menuEstilos.card}>
        <View style={menuEstilos.cardHeader}>
          <Text style={menuEstilos.cardTitle}>ISSFA</Text>
        </View>

        <View style={menuEstilos.cardContent}>
          <View style={menuEstilos.cardImagen}>
            <Image source={require('../public/img/imagenPrueba.jpg')} style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }} resizeMode="contain" />
          </View>

          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <LogoEjercito width='100%' height="100%" />
            </View>

            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>CÉDULA: 1713489514</Text>
              <Text style={menuEstilos.cardText}>Gerald Orlando Moreno Jadan</Text>
              <Text style={menuEstilos.cardText}>GRADO: Teniente Coronel</Text>
              <Text style={menuEstilos.cardText}>CADUCA: 01/01/2030</Text>
            </View>

            <View style={menuEstilos.imagenCards}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>
      </View>
      {/* Buttons */}
      <View style={menuEstilos.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={menuEstilos.button} onPress={button.link}>
            {button.icon}
            <Text style={menuEstilos.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}