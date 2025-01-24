import React, { useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import caruceles from "../public/css/inicio"; // Ruta a tu archivo de estilos
import { useNavigation } from "@react-navigation/native"; // Para navegación
import { LinearGradient } from "expo-linear-gradient";

// Importamos los SVG como componentes
import PrimerImagenCarucel from "../public/img/primerImagenCarucel.svg";
import RegaloCarucel from "../public/img/regaloCarucel.svg";
import InvitaAmigos from "../public/img/ivitaAmigos.svg";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "Servicios ISSFA",
    description:
      "Accede a los servicios de supervivencia y de créditos. Tu membresía incluye una firma electrónica para estos servicios con uso ilimitado en el año.",
    image: PrimerImagenCarucel, // SVG componente
  },
  {
    title: "Beneficios",
    description: "Accede a la red de beneficios, descuentos y sorteos exclusivos para los afiliados al ISSFA",
    image: RegaloCarucel, // SVG componente
  },
  {
    title: "Amigos ISSFA",
    description: "Invita a 5 amigos o familiares a disfrutar de la red exclusiva de beneficios ISSFA",
    image: InvitaAmigos, // SVG componente
  },
];

const Carucel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation(); // Hook para la navegación

  // Función para renderizar cada item del carrusel
  const renderItem = ({ item }) => (
    <View style={caruceles.carouselItem}>
      <item.image width={200} height={200} style={caruceles.carouselImage}/> {/* Renderiza el SVG */}
      <Text style={caruceles.carouselTitle}>{item.title}</Text>
      <Text style={caruceles.carouselDescription}>{item.description}</Text>
    </View>
  );

  // Función para cambiar el índice activo
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  // Función para navegar a otra vista
  const handleNavigate = () => {
    navigation.navigate("login"); // Cambia 'login' por la ruta de la vista a la que deseas ir
  };

  return (
    <View style={caruceles.container}>
      <LinearGradient
        colors={["#5ea5dd", "#5bc9e7", "#64e6ef", "white"]} // Colores del gradiente
        locations={[0.1, 0.2, 0.3, 0.5]} // Posiciones de los colores
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Carrusel usando FlatList */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />

        {/* Indicadores de posición del carrusel */}
        <View style={caruceles.pagination}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[caruceles.dot, activeIndex === index && caruceles.activeDot]}
            />
          ))}
        </View>

        {/* Botón para navegar a otra vista solo cuando esté en el segundo ítem */}
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