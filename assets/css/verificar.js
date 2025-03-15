import { StyleSheet, Dimensions } from "react-native";
const BerficarEstilos = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A6289',
        textAlign: 'center',
        marginVertical: 20,
    },
    verifyButton: {
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 20,
        width: '80%',
    },
    verifyButtonText: {
        color: '#5b749e',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cameraContainer: {
        width: '60%',
        aspectRatio: 1,
        borderRadius: 1000,
        overflow: 'hidden',
        marginVertical: 20,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'relative', // Para posicionar la animación y el texto
    },
    animationContainer: {
        ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio del contenedor de la cámara
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Asegura que esté sobre la cámara
    },
    animation: {
        width: '100%', // Tamaño de la animación
        height: '90%',
        position: 'absolute'
    },
    scanningText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 20, // Espacio entre la animación y el texto
    },
    cardContainer: {
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default BerficarEstilos;