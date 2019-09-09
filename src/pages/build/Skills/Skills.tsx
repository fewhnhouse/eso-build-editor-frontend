import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import Menu from './SkillMenu'
import { BuildContext } from '../BuildStateContext'
import AbilityBar from './AbilityBar'
import { ISkill } from '../../../components/SkillSlot'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SkillsDisplay from '../../../components/SkillsDisplay'

const Content = styled.div`
  width: 100%;
  display: flex;
`

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const StyledMenu = styled(Menu)`
  max-width: 256px;
`

export const defaultUltimate: ISkill = {
  cast_time: '0',
  cost: '0',
  effect_1: '0',
  effect_2: null,
  icon: 'null',
  id: '0',
  skillId: 0,
  name: 'name',
  parent: null,
  pts: 0,
  range: null,
  skillline: 0,
  slug: '',
  target: null,
  type: 3,
  unlocks_at: null,
}

export default ({ edit }: { edit: boolean }) => {
  const [state] = useContext(BuildContext)
  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [state, edit])

  const { skillLine } = state!

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledDiv>
        <StyledMenu context={BuildContext} collapsable singleClass />
        <Content>
          <SkillsDisplay interactive skillline={skillLine} />
          <AbilityBar />
        </Content>
      </StyledDiv>
    </DndProvider>
  )
}
