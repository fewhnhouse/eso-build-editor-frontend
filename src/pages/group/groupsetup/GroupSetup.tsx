import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import GroupAssignments from './GroupAssignments'
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
    <>
      <StyledDiv>
        <GroupAssignments />
      </StyledDiv>
    </>
  )
}
