import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import InstitutoSVG from "../../assets/img/instituto.svg";
import styles from "../../assets/css/app"; // Importar estilos

const Inicio = ({ navigation }) => {
  const handlePress = useCallback(() => {
    navigation.navigate("carucel");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#bed9f4', '#c4f4fd', 'rgb(236, 242, 255)', 'rgba(255, 255, 255, 0.38)']}
        locations={[0.2, 0.5, 0.7, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradieFond}
      >
        <GoIdentitySVG width="100%" style={styles.issfaLogo} />
        <InstitutoSVG width="50%" style={styles.issfaLogos} />

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <LinearGradient
            colors={['#e5ecfd', '#bdccf4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>INGRESAR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Inicio); // Evitar rerenders innecesarios