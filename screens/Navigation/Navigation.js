import { Text } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import React, { useLayoutEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CartScreen from "../CartScreen/CartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import LogOutscreen from "../LogOutScreen/LogOutscreen";
import AddNewProduct from "../../@components/AddNewProduct/AddNewProduct";

const Tab = createMaterialBottomTabNavigator();

const CartCount = styled.View`
  position: absolute;
  right: -${wp(1)}px;
  top: -${wp(0.5)}px;
  background-color: #fd7e7e;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${wp(1.5)}px;
  width: ${wp(3.5)}px;
  height: ${wp(3.5)}px;
  font-size: ${RFValue(9)}px;
  color: #ffffff;
`;
export default function Navigation({ navigation }) {
  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
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
        name="AddProduct"
        component={AddNewProduct}
        options={{
          tabBarLabel: "Add Product",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={24} />
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
