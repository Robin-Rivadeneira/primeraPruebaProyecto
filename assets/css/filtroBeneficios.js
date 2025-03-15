import { StyleSheet, Dimensions } from "react-native";
const filtroBeneficiosEstilos = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
      },
      titulo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 20,
        color: "#4A6289",
      },
      filtroContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        color: '#4A6289',
        width: '80%',
        marginLeft: '10%'
      },
      filtroTi:{
        width: '100%',
        height: '15%',
        padding: '1%',
        backgroundColor: '#FFA726',
        borderRadius:10,
      },
      filtroTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 5,
      },
      radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
      },
      radioLabel: {
        fontSize: 16,
        color: "#5b749e",
      },
      row: {
        justifyContent: "space-between",
      },
      card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        height: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      imagen: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        backgroundColor: 'blue'
      },
})
export default filtroBeneficiosEstilos