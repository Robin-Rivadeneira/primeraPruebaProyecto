import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Importa tus SVG
import PrimerImagenCarucel from "../public/img/primerImagenCarucel.svg";
import RegaloCarucel from "../public/img/regaloCarucel.svg";
import InvitaAmigos from "../public/img/ivitaAmigos.svg";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "Servicios ISSFA",
    description: "Accede a los servicios de supervivencia y de créditos. Tu membresía incluye una firma electrónica para estos servicios con uso ilimitado en el año.",
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
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  // Detectar cambios en el slide activo
  useEffect(() => {
    if (activeIndex === data.length - 1) {
      // Navegar después de 1 segundo en el último slide
      const timer = setTimeout(() => {
        navigation.navigate("login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { width: screenWidth }]}>
      <item.image width={200} height={200} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselDescription}>{item.description}</Text>
    </View>
  );

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5ea5dd", "#5bc9e7", "#64e6ef", "white"]}
        locations={[0.1, 0.2, 0.3, 0.5]}
        style={styles.gradient}
      >
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          keyExtractor={(_, index) => index.toString()}
        />

        <View style={styles.pagination}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index,
                  animated: true
                });
              }}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
  },
  carouselDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  pagination: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#bdc3c7',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2c3e50',
  },
});

export default Carucel;