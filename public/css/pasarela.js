import { StyleSheet, Dimensions } from "react-native";
const pasarelaEsitlos = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'left',
        width: '22%',
        height:'10%',
    },
    logo: {
        width: 100,
        height: 50,
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 20,
        color: "#4A6289"
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
        color: "#5b749e"
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "#4A6289"
    },
    images: {
        width: '100%',
        height: '10%',
        alignSelf: 'center',
    },
    payButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10%',
        width: "100%"
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5b749e',
    },

    gradientButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center',
    },
});

export default pasarelaEsitlos