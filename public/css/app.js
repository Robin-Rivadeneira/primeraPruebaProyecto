import { StyleSheet } from "react-native";

const app = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5FF", // Fondo azul claro
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 50,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  logoGo: {
    color: "#FF6E00", // Naranja
  },
  issfaLogo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  fingerprint: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#E8F5FF", // Fondo claro del botón
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 5, // Sombra para el botón
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default app;