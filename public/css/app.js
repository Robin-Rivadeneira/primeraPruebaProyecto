import { StyleSheet } from "react-native";

const app = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
  },
  gradieFond: {
    width: '100%',
    height: '100%',
  },
  issfaLogo: {
    width: '100%',
    height: '30%',
    marginTop:'10%'
  },

  fingerprint: {
    width: '100%',
    height: '20%',
    marginTop:'5%'
  },
  button: {
    width: '50%',
    marginLeft:'25%',
    borderRadius: 20,
    marginTop:'5%'
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