import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import inicio from "./views/inicio";
import carucel from "./views/carucel";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}