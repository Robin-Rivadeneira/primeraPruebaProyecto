import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UsuarioSvg from "../public/img/usuarios.jpeg";
import LogoEjercito from "../public/img/ejercito.png";
import InstitutoSVG from "../public/img/instituto.svg"; // Asegúrate de que esta importación sea correcta

const amigos = [
  {
    id: 1,
    cedula: '1234567890',
    nombre: 'LARREA PAREDES DIEGO FRANCISCO',
    grado: 'Teniente Coronel',
    caduca: '01/01/2030',
    imagen: UsuarioSvg,
  },
  {
    id: 2,
    cedula: '0987654321',
    nombre: 'JUAN PEREZ GARCIA',
    grado: 'Coronel',
    caduca: '12/12/2025',
    imagen: UsuarioSvg,
  },
];

const VistaAmigos = () => {
  return (
    <LinearGradient
      colors={['#bed9f4', '#c4f4fd', '#ecf2ff', 'white']}
      locations={[0.2, 0.4, 0.6, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {amigos.map((amigo) => (
          <View key={amigo.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>ISSFA</Text>
            </View>
            <View style={styles.cardContent}>
              <Image source={amigo.imagen} style={styles.userImage} />
              <View style={styles.cardInfo}>
                <View style={styles.imagenCard}>
                  <Image source={LogoEjercito} style={styles.logosEjercito} />
                </View>
                <View style={styles.subida}>
                  <Text style={styles.cardText}>CÉDULA:</Text>
                  <Text style={styles.cardTexts}>{amigo.cedula}</Text>
                  <Text style={styles.cardText}>{amigo.nombre}</Text>
                  <Text style={styles.cardText}>GRADO:</Text>
                  <Text style={styles.cardTexts}>{amigo.grado}</Text>
                  <Text style={styles.cardText}>CADUCA:</Text>
                  <Text style={styles.cardTexts}>{amigo.caduca}</Text>
                </View>
                <View style={styles.imagenCards}>
                  <InstitutoSVG width='100%' height="100%" />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: 20,
  },
  card: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  imagenCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logosEjercito: {
    width: 50,
    height: 50,
  },
  subida: {
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTexts: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagenCards: {
    marginTop: 20,
  },
});

export default VistaAmigos;