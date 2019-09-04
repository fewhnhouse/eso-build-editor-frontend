import React, { useContext } from 'react'
import { Select, Typography } from 'antd'
import Flex from '../../../components/Flex'
import { RaidContext } from '../RaidStateContext'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`
export default () => {
  const [state, dispatch] = useContext(RaidContext)
  const { data, loading } = useQuery(GET_USERS)
  const { canEdit, canView } = state!

  const handleEditChange = (values: string[]) => {
    dispatch!({
      type: 'SET_CAN_EDIT',
      payload: { canEdit: values },
    })
  }

  const handleViewChange = (values: string[]) => {
    dispatch!({
      type: 'SET_CAN_VIEW',
      payload: { canView: values },
    })
  }
  return (
    <Flex direction='row' justify='space-around' align='center'>
      <Flex
        style={{ flex: 1, margin: 10 }}
        direction='column'
        justify='flex-start'
        align='center'
      >
        <Typography.Text strong>Can Edit</Typography.Text>

        <Select
          allowClear
          loading={loading}
          mode='multiple'
          style={{ width: 300 }}
          defaultValue={canEdit}
          onChange={handleEditChange}
          size='large'
          placeholder='Select users...'
        >
          {data &&
            data.users &&
            data.users.map((user: any, index: number) => (
              <Select.Option key={`edit-access-${index}`} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
        </Select>
      </Flex>
      <Flex
        style={{ flex: 1, margin: 10 }}
        direction='column'
        justify='flex-start'
        align='center'
      >
        <Typography.Text strong>Can View</Typography.Text>

        <Select
          allowClear
          loading={loading}
          mode='multiple'
          style={{ width: 300 }}
          defaultValue={canView}
          onChange={handleViewChange}
          size='large'
          placeholder='Select users...'
        >
          {data &&
            data.users &&
            data.users.map((user: any, index: number) => (
              <Select.Option key={`view-access-${index}`} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
        </Select>
      </Flex>
    </Flex>
  )
}
