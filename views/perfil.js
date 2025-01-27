import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import perfil from '../public/css/perfil';

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'LARREA PAREDES DIEGO FRANCISCO',
    cedula: '1234567890',
    grado: 'Teniente Coronel',
    caduca: '01/01/2030',
  });
  const [tempInfo, setTempInfo] = useState({ ...userInfo });

  const handleEditToggle = () => {
    if (isEditing) {
      // Actualizar la información del perfil
      setUserInfo({ ...tempInfo });
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
        <Text style={perfil.title}>MI PERFIL</Text>
      </View>

      <View style={perfil.profileCard}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=Foto' }}
          style={perfil.profileImage}
        />
        <View style={perfil.infoContainer}>
          <Text style={perfil.label}>Nombre:</Text>
          {isEditing ? (
            <TextInput
              style={perfil.input}
              value={tempInfo.name}
              onChangeText={(text) => setTempInfo({ ...tempInfo, name: text })}
            />
          ) : (
            <Text style={perfil.value}>{userInfo.name}</Text>
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

          <Text style={perfil.label}>Grado:</Text>
          {isEditing ? (
            <TextInput
              style={perfil.input}
              value={tempInfo.grado}
              onChangeText={(text) => setTempInfo({ ...tempInfo, grado: text })}
            />
          ) : (
            <Text style={perfil.value}>{userInfo.grado}</Text>
          )}

          <Text style={perfil.label}>Caduca:</Text>
          {isEditing ? (
            <TextInput
              style={perfil.input}
              value={tempInfo.caduca}
              onChangeText={(text) => setTempInfo({ ...tempInfo, caduca: text })}
            />
          ) : (
            <Text style={perfil.value}>{userInfo.caduca}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={perfil.button} onPress={handleEditToggle}>
        <Text style={perfil.buttonText}>{isEditing ? 'Actualizar' : 'Editar'}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}