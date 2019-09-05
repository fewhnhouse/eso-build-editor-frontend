import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import { Avatar, Typography } from 'antd'

interface IInformationCardProps {
  icon: string
  title: string
  description: string | number
}

const FlexCard = styled(Flex)`
  padding: ${props => props.theme.paddings.small};
  border: 1px solid rgb(232, 232, 232);
  border-radius: 2px;
  background: white;
`

const StyledFlex = styled(Flex)`
  margin-left: ${props => props.theme.paddings.small};
`

const StyledText = styled(Typography.Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ({ icon, title, description }: IInformationCardProps) => {
  return (
    <FlexCard direction='row'>
      <Avatar icon={icon} shape='square' />
      <StyledFlex align='flex-start' direction='column'>
        <StyledText strong>{title}</StyledText>
        <StyledText>{description}</StyledText>
      </StyledFlex>
    </FlexCard>
  )
}
