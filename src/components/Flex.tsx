import React from "react";
import styled from "styled-components";

export interface FlexProps {
  direction: string;
  justify: string;
  align: string;
  fluid?: boolean;
  style?: object;
  children?: React.ReactNode | React.ReactNode[];
}

const StyledFlex = styled.div`
  display: flex;
  width: ${(props: FlexProps) => (props.fluid ? "100%" : "")};
  height: ${(props: FlexProps) => (props.fluid ? "100%" : "")};
  flex-direction: ${(props: FlexProps) => props.direction || "column"};
  align-items: ${(props: FlexProps) => props.align || "center"};
  justify-content: ${(props: FlexProps) => props.justify || "center"};
`;

const Flex = ({
  direction,
  justify,
  children,
  fluid,
  style,
  align
}: FlexProps) => (
  <StyledFlex
    align={align}
    direction={direction}
    justify={justify}
    style={style}
    fluid={fluid}
  >
    {children}
  </StyledFlex>
);

export default Flex;