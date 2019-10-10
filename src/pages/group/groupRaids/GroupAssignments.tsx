import React, { useState, useContext } from 'react'
import Flex from '../../../components/Flex'
import { Divider, Button, Empty, Input, Icon, Typography, Card } from 'antd'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'
import Scrollbars from 'react-custom-scrollbars'
import { GroupContext } from '../GroupStateContext'
import { IRaidState } from '../../raid/RaidStateContext'
const { Search } = Input

const RoleDropContainer = styled.div`
  width: calc(100% - 80px);
  margin: 40px;
  height: 100%;
  text-align: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
`

const StyledIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  font-size: 50px;
`

const StyledTitle = styled(Typography.Title)`
  color: #d9d9d9;
`

const StyledScrollbars = styled(Scrollbars)`
  min-width: 460px;
`

const StyledFlex = styled(Flex)`
  flex: 2;
`

const StyledFlexRoles = styled(Flex)`
  width: 100%;
`

const StyledEmpty = styled(Empty)`
  margin-top: 30%;
`

const RaidDropper = () => {
  const [, dispatch] = useContext(GroupContext)
  const [, drop] = useDrop({
    accept: 'raid',
    drop: (raid: any, monitor) => {
      dispatch!({
        type: 'ADD_RAID',
        payload: { raid },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <RoleDropContainer ref={drop}>
      <StyledIcon type='inbox' />
      <StyledTitle level={3}>Drag a raid here</StyledTitle>
    </RoleDropContainer>
  )
}
export default () => {
  const [state, dispatch] = useContext(GroupContext)
  const { raids } = state!

  return (
    <StyledScrollbars autoHide>
      <StyledFlex direction='column' justify='flex-start' align='center' fluid>
        {raids &&
          raids.length > 0 &&
          raids.map((raid, index) => <div>asd</div>)}

        <RaidDropper />
        {raids && raids.length === 0 && (
          <StyledEmpty description='Add a new raid to begin.' />
        )}
      </StyledFlex>
    </StyledScrollbars>
  )
}
