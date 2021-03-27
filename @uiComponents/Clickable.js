import React from "react";
import styled from "styled-components/native";

const CustomClickable = styled.TouchableOpacity`
  ${(props) => props.ht && `height: ${props.ht};`}
  ${(props) => props.pad && `padding: ${props.pad};`}
  ${(props) => props.marg && `margin: ${props.marg};`}
`;

function Clickable(props) {
  return (
    <CustomClickable onPress={props.onClick} {...props}>
      {props.children}
    </CustomClickable>
  );
}

export default Clickable;
