import styled, { css } from "styled-components/native";
import { boxStyles } from "../@styles";

const Box = styled.View`
  ${(props) => boxStyles(props, css)}
`;

export default Box;
