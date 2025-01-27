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
        color: "#4A6289"
    },
    parrafo: {
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 1,
        color: "#5b749e",
    },
    card: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    cardInfo: {
        flex: 1,
    },
    button: {
        width: '100%',
        height: "20%",
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: "5%"
    },

    buttons: {
        width: '100%',
        height: "20%",
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: "20%"
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: "-15%",
        marginLeft: "40%",
        color: "#4A6289"
    },
    buttonTextG: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: "-10%",
        marginLeft: "40%",
        color: "#4A6289"
    },
})

export default identidadInicialEstilos