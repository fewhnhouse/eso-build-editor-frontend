import React from 'react'
import { IActionProps, ProfileAction, ItemCard } from './Profile'
import { Typography, Button, Divider } from 'antd'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography

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
      <Text strong style={{ marginTop: 20 }}>
        This action cannot be undone.
      </Text>
      <Button
        onClick={handleActionClick(ProfileAction.deleteAccount)}
        block
        size='large'
        style={{ marginTop: 20 }}
        type='danger'
      >
        Delete account
      </Button>
    </ItemCard>
  )
}
