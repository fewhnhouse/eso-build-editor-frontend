import React from 'react';
import { Card, Divider, Tag } from 'antd';
import styled from 'styled-components';
import { ISet, getItemType, getWeaponType } from './GearSlot';
import { ISetSelection } from '../pages/build/BuildStateContext';
import Flex from './Flex';

const StyledCard = styled(Card)`
  display: 'flex';
  margin: 0 auto;
  width: 450px;
  position: relative;
`;

const Container = styled.div`
  width: 350px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const SmallTitle = styled.div`
  color: rgba(0, 0, 0, 0.55);
  font-weight: 400;
  font-size: 14px;
  display: inline;
`;

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const IconImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const GlyphIconImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

interface IGearCard {
  set: ISet;
  setSelectionCount: number;
}

interface ISetTagProps {
  hasHeavyArmor: boolean;
  hasMediumArmor: boolean;
  hasLightArmor: boolean;
  traitsNeeded: boolean;
}

const ArmorTypeTag = ({
  hasHeavyArmor,
  hasMediumArmor,
  hasLightArmor,
  traitsNeeded,
}: ISetTagProps) => {
  if (traitsNeeded) {
    return null;
  } else {
    if (hasHeavyArmor && hasMediumArmor && hasLightArmor) {
      return <StyledTag color="purple">All</StyledTag>;
    } else if (hasHeavyArmor) {
      return <StyledTag color="red">Heavy</StyledTag>;
    } else if (hasMediumArmor) {
      return <StyledTag color="green">Medium</StyledTag>;
    } else {
      return <StyledTag color="blue">Light</StyledTag>;
    }
  }
};

const totalBonus = (set: ISet) => {
  if (set.bonus_item_5 !== null || set.bonus_item_4 !== null) {
    return [2, 3, 4, 5];
  } else if (set.bonus_item_4 !== null) {
    return [2, 3, 4];
  } else if (set.bonus_item_3 !== null) {
    return [2, 3];
  } else if (set.bonus_item_2 !== null) {
    return [2];
  } else return [1];
};

export default ({ set, setSelectionCount }: IGearCard) => {
  return (
    <StyledCard hoverable title={set.name}>
      <StyledTag color="#1890ff">{set.type}</StyledTag>
      <ArmorTypeTag
        hasHeavyArmor={set.has_heavy_armor === 1}
        hasMediumArmor={set.has_medium_armor === 1}
        hasLightArmor={set.has_light_armor === 1}
        traitsNeeded={set.traits_needed !== null}
      />
      <Description>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {totalBonus(set).map(count => (
            <span
              key={count}
              style={{
                fontWeight: count <= setSelectionCount ? 'bold' : 'normal',
              }}
            >
              {count} pcs: {set && set[`bonus_item_${count}`]}
            </span>
          ))}
        </div>
      </Description>
    </StyledCard>
  );
};

interface IGearCardContent {
  gear: ISetSelection;
  setSelectionCount: number;
}

export const GearCardContent = ({
  gear,
  setSelectionCount,
}: IGearCardContent) => {
  const gearTypeTag = (gearType: string) => {
    switch (gearType) {
      case 'lightarmor':
        return <StyledTag color="blue">Light</StyledTag>;
      case 'mediumarmor':
        return <StyledTag color="green">Medium</StyledTag>;
      case 'heavyarmor':
        return <StyledTag color="red">Heavy</StyledTag>;
      case 'onehanded':
        return <StyledTag color="#108ee9">Onehanded</StyledTag>;
      case 'twohanded':
        return <StyledTag color="#108ee9">Twohanded</StyledTag>;
      default:
        return '';
    }
  };

  return (
    <Container>
      <Title style={{display: "flex", justifyContent: "space-between"}}>
        {gear.selectedSet ? gear.selectedSet.name : 'Set name'}{' '}
        {gear.type ? (
          <SmallTitle>
            {getItemType(gear.type)}
            {gear.weaponType ? ` - ${getWeaponType(gear.weaponType)}` : ''}
          </SmallTitle>
        ) : (
          ''
        )}
      </Title>
      {gear.type ? gearTypeTag(gear.type) : ''}
      <StyledTag color="#108ee9">
        {gear.selectedSet ? gear.selectedSet.type : 'No type'}
      </StyledTag>
      <Divider style={{ margin: '5px 0px' }} />
      <Description>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {gear.selectedSet ? (
            totalBonus(gear.selectedSet).map(count => (
              <span
                key={count}
                style={{
                  fontWeight: count <= setSelectionCount ? 'bold' : 'normal',
                }}
              >
                {count} pcs:{' '}
                {gear.selectedSet && gear.selectedSet[`bonus_item_${count}`]}
              </span>
            ))
          ) : (
            <span />
          )}
        </div>
      </Description>
      <Divider style={{ margin: '5px 0px' }} />
      <Flex direction="column" justify="space-around" align="flex-start">
        <Description
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            margin: '5px 0px',
          }}
        >
          <Flex direction="row" justify="flex-start" align="center">
            {gear.trait ? (
              <IconImg
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/traits/${encodeURI(
                  gear.trait.icon
                )}`}
              />
            ) : (
              'Trait not selected.'
            )}
            <b>{gear.trait ? gear.trait.type : ''}</b>
          </Flex>
          <span style={{ color: 'rgba(0,0,0,0.45)' }}>
            {gear.trait ? gear.trait.description : ''}
          </span>
        </Description>
        <Divider style={{ margin: '5px 0px' }} />
        <Description
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            margin: '5px 0px',
          }}
        >
          <Flex direction="row" justify="flex-start" align="center">
            {gear.glyph ? (
              <GlyphIconImg
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/glyphs/${encodeURI(
                  gear.glyph.icon
                )}`}
                style={{ marginRight: 5 }}
              />
            ) : (
              'Glyph not selected.'
            )}
            <b>{gear.glyph ? gear.glyph.type : ''}</b>
          </Flex>
          <span style={{ color: 'rgba(0,0,0,0.45)' }}>
            {gear.glyph ? gear.glyph.description : ''}
          </span>
        </Description>
      </Flex>
    </Container>
  );
};
