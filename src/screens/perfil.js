import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UsuarioSvg from "../assets/img/usuarios.svg";
import GoIdentitySVG from "../assets/img/goIdentity.svg";
import perfil from '../../assets/css/perfil';

// Importar lógica de negocio
import { getCurrentAddress, initialUserInfo } from '../services/perfil.Service';

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [tempInfo, setTempInfo] = useState({ ...initialUserInfo });

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
        <UsuarioSvg style={perfil.profileImage} />
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