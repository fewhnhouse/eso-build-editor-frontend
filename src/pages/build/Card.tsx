import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
const { Meta } = Card;
interface ICardProps {
  title: string;
  imageSource: string | undefined;
}

const Cover = styled.img`
  width:48px;
  height: 48px;
  transform: ${(props: IMetaProps) =>
    props.selected ? "scale(1.3) translate(0px, 20px)" : "scale(1)"};
  filter: invert();
  transition: transform 0.5s ease-in-out;

`;

interface IMetaProps {
  selected: boolean;
}

const CoverContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  padding: 20px;

`;

const StyledCard = styled(Card)`
  margin: 20px;
  background: ${(props: IMetaProps) =>
    props.selected ? "rgba(0, 0, 0,0.1)" : "white"};
  border-color: ${(props: IMetaProps) => (props.selected ? "#1890ff" : "")};
`;
export default ({ title, imageSource }: ICardProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(selected => !selected);
  };
  return (
    <StyledCard
      selected={selected}
      onClick={handleClick}
      cover={
        <CoverContainer>
          <Cover selected={selected} src={imageSource} />
        </CoverContainer>
      }
    >
      <Meta title={title} description="This is the description" />
    </StyledCard>
  );
};
