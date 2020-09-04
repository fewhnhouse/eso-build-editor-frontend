import React from 'react'
import BuffMenu, { ISpecialBuff } from '../build/consumables/buff/BuffMenu'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard, Description, Image } from './Overview'
import { Typography, Divider, Card, Empty } from 'antd'
import styled from 'styled-components'
import { ITheme } from '../../components/theme'
import Scrollbars from 'react-custom-scrollbars'
import {
  AttributeTag,
  BuffTypeTag,
  QualityTag,
} from '../build/consumables/buff/BuffMenuList'

interface IBuffProps {
  context: React.Context<any>
  buff?: ISpecialBuff
  isMobile: boolean
}

const StyledBuffFlexInner = styled(Flex)`
  margin-left: ${(props) => props.theme.margins.medium};
  max-width: 600px;
`

const StyledTitle = styled(Typography.Title)`
  margin: 0;
`

const StyledFlexAttrWrap = styled(Flex)`
  width: 100%;
  margin: ${(props) => props.theme.margins.small} 0px;
`

const StyledDivider = styled(Divider)`
  margin: ${(props) => props.theme.margins.small} 0px;
`

const StyledDividerSmall = styled(Divider)`
  margin: ${(props) => props.theme.margins.mini} 0px;
`

const StyledDescription = styled(Description)`
  font-style: italic;
`

const StyledFlexWrapper = styled(Flex)`
  height: 100%;
  width: 100%;
  padding: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? '0px' : props.theme.margins.medium};
`

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  align-items: center;
`

export const BuffCard = ({ buff }: { buff: ISpecialBuff }) => (
  <Scrollbars autoHide>
    <Card>
      <Flex direction='row' align='flex-start' justify='center'>
        <Image
          src={
            buff
              ? `${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${buff.icon}`
              : ''
          }
        />
        <StyledBuffFlexInner direction='column'>
          <StyledTitle level={3}>{buff.name}</StyledTitle>
          <StyledDivider />
          <StyledFlexAttrWrap direction='row' wrap>
            <AttributeTag
              hasHealth={buff.buffDescription.includes('Health')}
              hasMagicka={buff.buffDescription.includes('Magicka')}
              hasStamina={buff.buffDescription.includes('Stamina')}
            />
            <BuffTypeTag
              isSpecialDrink={buff.buffType === 'drink' && buff.type === null}
              isSpecialFood={buff.buffType === 'food' && buff.type === null}
              isFood={buff.buffType === 'food' && buff.type !== null}
              isDrink={buff.buffType === 'drink' && buff.type !== null}
            />
            <QualityTag quality={buff.quality} />
          </StyledFlexAttrWrap>
          <Description>{buff.buffDescription}</Description>
          {buff.description && (
            <>
              <StyledDividerSmall />
              <StyledDescription newEffect>
                {buff.description}
              </StyledDescription>
            </>
          )}
        </StyledBuffFlexInner>
      </Flex>
    </Card>
  </Scrollbars>
)

export default ({ context, buff, isMobile }: IBuffProps) => {
  return (
    <StyledFlexWrapper direction='row' align='flex-start' isMobile={isMobile}>
      <MenuCard isMobile={isMobile}>
        <BuffMenu context={context} />
      </MenuCard>
      {isMobile ? (
        ''
      ) : (
        <ContentCard
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {buff ? (
            <BuffCard buff={buff} />
          ) : (
            <StyledEmpty>Select a Buff to get started.</StyledEmpty>
          )}
        </ContentCard>
      )}
    </StyledFlexWrapper>
  )
}
