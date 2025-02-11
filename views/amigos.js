import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Importa los SVGs
import Avatar1 from "../public/img/usuarios.svg";
import Avatar2 from "../public/img/usuarios.svg";
import Avatar3 from "../public/img/usuarios.svg";
import amigosEstilos from "../public/css/amigos";

// Datos de amigos con SVG
const amigosData = [
  { id: "1", nombre: "Juan Pérez", desde: "01/01/2025", hasta: "01/01/2026", SvgIcon: Avatar1 },
  { id: "2", nombre: "Juan Pérez", desde: "01/01/2025", hasta: "01/01/2026", SvgIcon: Avatar2 },
  { id: "3", nombre: "Juan Pérez", desde: "01/01/2025", hasta: "01/01/2026", SvgIcon: Avatar3 },
];

const AmigosScreen = () => {
  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={amigosEstilos.container}
    >
      {/* Título */}
      <Text style={amigosEstilos.title}>MIS AMIGOS</Text>

      {/* Disponibles */}
      <Text style={amigosEstilos.subTitle}>Disponibles: {amigosData.length}</Text>

      {/* Lista de Amigos */}
      <FlatList
        data={amigosData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={amigosEstilos.card}>
            <item.SvgIcon width={100} height={70} />
            <View>
              <Text style={amigosEstilos.name}>{item.nombre}</Text>
              <Text style={amigosEstilos.date}>Desde: {item.desde}</Text>
              <Text style={amigosEstilos.date}>Hasta: {item.hasta}</Text>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default AmigosScreen;