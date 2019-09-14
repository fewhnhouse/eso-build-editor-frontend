import React from 'react'
import { Divider } from 'antd'
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
  return (
    <>
      <Divider>Set up a group</Divider>
      <StyledDiv>
        <GroupRaidMenu />
        <GroupAssignments />
      </StyledDiv>
    </>
  )
}
