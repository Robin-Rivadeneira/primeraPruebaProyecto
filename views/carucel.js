import React, { useState } from "react";
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import caruceles from "../public/css/inicio";  // Ruta a tu archivo de estilos
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation para la navegación
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "Servicios ISSFA",
    description:
      "Accede a los servicios de supervivencia y de créditos. Tu membresía incluye una firma electrónica para estos servicios con uso ilimitado en el año.",
    image: require("../public/img/primerImagenCarucel.png"),
  },
  {
    title: "Beneficios",
    description: "Accede a la red de beneficios, descuentos y sorteos exclusivos para los afiliados al ISSFA",
    image: require("../public/img/regaloCarucel.png"),
  },
  {
    title: "Amigos ISSFA",
    description: "Invita a 5 amigos o familiares a disfrutar de la  red de exclusiva de beneficios ISSFA",
    image: require("../public/img/ivitaAmigos.png"),
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
      <LinearGradient
        colors={['#5ea5dd', '#5bc9e7', '#64e6ef', 'white']} // Colores del gradiente
        locations={[0, 0.2, 0.47, 0.2]} // Posiciones de los colores
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
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
        {activeIndex === 1 && (  // Cambié la condición a `activeIndex === 1`
          <TouchableOpacity style={caruceles.navigateButton} onPress={handleNavigate}>
            <Text style={caruceles.buttonText}>Ir a la siguiente vista</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

export default Carucel;