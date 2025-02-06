import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import jsQR from 'jsqr';
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../public/img/goIdentity.svg";
import InstitutoSVG from "../public/img/instituto.svg";
import UsuarioSvg from "../public/img/usuarios.svg";
import LogoEjercito from "../public/img/ejercito.svg"
import menuEstilos from '../public/css/menu';

const ImagePickerExample = () => {
    const [image, setImage] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [message, setMessage] = useState('');

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Se requieren permisos de cámara.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setQrData(null); // Reiniciar datos escaneados
            setMessage('Verificando imagen...');
            decodeQRCode(result.base64);
        }
    };

    const decodeQRCode = async (base64) => {
        try {
            const img = new Image();
            img.src = `data:image/jpeg;base64,${base64}`;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    setQrData(code.data);
                    setMessage('Código QR encontrado y decodificado.');
                } else {
                    setMessage('No se encontró un código QR en la imagen.');
                }
            };

            img.onerror = () => {
                setMessage('Error al cargar la imagen.');
            };
        } catch (error) {
            console.error('Error al decodificar:', error);
            setMessage('Error al decodificar la imagen.');
        }
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={menuEstilos.container}
        >
            <View style={styles.container}>
                <Button title="Tomar Foto" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                {message && <Text>{message}</Text>}
                {qrData && <Text>Datos del QR: {qrData}</Text>}
            </View>

            <View style={menuEstilos.card}>
                <View style={menuEstilos.cardHeader}>
                    <Text style={menuEstilos.cardTitle}>ISSFA</Text>
                </View>
                <View style={menuEstilos.cardContent}>
                    <View style={menuEstilos.cardImagen}>
                        <UsuarioSvg  width='100%' height="100%"></UsuarioSvg>
                    </View>
                    <View style={menuEstilos.cardInfo}>
                        <View style={menuEstilos.imagenCard}>
                            <LogoEjercito  width='100%' height="100%"></LogoEjercito>
                        </View>
                        <View style={menuEstilos.subida}>
                            <Text style={menuEstilos.cardText}>CÉDULA:</Text>
                            <Text style={menuEstilos.cardTexts}>1234567890</Text>
                            <Text style={menuEstilos.cardText}>LARREA PAREDES DIEGO FRANCISCO</Text>
                            <Text style={menuEstilos.cardText}>GRADO:</Text>
                            <Text style={menuEstilos.cardTexts}>Teniente Coronel</Text>
                            <Text style={menuEstilos.cardText}>CADUCA:</Text>
                            <Text style={menuEstilos.cardTexts}>01/01/2030</Text>
                        </View>
                        <View style={menuEstilos.imagenCards}>
                            <InstitutoSVG width='100%' height="100%" />
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

export default ImagePickerExample;