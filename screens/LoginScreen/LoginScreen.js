import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import { Col, Text } from "../../@uiComponents";
import loginScreen from "../../assets/loginScreen.png";
import { submitLogin } from "../../@store/auth/AuthActions";

const Image = styled.Image`
  width: 80%;
  height: 40%;
  margin: 0 0 20px 0;
`;
const MyInput = styled.TextInput`
  ${(props) => props.marg && `margin: ${props.marg}`};
  width: 80%;
  height: 46px;
  color: #4e3883;
  padding: 10px;
  background-color: #ffffff;
`;
const MyButton = styled.TouchableOpacity`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007aff;
  margin-bottom: 0.6rem;
  padding: 10px 0px;
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

  return (
    <Col centerAll>
      <Image source={loginScreen} />
      <Text
        weight="700"
        color="#4E3883"
        lineHeight="22px"
        letterSpacing="0.27619px"
        size="34px"
        marg="0 0 10px 0"
      >
        Welcome
      </Text>
      <Text
        weight="700"
        color="#4E3883"
        lineHeight="22px"
        letterSpacing="0.27619px"
        size="18px"
      >
        Log In to continue
      </Text>
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
        <Text
          weight="600"
          color="#4E3883"
          lineHeight="22px"
          letterSpacing="0.27619px"
          size="18px"
          color="#ffffff"
        >
          Login
        </Text>
      </MyButton>
      <MyButton onPress={() => navigation.navigate("Register")}>
        <Text
          weight="600"
          color="#4E3883"
          lineHeight="22px"
          letterSpacing="0.27619px"
          size="18px"
          color="#ffffff"
        >
          Sign Up
        </Text>
      </MyButton>
    </Col>
  );
}
