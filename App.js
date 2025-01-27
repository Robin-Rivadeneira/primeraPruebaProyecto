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
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}