import { StyleSheet, Dimensions } from "react-native";
const perfil = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'left',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 50,
        marginTop:"5%"
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A6289',
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A6289',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
        color: '#5b749e',
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        color: '#5b749e',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default perfil