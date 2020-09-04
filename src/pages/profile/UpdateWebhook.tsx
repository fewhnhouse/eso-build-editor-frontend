import React from 'react'
import { IActionProps, ProfileAction, ItemCard } from './Profile'
import { Input, Button, Divider, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const { Text } = Typography

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.margins.medium};
`

export default ({ me, handleActionClick, value, setValue }: IActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const isValid = value && value.length > 6

  return (
    <ItemCard title='Add a Discord Webhook' isMobile={isMobile}>
      <Text>Current webhook: {me ? me.webhook : ''}</Text>
      <Divider />

      <Input
        value={value}
        onChange={handleChange}
        size='large'
        placeholder='New webhook'
      />
      <StyledButton
        disabled={!isValid}
        onClick={handleActionClick(ProfileAction.updateWebhook)}
        block
        size='large'
        type='primary'
      >
        Update webhook
      </StyledButton>
    </ItemCard>
  )
}
