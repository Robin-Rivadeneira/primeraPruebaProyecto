import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import carucelEstilo from "../../assets/css/carrucel";
import dataCarucels from "../services/carusel.Service";

const { width: screenWidth } = Dimensions.get("window");

const Carucel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  // Navegar automáticamente al último slide
  useEffect(() => {
    if (activeIndex === dataCarucels.length - 1) {
      const timer = setTimeout(() => {
        navigation.navigate("login");
      }, 1000);
      return () => clearTimeout(timer); // Limpiar el temporizador
    }
  }, [activeIndex, navigation]);

  // Renderizar cada ítem del carrusel
  const renderItem = useCallback(({ item }) => (
    <View style={[carucelEstilo.carouselItem, { width: screenWidth }]}>
      <item.image width={200} height={200} />
      <Text style={carucelEstilo.carouselTitle}>{item.title}</Text>
      <Text style={carucelEstilo.carouselDescription}>{item.description}</Text>
    </View>
  ), []);

  // Manejar el scroll para actualizar el índice activo
  const handleScroll = useCallback((event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(newIndex);
  }, []);

  // Memoizar el layout de los ítems para FlatList
  const getItemLayout = useMemo(() => (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  }), []);

  return (
    <View style={carucelEstilo.container}>
      <LinearGradient
        colors={["#5ea5dd", "#5bc9e7", "#64e6ef", "white"]}
        locations={[0.1, 0.2, 0.3, 0.5]}
        style={carucelEstilo.gradient}
      >
        <FlatList
          ref={flatListRef}
          data={dataCarucels}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          getItemLayout={getItemLayout}
          keyExtractor={(_, index) => index.toString()}
        />

        <View style={carucelEstilo.pagination}>
          {dataCarucels.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                carucelEstilo.dot,
                activeIndex === index && carucelEstilo.activeDot
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Carucel); // Evitar rerenders innecesarios