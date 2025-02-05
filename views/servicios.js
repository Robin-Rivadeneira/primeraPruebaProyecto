import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Para el icono del menú

const servicios = [
  {
    id: "1",
    titulo: "Servicio Supervivencia",
    // imagen: require("../assets/supervivencia.png"), // Asegúrate de agregar la imagen en 'assets'
  },
  {
    id: "2",
    titulo: "Firmar Crédito",
    // imagen: require("../assets/credito.png"), // Asegúrate de agregar la imagen en 'assets'
  },
];

const ServiciosScreen = () => {
  return (
    <LinearGradient
      colors={["#d4e9fa", "#e3f5ff", "#ffffff"]}
      style={styles.container}
    >
      {/* Botón del Menú */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#5e5e5e" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.titulo}>MIS SERVICIOS {"\n"}ISSFA</Text>

      {/* Lista de Servicios */}
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagen} style={styles.imagen} />
            <Text style={styles.cardTexto}>{item.titulo}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cardTexto: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});

export default ServiciosScreen;