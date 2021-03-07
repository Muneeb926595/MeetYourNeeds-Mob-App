import styled, { css } from "styled-components/native";
import { rowStyles } from "../@styles";

const Row = styled.View`
  ${(props) => rowStyles(props)}
`;

export default Row;
