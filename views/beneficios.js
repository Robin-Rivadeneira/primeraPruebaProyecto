import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import beneficiosEstilos from "../public/css/beneficios";
import DosporUnoSvg from "../public/img/dosporuno.svg";
import QuincePorciento from "../public/img/quncieporcentaje.svg";
import SmartFitSvg from "../public/img/smartFit.svg";
// Datos de beneficios con imágenes SVG
const beneficiosData = {
  Multicines: [
    {
      id: "1",
      nombre: "2x1 en entradas",
      horario: "Lunes y Jueves de 14H a 21H",
      icono: <DosporUnoSvg width={100} height={100} />,
    },
    {
      id: "2",
      nombre: "15% de descuento",
      horario: "Lunes y Jueves de 14H a 21H",
      icono: <QuincePorciento width={100} height={100} />,
    },
  ],
  SmartFit: [
    {
      id: "3",
      nombre: "Membresía 50% off",
      horario: "Lunes a Viernes de 8H a 18H",
      icono: <SmartFitSvg width={100} height={100} />,
    },
  ],
};

const BeneficiosScreen = () => {
  const route = useRoute();
  const { beneficio } = route.params;
  const beneficios = beneficiosData[beneficio.nombre] || [];
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const handleBenefitPress = (item) => {
    setSelectedBenefit(item);
  };

  return (
    <LinearGradient
      colors={["#bed9f4", "#c4f4fd", "#ecf2ff", "white"]}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={beneficiosEstilos.container}
    >
      <Text style={beneficiosEstilos.title}>Beneficios de {beneficio.nombre}</Text>

      <View style={beneficiosEstilos.card}>
        {beneficio.icono}
        <View>
          <Text style={beneficiosEstilos.name}>{beneficio.nombre}</Text>
          <Text style={beneficiosEstilos.location}>{beneficio.ciudad}</Text>
        </View>
      </View>

      <FlatList
        data={beneficios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBenefitPress(item)}>
            <View style={beneficiosEstilos.benefitCard}>
            {item.icono}
              <Text style={beneficiosEstilos.name}>{item.nombre}</Text>
              <Text style={beneficiosEstilos.date}>{item.horario}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedBenefit && (
        <View style={beneficiosEstilos.qrContainer}>
          <Text style={beneficiosEstilos.subTitle}>QR verificación:</Text>
          <QRCode value={JSON.stringify(selectedBenefit)} size={100} />
        </View>
      )}
    </LinearGradient>
  );
};

export default BeneficiosScreen;