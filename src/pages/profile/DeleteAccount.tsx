import React from 'react'
import { IActionProps, ProfileAction, ItemCard } from './Profile'
import { Typography, Button, Divider } from 'antd'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const { Text } = Typography

const StyledText = styled(Text)`
  margin-top: ${(props) => props.theme.margins.medium};
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.margins.medium};
`

export default ({ handleActionClick }: IActionProps) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <ItemCard title='Delete account' isMobile={isMobile}>
      <Text>
        Deleting will remove the account and all associated data. Builds and
        raids created by this account will be deleted permanently.
        <br /> Any access this account has to shared builds or raids will be
        removed.
      </Text>
      <Divider />
      <StyledText strong>This action cannot be undone.</StyledText>
      <StyledButton
        onClick={handleActionClick(ProfileAction.deleteAccount)}
        block
        size='large'
        danger
        type='primary'
      >
        Delete account
      </StyledButton>
    </ItemCard>
  )
}
