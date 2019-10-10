import React, { useState } from 'react'
import styled from 'styled-components'

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
      <StyledDiv>asd </StyledDiv>
    </>
  )
}
