import React, { useLayoutEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CartScreen from "../CartScreen/CartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import LogOutscreen from "../LogOutScreen/LogOutscreen";

const Tab = createMaterialBottomTabNavigator();

export default function Navigation({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerLeft: () => <></>,
    });
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogOutscreen}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="logout" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
