import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import { Provider } from "react-redux";

import store from "./@store";
import Navigation from "./screens/Navigation/Navigation";

export default function App() {
  const Stack = createStackNavigator();
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#007aff" },
    headerTitleStyle: { color: "#ffffff" },
    headerTintColor: "#ffffff",
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={SignupScreen} />
          <Stack.Screen name="Navigation" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
