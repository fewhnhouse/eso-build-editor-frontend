import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Card, Popconfirm } from "antd";
import { BuildContext } from "../BuildStateContext";
const { Meta } = Card;

interface IRootCard {
  title: string;
  imageSource: string | undefined;
}

interface ICardProps extends IRootCard {
  type: "SET_RACE" | "SET_CLASS";
}

const Cover = styled.img`
  width: 48px;
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
const MyCard = ({ title, imageSource, type }: ICardProps) => {
  const [state, dispatch] = useContext(BuildContext);
  const selected =
    type === "SET_CLASS" ? state!.class === title : state!.race === title;
  const handleClick = () => {
    dispatch!({
      type,
      payload: selected ? "" : title
    });
    dispatch!({
      type: "RESET_SKILLS",
      payload: {}
    });
  };

  const confirm = () => {
    handleClick();
  };

  const cancel = () => {};

  return !selected && state!.class !== "" && type === "SET_CLASS" ? (
    <Popconfirm
      title="Are you sure you want to swap classes? This will reset all your skills."
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <StyledCard
        selected={selected}
        cover={
          <CoverContainer>
            <Cover selected={selected} src={imageSource} />
          </CoverContainer>
        }
      >
        <Meta title={title} description="This is the description" />
      </StyledCard>
    </Popconfirm>
  ) : (
    <StyledCard
      selected={selected}
      onClick={selected ? undefined : handleClick}
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

export const EsoClassCard = ({ title, imageSource }: IRootCard) => {
  const [state, dispatch] = useContext(BuildContext);

  return <MyCard title={title} imageSource={imageSource} type="SET_CLASS" />;
};

export const RaceCard = ({ title, imageSource }: IRootCard) => (
  <MyCard title={title} imageSource={imageSource} type="SET_RACE" />
);
