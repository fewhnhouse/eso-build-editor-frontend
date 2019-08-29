import React from 'react'
import { IActionProps, ProfileAction } from './Profile'
import { Card, Input, Button } from 'antd'

export default ({ handleActionClick, value, setValue }: IActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }

  const isValid = value && value.length > 6

  return (
    <Card title='Change your password' style={{ maxWidth: 500, width: '40%' }}>
      <Input.Password
        value={value}
        onChange={handleChange}
        size='large'
        placeholder='New password'
      />
      <Button
        disabled={!isValid}
        onClick={handleActionClick(ProfileAction.updatePassword)}
        block
        size='large'
        style={{ marginTop: 20 }}
        type='primary'
      >
        Update password
      </Button>
    </Card>
  )
}
