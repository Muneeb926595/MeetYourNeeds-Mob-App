import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Col, MyText } from "../../@uiComponents";
import StorageHelper from "../../@helpers/StorageHelper";
import loginScreen from "../../assets/loginScreen.png";
import { submitLogin } from "../../@store/auth/AuthActions";

const Image = styled.Image`
  width: 80%;
  height: 40%;
  margin: 0 0 ${wp(5)}px 0;
`;
const MyInput = styled.TextInput`
  ${(props) => props.marg && `margin: ${props.marg}`};
  width: 80%;
  height: ${wp(12.5)}px;
  color: #4e3883;
  padding: ${wp(2.5)}px;
  background-color: #ffffff;
`;
const MyButton = styled.TouchableOpacity`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007aff;
  margin-bottom: ${wp(2.5)}px;
  padding: ${wp(2.5)}px 0px;
`;

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = () => {
    if (username === "" || password === "") {
      alert("Please Enter All Fields Correctly");
    } else {
      dispatch(
        submitLogin(
          {
            userName: username,
            password: password,
          },
          navigation
        )
      );
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const userId = await StorageHelper.getItem("userId");
      const access_token = await StorageHelper.getItem("access_token");
      if (userId && access_token) {
        navigation.navigate("Navigation");
      }
    };
    checkUserAuthentication();
  }, [navigation]);

  return (
    <Col centerAll>
      <Image source={loginScreen} />
      <MyText
        weight="700"
        color="#4E3883"
        lineHeight={`${wp(5.5)}px`}
        letterSpacing="0.27619px"
        size={`${RFValue(32)}px`}
        marg={`0 0 ${wp(2)}px 0 `}
      >
        Welcome
      </MyText>
      <MyText
        weight="700"
        color="#4E3883"
        lineHeight={`${wp(5.5)}px`}
        letterSpacing="0.27619px"
        size={`${RFValue(17)}px`}
      >
        Log In to continue
      </MyText>
      <MyInput
        placeholder="Email"
        marg="40px 0 20px 0"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <MyInput
        placeholder="Password"
        marg="0 0 60px 0"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={handleLoginSubmit}
      />
      <MyButton onPress={handleLoginSubmit}>
        <MyText
          weight="600"
          color="#4E3883"
          lineHeight={`${wp(5.5)}px`}
          letterSpacing="0.27619px"
          size={`${RFValue(17)}px`}
          color="#ffffff"
        >
          Login
        </MyText>
      </MyButton>
      <MyButton onPress={() => navigation.navigate("Register")}>
        <MyText
          weight="600"
          color="#4E3883"
          lineHeight={`${wp(5.5)}px`}
          letterSpacing="0.27619px"
          size={`${RFValue(17)}px`}
          color="#ffffff"
        >
          Sign Up
        </MyText>
      </MyButton>
    </Col>
  );
}
