
import { StyleSheet, Dimensions } from "react-native";
const ingresarEstilos = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginVertical: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraCircleContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    cameraPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraPlaceholderText: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: 'bold',
    },
});


export default ingresarEstilos