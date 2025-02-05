import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const beneficiosData = [
  {
    id: "1",
    titulo: "2x1",
    descripcion: "Lunes y Jueves de 14h a 21h",
    // imagen: require(""),
    // qr: require(""),
  },
  {
    id: "2",
    titulo: "15%",
    descripcion: "Lunes y Jueves de 16h a 23h",
    // imagen: require(""),
    // qr: require(""),
  },
];

const BeneficiosScreen = () => {
  const [qrVisible, setQrVisible] = useState(false);
  const [qrSeleccionado, setQrSeleccionado] = useState(null);

  const mostrarQR = (qr) => {
    setQrSeleccionado(qr);
    setQrVisible(true);
  };

  return (
    <LinearGradient colors={["#d4e9fa", "#e3f5ff", "#ffffff"]} style={styles.container}>
      {/* Botón del Menú */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#5e5e5e" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.titulo}>MIS BENEFICIOS</Text>

      {/* Tarjeta del Comercio */}
      <View style={styles.card}>
        <Image style={styles.comercioImg} />
        <View style={styles.comercioInfo}>
          <Text style={styles.comercioNombre}>Multicines</Text>
          <Text style={styles.comercioCiudad}>Quito</Text>
        </View>
      </View>

      {/* Lista de Beneficios */}
      <Text style={styles.subtitulo}>Beneficios:</Text>
      {beneficiosData.map((beneficio) => (
        <TouchableOpacity
          key={beneficio.id}
          style={styles.beneficioCard}
          onPress={() => mostrarQR(beneficio.qr)}
        >
          <Image source={beneficio.imagen} style={styles.beneficioImg} />
          <View>
            <Text style={styles.beneficioTitulo}>{beneficio.titulo}</Text>
            <Text style={styles.beneficioDescripcion}>{beneficio.descripcion}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal para mostrar QR */}
      <Modal visible={qrVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.qrTitulo}>QR Verificación</Text>
            <Image source={qrSeleccionado} style={styles.qrImg} />
            <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.cerrarBtn}>
              <Text style={styles.cerrarTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comercioImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  comercioInfo: {
    flexDirection: "column",
  },
  comercioNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  comercioCiudad: {
    fontSize: 14,
    color: "#666",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  beneficioCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  beneficioImg: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  beneficioTitulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  beneficioDescripcion: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  qrTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrImg: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  cerrarBtn: {
    backgroundColor: "#FFA726",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cerrarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BeneficiosScreen;