import React from 'react'
import { IActionProps, ProfileAction, ItemCard } from './Profile'
import { Input, Button } from 'antd'
import { useMediaQuery } from 'react-responsive'

export default ({ handleActionClick, value, setValue }: IActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const isValid = value && value.length > 6

  return (
    <ItemCard title='Change your password' isMobile={isMobile}>
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
    </ItemCard>
  )
}
