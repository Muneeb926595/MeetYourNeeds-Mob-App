import React from "react";
import styled, { css } from "styled-components/native";
import { textStyles } from "../@styles";

const StyledText = styled.Text`
  ${(props) => textStyles(props, css)}
`;

const MyText = (props) => {
  return <StyledText {...props} onPress={props.onClick} />;
};

export default MyText;
