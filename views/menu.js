import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.jpeg";
import PerfilSvg from "../public/img/user.png";
import menuEstilos from '../public/css/menu';
import IdentidadSVG from "../public/img/Recurso 37.svg";
import ServiciosSVG from "../public/img/Recurso 36.svg";
import BeneficiosSVG from "../public/img/Recurso 34.svg";
import AmigosSVG from "../public/img/Recurso 35.svg";

export default function menu() {
  const buttons = [
    { text: 'Identidad', icon: <IdentidadSVG width={60} height={60} /> },
    { text: 'Servicios', icon: <ServiciosSVG width={60} height={60} /> },
    { text: 'Beneficios', icon: <BeneficiosSVG width={60} height={60} /> },
    { text: 'Amigos', icon: <AmigosSVG width={60} height={60} /> },
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
        <TouchableOpacity style={menuEstilos.menuButton}>
        <Image source={UsuarioSvg} style={menuEstilos.logos}></Image>
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
          <View >
           <Image source={UsuarioSvg}></Image>
          </View>
          <View style={menuEstilos.cardInfo}>
            <View style={menuEstilos.imagenCard}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
            <View style={menuEstilos.subida}>
              <Text style={menuEstilos.cardText}>CÉDULA: 1234567890</Text>
              <Text style={menuEstilos.cardText}>LARREA PAREDES DIEGO FRANCISCO</Text>
              <Text style={menuEstilos.cardText}>GRADO: Teniente Coronel</Text>
              <Text style={menuEstilos.cardText}>CADUCA: 01/01/2030</Text>
            </View>
            <View style={menuEstilos.imagenCard}>
              <InstitutoSVG width='100%' height="100%" />
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={menuEstilos.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={menuEstilos.button}>
            {button.icon}
            <Text style={menuEstilos.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}