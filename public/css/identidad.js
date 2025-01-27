import { StyleSheet, Dimensions } from "react-native";
const identidadInicialEstilos = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "10%",
    },
    logo: {
        width: 100,
        height: 50,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 20,
    },
    parrafo: {
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
        height: "30%",
        marginTop:"5%"
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10,
    },
    cardInfo: {
        flex: 1,
    },
    cardText: {
        fontSize: 14,
        marginBottom: 5,
        width: "80%",
    },
})

export default identidadInicialEstilos