import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

const LogOutscreen = ({ navigation }) => {
  useEffect(() => {
    removeItem("userId");
    removeItem("access_token");
    navigation.navigate("Login");
  }, [navigation]);
  return <></>;
};

export default LogOutscreen;
