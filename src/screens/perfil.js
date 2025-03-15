import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GoIdentitySVG from "../../assets/img/goIdentity.svg";
import perfil from '../../assets/css/perfil';

// Importar lógica de negocio
import { getCurrentAddress, getUserInfo } from '../services/perfil.Service';

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        lastName: '',
        cedula: '',
        direccion: '',
        celular: '',
        imagenBase64: '',
    });
    const [tempInfo, setTempInfo] = useState({ ...userInfo });

    // Cargar los datos del perfil al iniciar
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const info = await getUserInfo();
                setUserInfo(info);
                setTempInfo(info);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los datos del perfil.');
            }
        };
        loadUserInfo();
    }, []);

    const handleEditToggle = async () => {
        if (isEditing) {
            // Actualizar la información del perfil
            setUserInfo({ ...tempInfo });
            Alert.alert('Perfil actualizado', 'La información se ha guardado correctamente.');
        } else {
            // Obtener la dirección actual si está vacía
            if (!tempInfo.direccion) {
                try {
                    const address = await getCurrentAddress();
                    if (address) {
                        setTempInfo({ ...tempInfo, direccion: address });
                    }
                } catch (error) {
                    Alert.alert('Error', error.message);
                }
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <LinearGradient
            colors={['#bed9f4', '#c4f4fd', '#ecf2ff', 'white']}
            locations={[0.2, 0.4, 0.6, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={perfil.container}
        >
            <View style={perfil.header}>
                <GoIdentitySVG style={perfil.logo} />
                <Text style={perfil.title}>MI PERFIL</Text>
            </View>

            <View style={perfil.profileCard}>
                {/* Mostrar la imagen en Base64 */}
                {userInfo.imagenBase64 ? (
                    <Image
                        source={{ uri: `data:image/png;base64,${userInfo.imagenBase64}` }}
                        style={perfil.profileImage}
                    />
                ) : (
                    <Text style={perfil.profileImage}>No hay imagen disponible</Text>
                )}

                <View style={perfil.infoContainer}>
                    <Text style={perfil.label}>Nombres:</Text>
                    {isEditing ? (
                        <TextInput
                            style={perfil.input}
                            value={tempInfo.name}
                            onChangeText={(text) => setTempInfo({ ...tempInfo, name: text })}
                        />
                    ) : (
                        <Text style={perfil.value}>{userInfo.name}</Text>
                    )}

                    <Text style={perfil.label}>Apellidos:</Text>
                    {isEditing ? (
                        <TextInput
                            style={perfil.input}
                            value={tempInfo.lastName}
                            onChangeText={(text) => setTempInfo({ ...tempInfo, lastName: text })}
                        />
                    ) : (
                        <Text style={perfil.value}>{userInfo.lastName}</Text>
                    )}

                    <Text style={perfil.label}>Cédula:</Text>
                    {isEditing ? (
                        <TextInput
                            style={perfil.input}
                            value={tempInfo.cedula}
                            onChangeText={(text) => setTempInfo({ ...tempInfo, cedula: text })}
                        />
                    ) : (
                        <Text style={perfil.value}>{userInfo.cedula}</Text>
                    )}

                    <Text style={perfil.label}>Dirección:</Text>
                    {isEditing ? (
                        <TextInput
                            style={perfil.input}
                            value={tempInfo.direccion}
                            onChangeText={(text) => setTempInfo({ ...tempInfo, direccion: text })}
                        />
                    ) : (
                        <Text style={perfil.value}>{userInfo.direccion}</Text>
                    )}

                    <Text style={perfil.label}>Celular:</Text>
                    {isEditing ? (
                        <TextInput
                            style={perfil.input}
                            value={tempInfo.celular}
                            onChangeText={(text) => setTempInfo({ ...tempInfo, celular: text })}
                        />
                    ) : (
                        <Text style={perfil.value}>{userInfo.celular}</Text>
                    )}
                </View>
            </View>

            <TouchableOpacity style={perfil.button} onPress={handleEditToggle}>
                <Text style={perfil.buttonText}>{isEditing ? 'Actualizar' : 'Editar'}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}