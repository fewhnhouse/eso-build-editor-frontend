import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import RemoteRaidMenu from './RemoteRaidMenu'
import SelectedRaidMenu from './SelectedRaidMenu'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { GroupContext } from '../GroupStateContext'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

export default ({ edit }: { edit?: boolean }) => {
  const [state, dispatch] = useContext(GroupContext)

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('groupState', JSON.stringify(state))
    }
  }, [state, edit])
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledDiv>
        <RemoteRaidMenu />
        <SelectedRaidMenu />
      </StyledDiv>
    </DndProvider>
  )
}
