import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import styled from "styled-components/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CartScreen from "../CartScreen/CartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import LogOutscreen from "../LogOutScreen/LogOutscreen";

const Tab = createMaterialBottomTabNavigator();

const CartCount = styled.View`
  position: absolute;
  right: -4px;
  top: -2px;
  background-color: #fd7e7e;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  width: 14px;
  height: 14px;
  font-size: 9px;
  color: #ffffff;
`;
export default function Navigation({ navigation }) {
  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);

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
            <>
              {cartData && cartData.length > 0 && (
                <CartCount>
                  <Text>{cartData.length}</Text>
                </CartCount>
              )}
              <MaterialCommunityIcons name="cart" color={color} size={24} />
            </>
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
