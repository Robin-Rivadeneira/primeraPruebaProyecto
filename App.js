import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import inicio from "./views/inicio";
import carucel from "./views/carucel";
import login from "./views/login";
import RegistroBiometrico from "./views/registro";
import pasarela from "./views/pasarela";
import menu from "./views/menu";
import Perfil from "./views/perfil";
import IdentidadInicial from "./views/identidad";
import ImagePickerExample from "./views/verificarIdentidad";
import miIdentidad from "./views/miInformacion";
import ServiciosScreen from "./views/servicios";
import BeneficiosFiltro from "./views/beneficiosFiltro";
import BeneficiosScreen from "./views/beneficios";
import AmigosScreen from "./views/amigos";

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