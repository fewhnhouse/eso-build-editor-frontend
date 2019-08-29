import React from 'react'
import { IActionProps, ProfileAction } from './Profile'
import { Card, Typography, Input, Button, Divider, Tooltip } from 'antd'
const { Text } = Typography

export default ({ me, handleActionClick, value, setValue }: IActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  const isValid = re.test(value || '')
  return (
    <Card title='Change your email' style={{ maxWidth: 500, width: '40%' }}>
      <Text>Current email: {me ? me.email : ''}</Text>
      <Divider />
      <Input
        value={value}
        onChange={handleChange}
        size='large'
        placeholder='Type new email...'
      />
      <Button
        onClick={handleActionClick(ProfileAction.updateEmail)}
        block
        disabled={!isValid}
        size='large'
        style={{ marginTop: 20 }}
        type='primary'
      >
        Update email
      </Button>
    </Card>
  )
}
