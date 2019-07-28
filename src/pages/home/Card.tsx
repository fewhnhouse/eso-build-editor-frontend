import React, { useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Redirect } from "react-router";
import { chooseRace, chooseClass } from "../../util/utils";

const StyledCard = styled(Card)`
  margin: 5px 10px 0 10px;
  width: 250px;
  position: relative;
  border-color: ${(props: { borderColor: string }) => props.borderColor || ""};
`;

const { Meta } = Card;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const RaceImage = styled.img`
  height: 18px;
  width: 18px;
`;

const MyAvatar = styled.img`
  width: 26px;
  height: 26px;
`;

const RaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

export interface IClass {
  class: string;
  description: string;
  race: string;
}
interface ICardProps {
  role: {
    role: string;
    esoClass: IClass;
  };
}

const borderColor = (role: string ) => {
  switch (role) {
    case "Stamina DD":
      return "lightgreen";
    case "Stamina Support":
      return "green";
    case "Magicka DD":
      return "cyan";
    case "Magicka Support":
      return "yellow";
    default:
      return "";
  }
}

export default ({ role }: ICardProps) => {
  const { esoClass } = role;
  const [redirect, setRedirect] = useState(false);
  const handleClick = () => {
    setRedirect(true);
  };
  return redirect ? (
    <Redirect push to={`/details/${esoClass.class}`} />
  ) : (
    <StyledCard
      onClick={handleClick}
      borderColor={borderColor(role.role)}
      hoverable
      actions={[
        <RaceContainer>
          {esoClass.race}
          <Image title={esoClass.race} src={chooseRace(esoClass.race)} />
        </RaceContainer>,
        <RaceContainer>
          {esoClass.race}
          <Image title={esoClass.race} src={chooseRace(esoClass.race)} />
        </RaceContainer>
      ]}
    >
      <Meta
        avatar={
          <MyAvatar title={esoClass.class} src={chooseClass(esoClass.class)} />
        }
        style={{ textAlign: "left" }}
        title={esoClass.class}
        description={esoClass.description}
      />
    </StyledCard>
  );
};
