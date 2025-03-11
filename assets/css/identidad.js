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
        marginVertical: 10,
        color: "#4A6289"
    },
    parrafo: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        marginVertical: 1,
        color: "#5b749e",
        marginBottom:'10%'
    },
    card: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    cardInfo: {
        flex: 1,
    },
    imagenCard:{
        width: '55%',
    },

    imagenCards:{
        width: '30%',
        height: '100%',
        marginTop: '-12.5%',
        marginLeft: '20%',
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
        marginTop: "-20%",
        marginLeft: "60%",
        color: "#4A6289",
        width: '40%'
    },
    buttonTextG: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: "-20%",
        marginLeft: "60%",
        color: "#4A6289",
        width: '40%'
    },
})

export default identidadInicialEstilos