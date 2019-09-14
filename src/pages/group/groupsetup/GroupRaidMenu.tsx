import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Input, Divider } from 'antd'

const ListContainer = styled.div`
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledFlex = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledInnerFlex = styled(Flex)`
  width: 100%;
`

const StyledInput = styled(Input)`
  margin: 10px;
  width: 100%;
`

export default () => {
  return (
    <ListContainer>
      <StyledFlex direction='column' justify='center' align='center'>
        <StyledInnerFlex direction='row' justify='center' align='center'>
          <StyledInput
            placeholder='Search for Raids'
            allowClear
            size='large'
            type='text'
          />
        </StyledInnerFlex>
      </StyledFlex>
      <Divider>Selectable raids</Divider>
    </ListContainer>
  )
}
