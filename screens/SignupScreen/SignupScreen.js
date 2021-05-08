import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import loginScreen from "../../assets/loginScreen.png";
import { submitRegister } from "../../@store/auth/AuthActions";
import { Col, Text } from "../../@uiComponents";

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
  margin-bottom: 10px;
  padding: 10px 0px;
`;

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupSubmit = () => {
    if (email === "") {
      alert("Please Enter Email");
    } else if (fullname === "") {
      alert("Please Enter Full Name");
    } else if (username === "") {
      alert("Please Enter User Name");
    } else if (password === "") {
      alert("Please Enter Password");
    } else {
      if (password !== confirmPassword) {
        alert("Password Didn't Matched! Please Try Again");
      } else {
        dispatch(
          submitRegister(
            {
              fullName: fullname,
              userName: username,
              email: email,
              password: password,
            },
            navigation
          )
        );
      }
    }
  };

  return (
    <Col centerAll>
      <Image source={loginScreen} />
      <MyText
        weight="600"
        color="#4E3883"
        lineHeight="22px"
        letterSpacing="0.27619px"
        size="30px"
        marg="0 0 16px 0"
      >
        Create account
      </MyText>
      <MyInput
        placeholder="Email"
        marg="0 0 10px 0"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <MyInput
        placeholder="Full Name"
        value={fullname}
        marg="0 0 10px 0"
        onChangeText={(text) => setFullName(text)}
      />
      <MyInput
        placeholder="User Name"
        value={username}
        marg="0 0 10px 0"
        onChangeText={(text) => setUserName(text)}
      />
      <MyInput
        placeholder="Password"
        secureTextEntry
        marg="0 0 10px 0"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <MyInput
        placeholder="Confirm Password"
        secureTextEntry
        marg="0 0 10px 0"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        onSubmitEditing={handleSignupSubmit}
      />
      <MyButton onPress={handleSignupSubmit}>
        <MyText
          weight="600"
          color="#4E3883"
          lineHeight="22px"
          letterSpacing="0.27619px"
          size="18px"
          color="#ffffff"
        >
          Sign Up
        </MyText>
      </MyButton>
      <MyButton onPress={() => navigation.navigate("Login")}>
        <MyText
          weight="600"
          color="#4E3883"
          lineHeight="22px"
          letterSpacing="0.27619px"
          size="18px"
          color="#ffffff"
        >
          Login
        </MyText>
      </MyButton>
    </Col>
  );
}
