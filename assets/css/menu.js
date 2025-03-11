import { StyleSheet, Dimensions } from "react-native";
const menuEstilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "10%",
  },
  logo: {
    width: 100,
    height: 50,
  },
  menuButton: {
    width: '25%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
    color: "#4A6289"
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    height: "35%",
  },
  cardHeader: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },

  cardImagen: {
    width:'30%',
    height: '90%',
    marginTop: '-3%',
  },

  imagenCard: {
    width: '30%',
    height: "30%",
    marginLeft: "72%",
    marginTop: "0%"
  },

  imagenCards: {
    width: '30%',
    height: "30%",
    position: 'absolute',
    left: '70%',
    bottom: '5%'
  },

  profileImage: {
    width: "25%",
    height: "80%",
    borderRadius: 40,
    marginRight: 10,
  },

  cardInfo: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 1,
    width: "60%",
    color: "#4A6289",
    paddingLeft: '5%',
  },

  cardTexts: {
    fontSize: 14,
    width: "80%",
    color: "#5b749e"
  },

  subida: {
   position: 'absolute',
  },

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#4A6289"
  },
});

export default menuEstilos