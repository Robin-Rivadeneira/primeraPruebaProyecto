import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import InstitutoSVG from "../../assets/img/instituto.svg";
import UsuarioSvg from "../../assets/img/usuarios.svg";
import LogoEjercito from "../../assets/img/ejercito.svg";
import IdentidadSVG from "../../assets/img/qr.svg";
import ServiciosSVG from "../../assets/img/servicios.svg";
import BeneficiosSVG from "../../assets/img/beneficios.svg";
import AmigosSVG from "../../assets/img/amigosMenu.svg";
import menuEstilos from '../../assets/css/menu';

// Importar lógica de negocio
import { getMenuData } from '../services/menu.Service';

export default function Menu() {
    const navigation = useNavigation();
    const [menuData, setMenuData] = useState({
        cedula: '1713489514',
        nombre: 'Gerald Orlando Moreno Jadan',
        grado: 'Teniente Coronel',
        caduca: '01/01/2030',
        imagenPerfil: '',
        imagenTarjeta: '',
    });

    // Cargar los datos del menú al iniciar
    useEffect(() => {
        const loadMenuData = async () => {
            try {
                const data = await getMenuData();
                setMenuData(data);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los datos del menú.');
            }
        };
        loadMenuData();
    }, []);

    const handPerfil = () => {
        navigation.navigate('perfil');
    };

    const handIdentidad = () => {
        navigation.navigate('identidadInicial');
    };

    const handServicos = () => {
        navigation.navigate('servicios');
    };

    const handBeneficios = () => {
        navigation.navigate('beneficioFiltro');
    };

    const handAmigos = () => {
        navigation.navigate('amigos');
    };

    const buttons = [
        { text: 'Identidad', icon: <IdentidadSVG width={60} height={60} />, link: handIdentidad },
        { text: 'Servicios', icon: <ServiciosSVG width={60} height={60} />, link: handServicos },
        { text: 'Beneficios', icon: <BeneficiosSVG width={60} height={60} />, link: handBeneficios },
        { text: 'Amigos', icon: <AmigosSVG width={60} height={60} />, link: handAmigos },
    ];

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', "white"]}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={menuEstilos.container}
        >
            {/* Header */}
            <View style={menuEstilos.header}>
                <GoIdentitySVG style={menuEstilos.logo} />
                <TouchableOpacity style={menuEstilos.menuButton} onPress={handPerfil}>
                    <Image
                        source={{ uri: `data:image/png;base64,${menuData.imagenPerfil}` }}
                        style={menuEstilos.profileImage}
                    />
                </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={menuEstilos.title}>MI ESPACIO</Text>

            {/* ID Card */}
            <View style={menuEstilos.card}>
                <View style={menuEstilos.cardHeader}>
                    <Text style={menuEstilos.cardTitle}>ISSFA</Text>
                </View>

                <View style={menuEstilos.cardContent}>
                    <View style={menuEstilos.cardImagen}>
                        <Image
                            source={{ uri: `data:image/png;base64,${menuData.imagenTarjeta}` }}
                            width='100%' height="100%"
                            resizeMode="contain"
                        />
                    </View>

                    <View style={menuEstilos.cardInfo}>
                        <View style={menuEstilos.imagenCard}>
                            <LogoEjercito width='100%' height="100%" />
                        </View>

                        <View style={menuEstilos.subida}>
                            <Text style={menuEstilos.cardText}>
                                <Text style={{ fontWeight: 'bold' }}>CÉDULA:</Text> {menuData.cedula}
                            </Text>
                            <Text style={menuEstilos.cardText}>{menuData.nombre}</Text>
                            <Text style={menuEstilos.cardText}>
                                <Text style={{ fontWeight: 'bold' }}>GRADO:</Text> {menuData.grado}
                            </Text>
                            <Text style={menuEstilos.cardText}>
                                <Text style={{ fontWeight: 'bold' }}>CADUCA:</Text> {menuData.caduca}
                            </Text>
                        </View>

                        <View style={menuEstilos.imagenCards}>
                            <InstitutoSVG width='100%' height="100%" />
                        </View>
                    </View>
                </View>
            </View>

            {/* Buttons */}
            <View style={menuEstilos.buttonsContainer}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={menuEstilos.button} onPress={button.link}>
                        {button.icon}
                        <Text style={menuEstilos.buttonText}>{button.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </LinearGradient>
    );
}