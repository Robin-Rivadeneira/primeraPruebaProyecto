// App.js - Versión completa y optimizada
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Importa todas tus pantallas
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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="inicio"
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
              gestureEnabled: true,
              cardStyle: { backgroundColor: '#FFFFFF' } // Fondo blanco para todas las pantallas
            }}
          >
            {/* Vista inicial */}
            <Stack.Screen
              name="inicio"
              component={inicio}
            />

            {/* Vista del carrusel */}
            <Stack.Screen
              name="carucel"
              component={carucel}
            />

            {/* Vista del login */}
            <Stack.Screen
              name="login"
              component={login}
            />

            {/* Registro biométrico */}
            <Stack.Screen
              name="registro"
              component={RegistroBiometrico}
            />

            {/* Pasarela */}
            <Stack.Screen
              name="pasarela"
              component={pasarela}
            />

            {/* Menú principal */}
            <Stack.Screen
              name="menu"
              component={menu}
            />

            {/* Perfil del usuario */}
            <Stack.Screen
              name="perfil"
              component={Perfil}
            />

            {/* Identidad inicial */}
            <Stack.Screen
              name="identidadInicial"
              component={IdentidadInicial}
            />

            {/* Verificación de identidad */}
            <Stack.Screen
              name="verificar"
              component={ImagePickerExample}
            />

            {/* Mi identidad */}
            <Stack.Screen
              name="miIdentidad"
              component={miIdentidad}
            />

            {/* Servicios */}
            <Stack.Screen
              name="servicios"
              component={ServiciosScreen}
            />

            {/* Beneficios filtrados */}
            <Stack.Screen
              name="beneficioFiltro"
              component={BeneficiosFiltro}
            />

            {/* Beneficios */}
            <Stack.Screen
              name="BeneficiosScreen"
              component={BeneficiosScreen}
            />

            {/* Amigos */}
            <Stack.Screen
              name="amigos"
              component={AmigosScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}