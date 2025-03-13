import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import filtroBeneficiosEstilos from "../../assets/css/filtroBeneficios";
import identidadInicialEstilos from '../../assets/css/identidad';
import GoIdentitySVG from "../assets/img/goIdentity.svg";

// Importa los datos de beneficios
import beneficiosFiltro from "../services/beneficiosFiltro.Service";

const BeneficiosFiltro = () => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Quito");
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#bed9f4", "#c4f4fd", "#ecf2ff", "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={filtroBeneficiosEstilos.container}
    >
      <View style={identidadInicialEstilos.header}>
        <GoIdentitySVG style={identidadInicialEstilos.logo} />
      </View>
      <Text style={filtroBeneficiosEstilos.titulo}>MIS BENEFICIOS</Text>

      <View style={filtroBeneficiosEstilos.filtroContainer}>
        <View style={filtroBeneficiosEstilos.filtroTi}>
          <Text style={filtroBeneficiosEstilos.filtroTitulo}>CIUDAD</Text>
        </View>
        {["Quito", "Guayaquil", "Cuenca"].map((ciudad) => (
          <View key={ciudad} style={filtroBeneficiosEstilos.radioContainer}>
            <RadioButton
              value={ciudad}
              status={ciudadSeleccionada === ciudad ? "checked" : "unchecked"}
              onPress={() => setCiudadSeleccionada(ciudad)}
              color="#4A90E2"
            />
            <Text style={filtroBeneficiosEstilos.radioLabel}>{ciudad}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={beneficiosFiltro[ciudadSeleccionada]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={filtroBeneficiosEstilos.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={filtroBeneficiosEstilos.card}
            onPress={() => navigation.navigate("BeneficiosScreen", { beneficio: item })}
          >
            {item.icono}
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

export default BeneficiosFiltro;