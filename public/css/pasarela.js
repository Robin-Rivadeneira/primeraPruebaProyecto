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
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    images: {
        width: '100%',
        height: '10%',
        alignSelf: 'center',
    },
    payButton: {
        backgroundColor: '#64B5F6',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10%'
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default pasarelaEsitlos