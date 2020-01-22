import React, { useContext, useState } from 'react'
import { Card, Divider, Popover, Modal } from 'antd'
import styled from 'styled-components'
import { BuildContext } from '../../pages/build/BuildStateContext'
import { ISkill } from './SkillSlot'
import Flex from '../Flex'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../theme'

const StyledCard = styled(Card)`
  margin: ${props => props.theme.margins.mini} 0px;
  min-width: ${props => props.theme.widths.small};
  max-width: ${props => props.theme.widths.medium};
  width: 100%;
  position: relative;
`

const Image = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  border-radius: ${props => props.theme.icon.borderRadius};
  border: ${(props: { active: boolean }) =>
    props.active ? '2px solid #1890ff' : 'none'};
  filter: ${(props: { active: boolean }) =>
    props.active ? '' : 'grayscale()'};
`

const Icon = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  border-radius: ${props => props.theme.icon.borderRadius};
`

const IconContainer = styled.div`
  padding-right: ${props => props.theme.icon.containerPadding};
`

const RaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px ${props => props.theme.paddings.small};
  justify-content: space-between;
  align-items: center;
`

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.paddings.mini} 0px;
`

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: ${props => props.theme.colors.grey.dark};
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const CostSpan = styled.span`
  font-weight: 500;
  color: ${(props: { type: string; theme: ITheme }) =>
    props.type === 'Ultimate'
      ? props.theme.costs.ultimate
      : props.type === 'Magicka'
      ? props.theme.costs.magicka
      : props.type === 'Stamina'
      ? props.theme.costs.stamina
      : props.theme.costs.ultimate};
`

const StyledFlex = styled(Flex)`
  max-width: ${props => props.theme.widths.medium};
`

const MorphLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: 500;
  max-width: 140px;
  color: ${(props: { active: boolean; disabled: boolean }) =>
    props.active ? '#1890ff' : props.disabled ? '' : 'rgba(0,0,0,0.85)'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export interface IClass {
  class: string
  description: string
  race: string
}
interface ICardProps {
  skill: ISkill
  morph1: ISkill
  morph2: ISkill
  passive?: boolean
  ultimate?: boolean
}

const DesktopAction = ({ morph }: { morph: ISkill }) => (
  <Popover content={<SkillCardContent skill={morph} />}>
    <RaceContainer>
      <MorphLabel active disabled>
        {morph.name}
      </MorphLabel>
      <Image
        active
        title={morph.name}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${morph.icon}`}
      />
    </RaceContainer>
  </Popover>
)

const MobileAction = ({ morph }: { morph: ISkill }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(visible => !visible)
  }
  return (
    <RaceContainer onClick={toggleVisible}>
      <Modal footer={null} title={morph.name} visible={visible}>
        <SkillCardContent skill={morph} />
      </Modal>

      <MorphLabel active disabled>
        {morph.name}
      </MorphLabel>
      <Image
        active
        title={morph.name}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${morph.icon}`}
      />
    </RaceContainer>
  )
}

export const DisplaySkillCard = ({
  skill,
  morph1,
  morph2,
  passive,
}: ICardProps) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <StyledCard
      hoverable
      actions={
        passive
          ? []
          : isMobile
          ? [<MobileAction morph={morph1} />, <MobileAction morph={morph2} />]
          : [<DesktopAction morph={morph1} />, <DesktopAction morph={morph2} />]
      }
    >
      <SkillCardContent skill={skill} />
    </StyledCard>
  )
}

export default ({ skill, morph1, morph2, passive, ultimate }: ICardProps) => {
  const [state, dispatch] = useContext(BuildContext)
  const { selectedSkillLines, skillLine } = state!
  const selectedSkillLine = selectedSkillLines.find(
    line => line.id === skillLine
  )
  if (!selectedSkillLine) {
    return null
  }
  const { selectedSkills, selectedUltimate } = selectedSkillLine
  const firstActive = ultimate
    ? selectedUltimate && selectedUltimate.skillId === morph1.skillId
    : selectedSkills.find(
        slot => slot.skill && slot.skill.skillId === morph1.skillId
      ) !== undefined
  const secondActive = ultimate
    ? selectedUltimate && selectedUltimate.skillId === morph2.skillId
    : selectedSkills.find(
        slot => slot.skill && slot.skill.skillId === morph2.skillId
      ) !== undefined
  const handleFirstClick = () => {
    if (firstActive) {
      dispatch!({
        type: 'UNSELECT_MORPH',
        payload: { baseSkill: skill, morph: morph1 },
      })
    } else if (!secondActive) {
      dispatch!({
        type: 'SELECT_MORPH',
        payload: { baseSkill: skill, morph: morph1 },
      })
    } else {
      dispatch!({
        type: 'SWAP_MORPH',
        payload: { oldMorph: morph2, newMorph: morph1 },
      })
    }
  }

  const handleSecondClick = () => {
    if (secondActive) {
      dispatch!({
        type: 'UNSELECT_MORPH',
        payload: { baseSkill: skill, morph: morph2 },
      })
    } else if (!firstActive) {
      dispatch!({
        type: 'SELECT_MORPH',
        payload: { baseSkill: skill, morph: morph2 },
      })
    } else {
      dispatch!({
        type: 'SWAP_MORPH',
        payload: { oldMorph: morph1, newMorph: morph2 },
      })
    }
  }

  return (
    <StyledCard
      hoverable
      actions={
        passive
          ? []
          : [
              <Popover content={<SkillCardContent skill={morph1} />}>
                <RaceContainer onClick={handleFirstClick}>
                  <MorphLabel
                    active={firstActive || false}
                    disabled={secondActive || false}
                  >
                    {morph1.name}
                  </MorphLabel>
                  <Image
                    active={firstActive || false}
                    title={morph1.name}
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${morph1.icon}`}
                  />
                </RaceContainer>
              </Popover>,
              <Popover content={<SkillCardContent skill={morph2} />}>
                <RaceContainer onClick={handleSecondClick}>
                  <MorphLabel
                    active={secondActive || false}
                    disabled={firstActive || false}
                  >
                    {morph2.name}
                  </MorphLabel>
                  <Image
                    active={secondActive || false}
                    title={morph2.name}
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${morph2.icon}`}
                  />
                </RaceContainer>
              </Popover>,
            ]
      }
    >
      <SkillCardContent skill={skill} />
    </StyledCard>
  )
}

export const SkillCardContent = ({ skill }: { skill: ISkill }) => {
  if (!skill) {
    return null
  }
  const isMagicka = skill.cost.includes('Magicka')
  const isStamina = skill.cost.includes('Stamina')
  const isFree = skill.cost.includes('Nothing')
  return (
    <StyledFlex>
      <IconContainer>
        <Icon
          title={skill.name}
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
        />
      </IconContainer>
      <div>
        <Title>{skill.name}</Title>
        {skill.type !== 2 && (
          <Description>
            <CostSpan
              type={
                skill.type === 3
                  ? 'Ultimate'
                  : isMagicka
                  ? 'Magicka'
                  : isStamina
                  ? 'Stamina'
                  : 'Free'
              }
            >
              {isFree ? 'Free' : skill.cost}
            </CostSpan>
            {` | ${skill.range ? skill.range : skill.target}`}
          </Description>
        )}
        <StyledDivider />
        <Description>{skill.effect_1}</Description>
        {skill.effect_2 && (
          <>
            <StyledDivider />
            <Description newEffect>New Effect: {skill.effect_2}</Description>
          </>
        )}
      </div>
    </StyledFlex>
  )
}
