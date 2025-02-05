import React, { useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import PrimerImagenCarucel from "../public/img/primerImagenCarucel.svg";
import RegaloCarucel from "../public/img/regaloCarucel.svg";
import InvitaAmigos from "../public/img/ivitaAmigos.svg";
import caruceles from "../public/css/inicio";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "Servicios ISSFA",
    description:
      "Accede a los servicios de supervivencia y de créditos. Tu membresía incluye una firma electrónica para estos servicios con uso ilimitado en el año.",
    image: PrimerImagenCarucel,
  },
  {
    title: "Beneficios",
    description: "Accede a la red de beneficios, descuentos y sorteos exclusivos para los afiliados al ISSFA",
    image: RegaloCarucel,
  },
  {
    title: "Amigos ISSFA",
    description: "Invita a 5 amigos o familiares a disfrutar de la red exclusiva de beneficios ISSFA",
    image: InvitaAmigos,
  },
];

const Carucel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={caruceles.carouselItem}>
      <item.image width={200} height={200} style={caruceles.carouselImage} /> 
      <Text style={caruceles.carouselTitle}>{item.title}</Text>
      <Text style={caruceles.carouselDescription}>{item.description}</Text>
    </View>
  );

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  const handleNavigate = () => {
    navigation.navigate("login");
  };

  return (
    <View style={caruceles.container}>
      <LinearGradient
        colors={["#5ea5dd", "#5bc9e7", "#64e6ef", "white"]}
        locations={[0.1, 0.2, 0.3, 0.5]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />

        <View style={caruceles.pagination}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[caruceles.dot, activeIndex === index && caruceles.activeDot]}
            />
          ))}
        </View>

        {activeIndex === 1 && (
          <TouchableOpacity style={caruceles.navigateButton} onPress={handleNavigate}>
            <Text style={caruceles.buttonText}>Ir a la siguiente vista</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

export default Carucel;