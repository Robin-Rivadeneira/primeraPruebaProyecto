import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

const beneficiosData = {
  Quito: [
    { id: "1", nombre: "Multicines" },
    { id: "2", nombre: "Smart Fit" },
  ],
  Guayaquil: [
    { id: "3", nombre: "Enext" },
    { id: "4", nombre: "Saludsa" },
  ],
  Cuenca: [
    { id: "5", nombre: "Multicines" },
    { id: "6", nombre: "Saludsa" },
  ],
};

const BeneficiosFiltro = () => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Quito");

  return (
    <LinearGradient colors={["#d4e9fa", "#e3f5ff", "#ffffff"]} style={styles.container}>
      {/* Botón del Menú */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#5e5e5e" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.titulo}>MIS BENEFICIOS</Text>

      {/* Filtro de Ciudad */}
      <View style={styles.filtroContainer}>
        <Text style={styles.filtroTitulo}>CIUDAD</Text>
        {["Quito", "Guayaquil", "Cuenca"].map((ciudad) => (
          <View key={ciudad} style={styles.radioContainer}>
            <RadioButton
              value={ciudad}
              status={ciudadSeleccionada === ciudad ? "checked" : "unchecked"}
              onPress={() => setCiudadSeleccionada(ciudad)}
              color="#4A90E2"
            />
            <Text style={styles.radioLabel}>{ciudad}</Text>
          </View>
        ))}
      </View>

      {/* Lista de Beneficios */}
      <FlatList
        data={beneficiosData[ciudadSeleccionada]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagen} style={styles.imagen} />
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
  filtroContainer: {
    backgroundColor: "#FFA726",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  filtroTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  radioLabel: {
    fontSize: 16,
    color: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});

export default BeneficiosFiltro;