import styled, { css } from "styled-components/native";
import { colStyles } from "../@styles";

const Col = styled.View`
  ${(props) => colStyles(props, css)}
`;

export default Col;
