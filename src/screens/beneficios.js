import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import beneficiosEstilos from "../../assets/css/beneficios";
import identidadInicialEstilos from '../../assets/css/identidad';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";

// Importa los datos de beneficios
import beneficiosData from "../services/beneficios.Service";

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
      <View style={identidadInicialEstilos.header}>
        <GoIdentitySVG style={identidadInicialEstilos.logo} />
      </View>
      <Text style={beneficiosEstilos.title}>Beneficios de {beneficio.nombre}</Text>
      <View style={beneficiosEstilos.card}>
        {beneficio.icono}
        <View>
          <Text style={beneficiosEstilos.name}>{beneficio.nombre}</Text>
          <Text style={beneficiosEstilos.location}>{beneficio.ciudad}</Text>
        </View>
      </View>
      <Text style={beneficiosEstilos.title}>BENEFICIOS</Text>
      <View style={beneficiosEstilos.benefitsContainer}>
        <FlatList
          data={beneficios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBenefitPress(item)}>
              <View style={beneficiosEstilos.benefitCard}>
                {item.icono}
                <View>
                  <Text style={beneficiosEstilos.name}>{item.nombre}</Text>
                  <Text style={beneficiosEstilos.date}>{item.horario}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text style={beneficiosEstilos.subTitle}>QR verificación:</Text>
      {selectedBenefit && (
        <View style={beneficiosEstilos.qrContainer}>
          <QRCode value={JSON.stringify(selectedBenefit)} size={100} />
        </View>
      )}
    </LinearGradient>
  );
};

export default BeneficiosScreen;