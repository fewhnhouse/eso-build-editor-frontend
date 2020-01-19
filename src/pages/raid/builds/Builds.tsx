import React, { useContext, useEffect } from 'react'
import BuildMenu from './BuildMenu'
import Roles from './Roles'
import { RaidContext } from '../RaidStateContext'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

export default ({ edit }: { edit: boolean }) => {
  const [state] = useContext(RaidContext)

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('raidState', JSON.stringify(state))
    }
  }, [state, edit])
  return (
    <StyledDiv>
      <BuildMenu />
      <Roles />
    </StyledDiv>
  )
}
