import React, { useState } from 'react'
import styled from 'styled-components'
import GroupRaidMenu from './GroupRaidMenu'
import GroupAssignments from './GroupAssignments'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

export default () => {
  const [usedRaid, setUsedRaid] = useState('')
  const setSelectedRaid = (id: string) => {
    setUsedRaid(id)
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledDiv>
        <GroupRaidMenu />
        <GroupAssignments />
      </StyledDiv>
    </DndProvider>
  )
}
