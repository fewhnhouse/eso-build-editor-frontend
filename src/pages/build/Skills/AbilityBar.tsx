import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Divider, Icon } from 'antd'
import { BuildContext, ISkillSelection } from '../BuildStateContext'
import SkillView from '../../../components/SkillView'
import { ISkill } from '../../../components/SkillSlot'
import { useDrop } from 'react-dnd'
import Flex from '../../../components/Flex'

export const ABILITY_BAR_ONE = 'abilityBar1'
export const ABILITY_BAR_TWO = 'abilityBar2'
export const ACTIVE_BAR = 'activeBar'
export const ACTIVE_ULTIMATE = 'activeUltimate'
export const ULTIMATE_ONE = 'ultimate1'
export const ULTIMATE_TWO = 'ultimate2'

const AbilityBar = styled(Flex)`
  height: 100px;
  width: 100%;
`

const StyledAbilityFlex = styled(Flex)`
  height: 100%;
`

const AbilityBarContainer = styled(Flex)`
  flex: 1;
  height: 100%;
  padding: ${props => props.theme.paddings.large};
  max-width: ${props => props.theme.widths.large};
  background: white;
`

const TrashContainer = styled.div`
  background: #fafafa;
  border: 1px dashed
    ${(props: { hasTrash: boolean }) =>
      props.hasTrash ? '#40a9ff' : '#d9d9d9'};
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => props.theme.widths.small};
  height: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledIcon = styled(Icon)`
  font-size: 30px;
  color: ${(props: { isOver: boolean }) =>
    props.isOver ? '#40a9ff' : 'rgb(155,155,155)'};
`

export default () => {
  const [state, dispatch] = useContext(BuildContext)
  const [activeBarSkills, setActiveBarSkills] = useState<ISkillSelection[]>([])
  const [activeUltimate, setActiveUltimate] = useState<ISkill | undefined>(
    undefined
  )
  const {
    skillLine,
    selectedSkillLines,
    newBarOne,
    newBarTwo,
    ultimateOne,
    ultimateTwo,
  } = state!

  const [{ isOver }, drop] = useDrop({
    accept: ['ultimate', 'skill'],
    drop: (item: any, monitor) => {
      if (item.type === 'ultimate') {
        dispatch!({
          type: 'REMOVE_ULTIMATE',
          payload: { barIndex: item.abilityBar },
        })
      } else {
        dispatch!({
          type: 'REMOVE_ABILITY',
          payload: { barIndex: item.abilityBar, skill: item.skill },
        })
      }
      dispatch!({
        type: 'SET_HAS_TRASH',
        payload: { hasTrash: false },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })

  useEffect(() => {
    const selectedSkillLine = selectedSkillLines.find(
      line => line.id === skillLine
    )
    if (selectedSkillLine) {
      const { selectedSkills, selectedUltimate } = selectedSkillLine
      setActiveBarSkills(selectedSkills)
      setActiveUltimate(selectedUltimate)
    }
  }, [selectedSkillLines, skillLine])
  return (
    <AbilityBarContainer direction='column' align='center'>
      <StyledAbilityFlex
        direction='column'
        justify='space-around'
        align='center'
      >
        <Divider>Active Selection</Divider>
        <AbilityBar direction='row' justify='space-between' align='center'>
          <SkillView
            droppable={false}
            abilityBar={-1}
            id={ACTIVE_BAR}
            ultimate={activeUltimate}
            skillSlots={activeBarSkills}
          />
        </AbilityBar>
        <Divider>Ability Bar</Divider>
        <AbilityBar direction='row' justify='space-between' align='center'>
          <SkillView
            abilityBar={0}
            ultimate={ultimateOne}
            id={ABILITY_BAR_ONE}
            droppable
            skillSlots={newBarOne}
          />
        </AbilityBar>
        <AbilityBar direction='row' justify='space-between' align='center'>
          <SkillView
            abilityBar={1}
            id={ABILITY_BAR_TWO}
            droppable
            ultimate={ultimateTwo}
            skillSlots={newBarTwo}
          />
        </AbilityBar>
        <TrashContainer hasTrash={isOver} ref={drop}>
          <StyledIcon isOver={isOver} type='delete' />
        </TrashContainer>
      </StyledAbilityFlex>
    </AbilityBarContainer>
  )
}
