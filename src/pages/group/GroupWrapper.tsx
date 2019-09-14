import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { defaultGroupState } from './GroupStateContext'
import Group from './Group'
import { message } from 'antd'

interface IGroupWrapperProps
  extends RouteComponentProps<{ id: string; groupId: string }> {
  edit?: boolean
}

export default ({ edit, match }: IGroupWrapperProps) => {
  const { id } = match.params
  const pageIndex = parseInt(id || '0', 10)
  return <NewGroup pageIndex={pageIndex} />
}

interface INewGroupProps {
  pageIndex: number
}

const NewGroup = ({ pageIndex }: INewGroupProps) => {
  const savedGroupState = localStorage.getItem('groupState')
  useEffect(() => {
    try {
      const parsedGroupState = savedGroupState
        ? JSON.parse(savedGroupState)
        : false
      if (parsedGroupState) {
        message.info('Your settings have been restored.')
      }
    } catch (e) {
      console.error(e)
    }
  }, [savedGroupState])
  try {
    const parsedGroupState = JSON.parse(savedGroupState || '')
    return (
      <Group
        path='/groupEditor'
        group={parsedGroupState}
        pageIndex={pageIndex}
      />
    )
  } catch (e) {
    return (
      <Group
        path='/groupEditor'
        group={defaultGroupState}
        pageIndex={pageIndex}
      />
    )
  }
}
