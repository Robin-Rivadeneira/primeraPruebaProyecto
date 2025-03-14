import { StyleSheet, Dimensions } from "react-native";

const registroEsrilo = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cameraContainer: {
        width: '50%',
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 20,
        alignSelf: 'center',
        // Sombra exterior
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 15, // Para Android
        // Borde
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,0.5)'
    },
    photoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    previewImage: {
        width: '80%', // Ajusta el tamaño de la imagen
        height: '80%',
        borderRadius: 10, // Bordes redondeados
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5b749e',
        marginBottom: 20,
        width:'60%',
        textAlign:'center',
    },
    biometricButton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    biometricImage: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
    biometricImagePlaceholder: {
        width: 80,
        height: 80,
    },
    input: {
        width: '95%',
        padding: 10,
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'trasparent',
        borderRadius: 10,
        backgroundColor: 'trasparent',
        borderBottomColor: 'black'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    checked: {
        backgroundColor: '#5b749e',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 17,
        color: '#5b749e',
    },
    registerButton: {
        width: '100%',
        borderRadius: 20,
        marginTop:'10%',
    },
    registerButtonText: {
        color: '#5b749e',
        fontSize: 16,
        fontWeight: 'bold',
    },

    gradientButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default registroEsrilo