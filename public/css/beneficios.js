import { StyleSheet, Dimensions } from "react-native";
const beneficiosEstilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: '5%',
        color: '#4A6289',
      },
      subTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: '#5b749e',
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
        width:'95%',
      },
      benefitCard: {
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
        width:'95%',
        height: '65%'
      },
      qrContainer: {
        alignItems: "center",
        marginTop: 20,
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#4A6289',
      },
      date: {
        fontSize: 14,
        color: '#5b749e',
        width: '30%',
        marginLeft: '1%',
      },
      location: {
        fontSize: 14,
        color: "gray",
      },
})

export default beneficiosEstilos