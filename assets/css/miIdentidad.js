import { StyleSheet, Dimensions } from "react-native";
const miIdentidadEstilos = StyleSheet.create({
    qrContainer: {
        alignItems: 'center',
        width: '75%',
        marginTop: '10%',
        borderWidth: 3,
        padding: 10,
        borderColor: '#2c3e50',
        marginLeft: '12.5%',
        borderRadius: 10,
    },
    cardText: {
        color: '#4A6289',
        fontSize: 20,
        marginBottom: '2%'
    },
    camera: {
        width: '85%',
        height: 300,
        marginVertical: 20,
        borderRadius: 500,
        marginLeft: '7.5%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 20,
        gap: 20,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderRadius: 500,
        position: 'absolute',
        width: '20%',
        top: '50%',
        left: '50%',
        textAlign: 'center'
    },
    captureButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 15,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        width: '20%',
        left: '70%'
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    cameraSection: {
        width: '70%',
        marginLeft: '15%',
        marginVertical: 20,
      },
      cameraContainer: {
        height: height * 0.3,
        borderRadius: 1000,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        borderWidth: 3,
        borderColor: '#2c3e50',
        elevation: 5,
      },
      camera: {
        flex: 1,
      },
      borderAnimationContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      },
      borderAnimation: {
        width: '120%',
        height: '120%',
      },
      cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
      },
      startButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 15,
        borderRadius: 30,
        elevation: 5,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
      },
      disabledButton: {
        backgroundColor: '#6c7c8c',
        opacity: 0.7,
      },
      startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      switchCameraButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: '#2c3e50',
        padding: 10,
        borderRadius: 1000,
        elevation: 3,
      },
      qrBorder: {
        borderWidth: 3,
        borderColor: '#2c3e50',
        borderRadius: 15,
        padding: 15,
        backgroundColor: 'white',
        elevation: 5,
      },
})

export default miIdentidadEstilos