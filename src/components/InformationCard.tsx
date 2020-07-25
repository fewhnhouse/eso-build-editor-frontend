import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import { Avatar, Typography } from 'antd'

interface IInformationCardProps {
  Icon: any
  title: string
  description: string | number
}

const FlexCard = styled(Flex)`
  padding: ${(props) => props.theme.paddings.small};
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 2px;
  background: white;
`

const StyledFlex = styled(Flex)`
  margin-left: ${(props) => props.theme.paddings.small};
`

const StyledText = styled(Typography.Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

export default ({ Icon, title, description }: IInformationCardProps) => {
  return (
    <FlexCard direction='row'>
      <Avatar shape='square' />
      <StyledFlex align='flex-start' direction='column'>
        <StyledText strong>{title}</StyledText>
        <StyledText>{description}</StyledText>
      </StyledFlex>
    </FlexCard>
  )
}
