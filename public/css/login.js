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
        marginBottom: 10,
        width: '100%',
    },
    imagen: {
        width: '100%'
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#5C5C5C',
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
        marginBottom: 20,
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
        color: '#6B6B6B',
    },
    letras: {
        fontSize: 18,
        color: '#6B6B6B',
        width: '100%'
    },
    button: {
        width: '50%',
        marginLeft: '25%',
        borderRadius: 20,
    },
    buttonText: {
        color: '#5b749e',
        fontSize: 25,
    },
    footerText: {
        fontSize: 16,
        color: '#6B6B6B',
        marginTop: '5%',
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