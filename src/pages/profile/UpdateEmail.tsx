import React from 'react'
import { IActionProps, ProfileAction, ItemCard } from './Profile'
import { Typography, Input, Button, Divider } from 'antd'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const { Text } = Typography
const StyledButton = styled(Button)`
  margin-top: ${props => props.theme.margins.medium};
`

export default ({ me, handleActionClick, value, setValue }: IActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const re = new RegExp(
    //eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  const isValid = re.test(value || '')
  return (
    <ItemCard title='Change your email' isMobile={isMobile}>
      <Text>Current email: {me ? me.email : ''}</Text>
      <Divider />
      <Input
        value={value}
        onChange={handleChange}
        size='large'
        placeholder='Type new email...'
      />
      <StyledButton
        onClick={handleActionClick(ProfileAction.updateEmail)}
        block
        disabled={!isValid}
        size='large'
        type='primary'
      >
        Update email
      </StyledButton>
    </ItemCard>
  )
}
