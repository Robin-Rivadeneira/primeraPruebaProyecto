import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import inicio from "./src/screens/inicio";
import carucel from "./src/screens/carucel";
import login from "./src/screens/login";
import RegistroBiometrico from "./src/screens/registro";
import pasarela from "./src/screens/pasarela";
import menu from "./src/screens/menu";
import Perfil from "./src/screens/perfil";
import IdentidadInicial from "./src/screens/identidad";
import ImagePickerExample from "./src/screens/verificarIdentidad";
import miIdentidad from "./src/screens/miInformacion";
import ServiciosScreen from "./src/screens/servicios";
import BeneficiosFiltro from "./src/screens/beneficiosFiltro";
import BeneficiosScreen from "./src/screens/beneficios";
import AmigosScreen from "./src/screens/amigos";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="inicio">
        {/* Vista inicial */}
        <Stack.Screen
          name="inicio"
          component={inicio}
          options={{ headerShown: false }}
        />
        {/* Vista del carrusel */}
        <Stack.Screen
          name="carucel"
          component={carucel}
          options={{ headerShown: false }}
        />
        {/* Vista del login */}
        <Stack.Screen
          name="login"
          component={login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registro"
          component={RegistroBiometrico}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pasarela"
          component={pasarela}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="menu"
          component={menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="identidadInicial"
          component={IdentidadInicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verificar"
          component={ImagePickerExample}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="miIdentidad"
          component={miIdentidad}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="servicios"
          component={ServiciosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="beneficioFiltro"
          component={BeneficiosFiltro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeneficiosScreen"
          component={BeneficiosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="amigos"
          component={AmigosScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}