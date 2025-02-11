import { StyleSheet, Dimensions } from "react-native";

const loginEstilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: '5%',
        width: '60%',
        height: '30%'
    },

    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: '#5b749e',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#F9F9F9',
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%',
        marginTop: '5%',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#C0C0C0',
        borderRadius: 6,
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#FF7F00',
    },
    checkboxLabel: {
        fontSize: 18,
        color: '#5b749e',
    },
    letras: {
        fontSize: 18,
        color: '#5b749e',
        width: '100%',
        marginTop:'5%',
    },
    button: {
        width: '100%',
        borderRadius: 20,
    },
    buttonText: {
        color: '#5b749e',
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#5b749e',
        marginTop: '10%',
    },
    link: {
        color: '#6E94FF',
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

export default loginEstilos