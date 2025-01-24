import { StyleSheet, Dimensions } from "react-native";

const registroEsrilo = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    iconContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4a4a4a',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '85%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#c4c4c4',
        marginBottom: 15,
        fontSize: 16,
        color: '#555',
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#5bc9e7',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#555',
    },
    buttonShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default registroEsrilo