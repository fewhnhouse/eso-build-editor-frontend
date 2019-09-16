import React, { useState } from 'react'
import styled from 'styled-components'
import GroupRaidMenu from './GroupRaidMenu'
import GroupAssignments from './GroupAssignments'

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
    <>
      <StyledDiv>
        <GroupRaidMenu selectRaid={setSelectedRaid} />
        <GroupAssignments useRaid={usedRaid} />
      </StyledDiv>
    </>
  )
}
