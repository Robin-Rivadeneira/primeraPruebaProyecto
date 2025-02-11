import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Importa los SVG como componentes de React
import MultiCineSvg from "../public/img/multicines.svg";
import SmartFitSvg from "../public/img/smartFit.svg";
import EnextSvg from "../public/img/enext.svg";
import SaludSaSvg from "../public/img/saludSa.svg";

import filtroBeneficiosEstilos from "../public/css/filtroBeneficios";
import identidadInicialEstilos from '../public/css/identidad';
import GoIdentitySVG from "../public/img/goIdentity.svg";
// Datos de beneficios con sus respectivos iconos
const beneficiosData = {
  Quito: [
    { id: "1", nombre: "Multicines", icono: <MultiCineSvg width={100} height={100} />, ciudad: "Quito" },
    { id: "2", nombre: "SmartFit", icono: <SmartFitSvg width={100} height={100} />, ciudad: "Quito" },
  ],
  Guayaquil: [
    { id: "3", nombre: "Enext", icono: <EnextSvg width={100} height={100} />, ciudad: "Guayaquil" },
    { id: "4", nombre: "Saludsa", icono: <SaludSaSvg width={100} height={100} />, ciudad: "Guayaquil" },
  ],
  Cuenca: [
    { id: "5", nombre: "Multicines", icono: <MultiCineSvg width={100} height={100} />, ciudad: "Cuenca" },
    { id: "6", nombre: "Saludsa", icono: <SaludSaSvg width={100} height={100} />, ciudad: "Cuenca" },
  ],
};

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
        data={beneficiosData[ciudadSeleccionada]}
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