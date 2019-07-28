import React, { useState } from "react";
import { Card } from "antd";
import styled, { withTheme, ThemeProps } from "styled-components";
import { Redirect } from "react-router";
import { chooseRace, chooseClass } from "../../util/utils";
import { ITheme } from "../../components/globalStyles";

interface IStyledCardProps {
  colors: {
    backgroundColor: string;
    borderColor: string;
  };
}
const StyledCard = styled(Card)`
  margin: 5px 10px 0 10px;
  width: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-color: ${(props: IStyledCardProps) => props.colors.borderColor || ""};
  background-color: ${(props: IStyledCardProps) =>
    props.colors.backgroundColor || ""};
`;

const { Meta } = Card;

const Image = styled.img`
  width: 20px;
  height: 20px;
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
interface ICardProps extends ThemeProps<ITheme> {
  role: {
    role: string;
    esoClass: IClass;
  };
}

const setColor = (role: string, theme: ITheme) => {
  switch (role) {
    case "Stamina DD": // ${props => props.theme.stamGreen};
      return {
        borderColor: ``,
        backgroundColor: `${theme.roleCardColors.StamPale}`
      };
    case "Stamina Support":
      return {
        borderColor: ``,
        backgroundColor: `${theme.roleCardColors.StamSuppPale}`
      };
    case "Magicka DD":
      return {
        borderColor: ``,
        backgroundColor: `${theme.roleCardColors.MagPale}`
      };
    case "Magicka Support":
      return {
        borderColor: ``,
        backgroundColor: `${theme.roleCardColors.MagSuppPale}`
      };
    default:
      return {
        borderColor: "",
        backgroundColor: ""
      };
  }
};

const HomeCard = ({ role, theme }: ICardProps) => {
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
      colors={setColor(role.role, theme)}
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

export default withTheme(HomeCard);
