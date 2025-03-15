import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const caruceles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Añadido padding para que no quede pegado a los bordes
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 20,
    width: screenWidth * 0.8, // Reducir el ancho del item del carrusel
    height: '60%', // Ajustar la altura de cada item
    marginHorizontal: 10, // Añadir espacio entre los itemsT
    marginTop:100
  },
  carouselImage: {
    width: '90%', // Reducir el tamaño de la imagen
    height: '60%', // Reducir la altura de la imagen
    marginBottom: 15,
    backgroundColor:'white',
    borderRadius:200,
  },
  carouselTitle: {
    fontSize: 20, // Reducir el tamaño de la fuente
    fontWeight: "bold",
    color: "#5b749e",
    textAlign: "center",
    marginBottom: 8,
    marginTop:'10%'
  },
  carouselDescription: {
    fontSize: 18, // Reducir el tamaño de la fuente
    color: "#5b749e",
    textAlign: "center",
    lineHeight: 20,
    width: '80%', // Reducir el ancho de la descripción
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FF5733",
    width: 12,
    height: 12,
  },
  navigateButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default caruceles;