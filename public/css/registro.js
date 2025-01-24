import { StyleSheet, Dimensions } from "react-native";

const registroEsrilo = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5b749e',
        marginBottom: 20,
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
        marginVertical: 10,
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
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    checked: {
        backgroundColor: '#5b749e',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#5b749e',
    },
    registerButton: {
        width: '50%',
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