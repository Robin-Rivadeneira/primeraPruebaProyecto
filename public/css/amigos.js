import { StyleSheet, Dimensions } from "react-native";
const amigosEstilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4A6289",
        marginTop: '5%',
      },
      subTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: "#5b749e",
      },
      card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 2 },
        elevation: 3,
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4A6289",
      },
      date: {
        fontSize: 14,
        color: "#5b749e",
      },
})
export default amigosEstilos