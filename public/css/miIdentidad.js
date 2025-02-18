import { StyleSheet, Dimensions } from "react-native";
const miIdentidadEstilos = StyleSheet.create({
    qrContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: '10%'
    },
    cardText: {
        color: '#4A6289',
        fontSize: 20,
        marginBottom: '2%'
    },
    camera: {
        width: '85%',
        height: 300,
        marginVertical: 20,
        borderRadius: 500,
        marginLeft: '7.5%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 20,
        gap: 20,
    },
    button: {
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        width: '70%',
        top: '50%',
        left: '15%'
    },
    captureButton: {
        backgroundColor: 'rgba(20, 20, 20, 0.3)',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        width: '70%',
        left: '15%'
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default miIdentidadEstilos