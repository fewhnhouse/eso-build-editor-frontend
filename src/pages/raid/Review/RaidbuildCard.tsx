import React, { useState } from 'react';
import { Card } from 'antd';
import styled, { withTheme, ThemeProps } from 'styled-components';
import { Redirect } from 'react-router';
import { ITheme } from '../../../components/globalStyles';

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
  border-color: ${(props: IStyledCardProps) => props.colors.borderColor || ''};
  background-color: ${(props: IStyledCardProps) =>
    props.colors.backgroundColor || ''};
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

interface ICardProps extends ThemeProps<ITheme> {
  description: string;
  race: string;
  role: string;
  esoClass: string;
}

const setColor = (role: string, theme: ITheme) => {
  switch (role) {
    case 'Stamina DD': // ${props => props.theme.stamGreen};
      return {
        borderColor: `${theme.roleCardColors.StamDD}`,
        backgroundColor: ``,
      };
    case 'Stamina Support':
      return {
        borderColor: `${theme.roleCardColors.StamSupp}`,
        backgroundColor: ``,
      };
    case 'Magicka DD':
      return {
        borderColor: `${theme.roleCardColors.MagDD}`,
        backgroundColor: ``,
      };
    case 'Magicka Support':
      return {
        borderColor: `${theme.roleCardColors.MagSupp}`,
        backgroundColor: ``,
      };
    default:
      return {
        borderColor: '',
        backgroundColor: '',
      };
  }
};

const HomeCard = ({ race, role, esoClass, description, theme }: ICardProps) => {
  const [redirect, setRedirect] = useState(false);
  const handleClick = () => {
    setRedirect(true);
  };
  return redirect ? (
    <Redirect push to={`/details/${esoClass}`} />
  ) : (
    <StyledCard
      onClick={handleClick}
      colors={setColor(role, theme)}
      hoverable
      actions={[
        <RaceContainer>
          <Image
            title={esoClass}
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${esoClass}`}
          />
        </RaceContainer>,
        <RaceContainer>
          <Image
            title={race}
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${race}`}
          />
        </RaceContainer>,
      ]}
    >
      <Meta
        avatar={
          <MyAvatar
            title={esoClass}
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${esoClass}`}
          />
        }
        style={{ textAlign: 'left' }}
        title={esoClass}
        description={description}
      />
    </StyledCard>
  );
};

export default withTheme(HomeCard);
