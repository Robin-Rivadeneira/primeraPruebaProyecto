import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import UsuarioSvg from "../public/img/usuarios.svg";
import GoIdentitySVG from "../public/img/goIdentity.svg";
import perfil from '../public/css/perfil';

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'DIEGO FRANCISCO',
    lastName: 'LARREA PAREDES',
    cedula: '1234567890',
    direccion: '',
    celular: '0976289216',
  });
  const [tempInfo, setTempInfo] = useState({ ...userInfo });

  const handleEditToggle = async () => {
    if (isEditing) {
      // Actualizar la información del perfil
      setUserInfo({ ...tempInfo });
    } else {
      // Obtener la dirección actual
      const address = await getCurrentAddress();
      if (address) {
        setTempInfo({ ...tempInfo, direccion: address });
      }
    }
    setIsEditing(!isEditing);
  };

  const getCurrentAddress = async () => {
    try {
      // Solicitar permisos
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Es necesario otorgar permisos de ubicación para completar este campo.');
        return null;
      }

      // Obtener ubicación actual
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Obtener dirección desde las coordenadas
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const { street, city, region, postalCode } = reverseGeocode[0];
        return `${street}, ${city}, ${region}, ${postalCode}`;
      } else {
        return 'Dirección no encontrada';
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
      return null;
    }
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
        <UsuarioSvg style={perfil.profileImage}></UsuarioSvg>
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