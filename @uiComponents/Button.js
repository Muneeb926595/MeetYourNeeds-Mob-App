import React from "react";
import styled, { css } from "styled-components/native";
import { buttonStyles } from "../@styles";
import { Text } from "../@uiComponents";

const StyledButton = styled.TouchableOpacity`
  ${(props) => buttonStyles(props, css)}
`;

const MyButton = (props) => {
  const { onClick, disabled, color, black, text } = props;

  return (
    <StyledButton onPress={onClick} {...props}>
      {props.text && (
        <Text
          bold
          color={disabled ? "gray" : color || (black ? "#000000" : "#ffffff")}
          style={{
            marginLeft: icon ? 14 : 0,
            marginRight: props.rightIcon ? 5 : 0,
          }}
          size={props.textSize || "14px"}
        >
          {text}
        </Text>
      )}
    </StyledButton>
  );
};

export default MyButton;
