import { StyleSheet } from "react-native";

const app = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '90%',
  },
  gradieFond: {
    width: '100%',
    height: '100%',
  },
  issfaLogo: {
    width: '80%',
    height: '20%',
    marginTop:'35%'
  },

  issfaLogos: {
    width: '100%',
    height: '20%',
    marginTop:'10%',
    marginLeft:'25%'
  },

  fingerprint: {
    width: '100%',
    height: '10%',
    marginTop:'5%'
  },
  button: {
    width: '80%',
    borderRadius: 20,
    position: 'absolute',
    bottom: '5%',
    left: '10%'
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#5b749e',
    fontSize: 25,
  },
});

export default app;