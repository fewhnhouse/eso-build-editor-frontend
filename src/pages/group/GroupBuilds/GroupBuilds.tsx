import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import RemoteBuildMenu from './RemoteBuildMenu'
import SelectedBuildMenu from './SelectedBuildMenu'
import { GroupContext } from '../GroupStateContext'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ({ edit }: { edit?: boolean }) => {
  const [state] = useContext(GroupContext)

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('groupState', JSON.stringify(state))
    }
  }, [state, edit])
  return (
    <StyledDiv>
      <RemoteBuildMenu />
      <SelectedBuildMenu />
    </StyledDiv>
  )
}
