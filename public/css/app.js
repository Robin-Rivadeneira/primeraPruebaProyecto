import { StyleSheet } from "react-native";

const app = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradieFond: {
    width: '100%',
    height: '100%',
  },
  issfaLogo: {
    width: '100%',
    height: '30%',
    marginBottom: 30,
  },
  fingerprint: {
    width: '100%',
    height: '15%',
    marginBottom: 30,
  },
  button: {
    width: '50%',
    marginLeft:'25%',
    borderRadius: 20,
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