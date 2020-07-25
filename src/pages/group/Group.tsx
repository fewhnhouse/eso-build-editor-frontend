import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Steps, Button, Tooltip, notification } from 'antd'
import { Redirect } from 'react-router'
import GroupGeneral from './general/GroupGeneral'
import GroupSetup from './GroupAssignments/GroupSetup'
import GroupReview from './GroupReview/GroupReview'
import {
  IGroupState,
  GroupContext,
  groupReducer,
  IGroupBuild,
} from './GroupStateContext'
import GroupRaids from './GroupBuilds/GroupBuilds'
import { handleEditSave, handleCreateSave } from './util'
import gql from 'graphql-tag'
import { group } from '../../util/fragments'
import { useMutation } from 'react-apollo'
import { createNotification } from '../../util/notification'
import { IRaidState } from '../raid/RaidStateContext'
import { LeftOutlined, SaveOutlined, RightOutlined } from '@ant-design/icons'

const { Footer, Content } = Layout
const { Step } = Steps
const ButtonGroup = Button.Group

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: 100%;
  color: ${(props) => props.theme.mainBg};
`

const StyledFooter = styled(Footer)`
  display: flex;
  z-index: 100;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const TabButton = styled(Button)`
  margin: 0px 10px;
`

const StyledStep = styled(Step)`
  white-space: nowrap;
`

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
`

export const CREATE_GROUP = gql`
  mutation createGroup($data: GroupCreateInput!) {
    createGroup(data: $data) {
      ...Group
    }
  }
  ${group}
`

const UPDATE_GROUP = gql`
  mutation updateGroup(
    $where: GroupWhereUniqueInput!
    $data: GroupUpdateInput!
  ) {
    updateGroup(where: $where, data: $data) {
      ...Group
    }
  }
  ${group}
`

interface IGroupProps {
  group: IGroupState
  edit?: boolean
  pageIndex: number
  path: string
  initialRaids?: IRaidState[]
  initialGroupBuilds?: IGroupBuild[]
}

export default ({
  group,
  edit,
  pageIndex,
  path,
  initialRaids = [],
  initialGroupBuilds = [],
}: IGroupProps) => {
  const [state, dispatch] = useReducer(groupReducer, group)
  const [redirect, setRedirect] = useState('')
  const [tab, setTab] = useState(pageIndex || 0)

  const [updateGroup, updateGroupResult] = useMutation<any, any>(UPDATE_GROUP)
  const [createGroup, createGroupResult] = useMutation<any, any>(CREATE_GROUP)

  const handlePrevClick = () => {
    setTab((tabIndex) => tabIndex - 1)
  }

  useEffect(() => {
    if (createGroupResult.data && createGroupResult.data.createGroup) {
      localStorage.removeItem('groupState')
      notification.success(
        createNotification(
          'Group creation successful.',
          'Your group was successfully created. You can now view it and share it with others!',
          createGroupResult.data.createGroup.id,
          'groups'
        )
      )
      setRedirect(createGroupResult.data.createGroup.id)
    } else if (updateGroupResult.data && updateGroupResult.data.updateGroup) {
      notification.success(
        createNotification(
          'Group update successful.',
          'Your group was successfully edited. You can now view it and share it with others!',
          updateGroupResult.data.updateGroup.id,
          'groups'
        )
      )
      setRedirect(updateGroupResult.data.updateGroup.id)
    }
  }, [createGroupResult.data, updateGroupResult.data])

  const handleSave = async () => {
    if (edit) {
      try {
        await handleEditSave(state, updateGroup, initialGroupBuilds)
      } catch (e) {
        notification.error({
          message: 'Group update failed',
          description: 'Your group could not be saved. Try again later.',
        })
      }
    } else {
      try {
        await handleCreateSave(state!, createGroup)
      } catch (e) {
        await notification.error({
          message: 'Group creation failed',
          description: 'Your group could not be saved. Try again later.',
        })
        notification.error({
          message: 'Group creation failed',
          description: 'Your group could not be saved. Try again later.',
        })
      }
    }
  }

  const handleNextClick = () => {
    if (tab === 3) {
      handleSave()
    } else {
      setTab((tabIndex) => tabIndex + 1)
    }
  }

  const setTooltipTitle = () => {
    switch (tab) {
      case 0:
        return 'Set some general information.'
      case 1:
        return 'Select people for your group.'
      case 2:
        return 'Confirm and save.'
    }
  }

  //Add disabled state for previous page indices later
  const isDisabled = false

  return (
    <GroupContext.Provider value={[state, dispatch]}>
      <Container>
        {pageIndex === 0 ? (
          <GroupGeneral edit={edit} />
        ) : pageIndex === 1 ? (
          <GroupRaids edit={edit} />
        ) : pageIndex === 2 ? (
          <GroupSetup />
        ) : pageIndex === 3 ? (
          <GroupReview local />
        ) : (
          <Redirect to={`${path}/0`} />
        )}
        {redirect !== '' ? <Redirect to={`/groups/${redirect}`} push /> : ''}
      </Container>
      <StyledFooter>
        <TabButton
          onClick={handlePrevClick}
          disabled={tab === 0}
          size='large'
          type='primary'
        >
          <LeftOutlined />
          Prev
        </TabButton>
        <Steps progressDot current={tab}>
          <StyledStep
            title='General Information'
            description='Add general group info.'
          />
          <StyledStep
            title='Group builds'
            description='Add builds to a group.'
          />
          <StyledStep
            title='Raid Members'
            description='Assign members to groups.'
          />
          <StyledStep title='Review' description='Review and save.' />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <StyledButtonGroup size='large'>
            <TabButton
              loading={createGroupResult.loading || updateGroupResult.loading}
              onClick={handleNextClick}
              disabled={
                isDisabled || createGroupResult.data || updateGroupResult.data
              }
              type='primary'
            >
              {tab === 3 ? 'Save' : 'Next'}
              {!(createGroupResult.loading || updateGroupResult.loading) &&
                (tab === 3 ? <SaveOutlined /> : <RightOutlined />)}
            </TabButton>
          </StyledButtonGroup>
        </Tooltip>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </GroupContext.Provider>
  )
}
