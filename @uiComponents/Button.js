import React from "react";
import styled, { css } from "styled-components/native";
import { buttonStyles } from "../@styles";
import { MyText } from "../@uiComponents";

const StyledButton = styled.TouchableOpacity`
  ${(props) => buttonStyles(props, css)}
`;

const MyButton = (props) => {
  const { onClick, disabled, color, black, text } = props;
  return (
    <StyledButton onPress={onClick} {...props}>
      {props.text && (
        <MyText
          bold
          color={color || (black ? "#000000" : "#ffffff")}
          size={props.textSize || "14px"}
        >
          {text}
        </MyText>
      )}
    </StyledButton>
  );
};

export default MyButton;
