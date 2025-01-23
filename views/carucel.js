import React, { useState } from "react";
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import caruceles from "../public/css/inicio";
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation para la navegación

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "Servicios ISSFA",
    description:
      "Accede a los servicios de supervivencia y de créditos. Tu membresía incluye una firma electrónica para estos servicios con uso ilimitado en el año.",
    image: require("../public/img/goIdentity.png"),
  },
  {
    title: "Seguridad Digital",
    description: "Protege tu información personal con nuestras herramientas avanzadas de seguridad.",
    image: require("../public/img/goIdentity.png"),
  },
  {
    title: "Consultoría ISSFA",
    description: "Asesórate con expertos en servicios sociales y beneficios para tu familia.",
    image: require("../public/img/goIdentity.png"),
  },
];

const Carucel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation(); // Hook de navegación

  // Función para renderizar cada item del carrusel
  const renderItem = ({ item }) => (
    <View style={caruceles.carouselItem}>
      <Image source={item.image} style={caruceles.carouselImage} resizeMode="contain" />
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
    // Aquí se define a qué vista deseas navegar
    navigation.navigate('NextView'); // Cambia 'NextView' por el nombre de la vista a la que deseas ir
  };

  return (
    <View style={caruceles.container}>
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

      {/* Botón para navegar a otra vista solo cuando esté en el último ítem */}
      {activeIndex === data.length - 1 && (
        <TouchableOpacity style={caruceles.navigateButton} onPress={handleNavigate}>
          <Text style={caruceles.buttonText}>Ir a la siguiente vista</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Carucel;