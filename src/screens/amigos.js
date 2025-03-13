import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Importa los SVGs
import Avatar1 from "../../assets/img/usuarios.svg";
import Avatar2 from "../../assets/img/usuarios.svg";
import Avatar3 from "../../assets/img/usuarios.svg";
import amigosEstilos from "../../../assets/css/amigos";
import identidadInicialEstilos from '../../assets/css/identidad';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";

// Importa los datos de amigos
import amigosData from "../services/amigos.service";

const AmigosScreen = () => {
  // Mapea los nombres de los SVGs a los componentes
  const svgComponents = {
    Avatar1,
    Avatar2,
    Avatar3,
  };

  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={amigosEstilos.container}
    >
      <View style={identidadInicialEstilos.header}>
        <GoIdentitySVG style={identidadInicialEstilos.logo} />
      </View>
      {/* Título */}
      <Text style={amigosEstilos.title}>MIS AMIGOS</Text>

      {/* Disponibles */}
      <Text style={amigosEstilos.subTitle}>Disponibles: {amigosData.length}</Text>

      {/* Lista de Amigos */}
      <FlatList
        data={amigosData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const SvgIcon = svgComponents[item.SvgIcon];
          return (
            <View style={amigosEstilos.card}>
              <SvgIcon width={100} height={70} />
              <View>
                <Text style={amigosEstilos.name}>{item.nombre}</Text>
                <Text style={amigosEstilos.date}>Desde: {item.desde}</Text>
                <Text style={amigosEstilos.date}>Hasta: {item.hasta}</Text>
              </View>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
};

export default AmigosScreen;