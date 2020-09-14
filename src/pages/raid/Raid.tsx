import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Button, Steps, Tooltip, notification, Modal } from 'antd'
import { Redirect } from 'react-router'
import RaidGeneral from './general/RaidGeneral'
import { RaidContext, raidReducer, IRole } from './RaidStateContext'
import Builds from './builds/Builds'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import RaidReview from './Review/RaidReview'
import { handleCreateSave, handleEditSave, handleAddRevision } from './util'
import { raid } from '../../util/fragments'
import { createNotification } from '../../util/notification'
import {
  LeftOutlined,
  SaveOutlined,
  RightOutlined,
  UnlockOutlined,
  LockOutlined,
} from '@ant-design/icons'

const { Footer, Content } = Layout
const { Step } = Steps
const ButtonGroup = Button.Group
const { confirm } = Modal

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

export const CREATE_RAID = gql`
  mutation createRaid($data: RaidCreateInput!) {
    createRaid(data: $data) {
      ...Raid
    }
  }
  ${raid}
`

const UPDATE_RAID = gql`
  mutation updateRaid($where: RaidWhereUniqueInput!, $data: RaidUpdateInput!) {
    updateRaid(where: $where, data: $data) {
      ...Raid
    }
  }
  ${raid}
`

export const CREATE_RAID_REVISION = gql`
  mutation createRaidRevision($data: RaidRevisionCreateInput!) {
    createRaidRevision(data: $data) {
      id
    }
  }
`

export const ADD_RAID_TO_REVISION = gql`
  mutation addRaidToRevision($id: ID, $raidId: ID) {
    addRaidToRevision(id: $id, raidId: $raidId) {
      id
    }
  }
`

interface IRaidProps {
  raid: any
  pageIndex: number
  path: string
  initialRoles?: IRole[]
  edit?: boolean
}

const Raid = ({
  raid,
  pageIndex,
  path,
  edit = false,
  initialRoles = [],
}: IRaidProps) => {
  const [state, dispatch] = useReducer(raidReducer, raid)
  const [tab, setTab] = useState(pageIndex || 0)
  const [redirect, setRedirect] = useState('')
  const handlePrevClick = () => {
    setTab((tabIndex) => tabIndex - 1)
  }

  const handlePrivateChange = () => {
    dispatch!({ type: 'TOGGLE_IS_PUBLISHED', payload: {} })
  }

  const [updateRaid, updateRaidResult] = useMutation<any, any>(UPDATE_RAID)

  const [createRaid, createRaidResult] = useMutation<any, any>(CREATE_RAID)

  const [createRaidRevision, createRaidRevisionResult] = useMutation<any, any>(
    CREATE_RAID_REVISION
  )
  const [addRaidToRevision, addRaidToRevisionResult] = useMutation<any, any>(
    ADD_RAID_TO_REVISION
  )

  const isDisabled =
    (tab === 0 && state.name === '') || (tab === 1 && state.roles.length <= 0)

  const showEditConfirm = () => {
    confirm({
      title: 'Do you want to update the existing revision or create a new one?',
      content:
        'By creating a new revision, you can still revisit the state of this raid before your changes later.',
      okText: 'Create Revision',
      okType: 'primary',
      cancelText: 'Update Revision',
      onOk: async () => {
        try {
          await handleAddRevision(state, createRaid, addRaidToRevision)
        } catch (e) {
          notification.error({
            message: 'Build update failed',
            description: 'Your build could not be saved. Try again later.',
          })
        }
      },
      onCancel: async () => {
        try {
          await handleEditSave(state, updateRaid, initialRoles)
        } catch (e) {
          notification.error({
            message: 'Build update failed',
            description: 'Your build could not be saved. Try again later.',
          })
        }
      },
    })
  }

  useEffect(() => {
    if (
      createRaidResult.data?.createRaid &&
      createRaidRevisionResult.data?.createRaidRevision
    ) {
      localStorage.removeItem('raidState')

      notification.success(
        createNotification(
          'Raid creation successful',
          'Your raid was successfully saved. You can now view it and share it with others!',
          createRaidResult.data.createRaid.id,
          'raids'
        )
      )

      setRedirect(createRaidResult.data.createRaid.id)
    } else if (updateRaidResult.data?.updateRaid) {
      notification.success(
        createNotification(
          'Raid update successful',
          'Your raid was successfully edited. You can now view it and share it with others!',
          updateRaidResult.data.updateRaid.id,
          'raids'
        )
      )
      setRedirect(updateRaidResult.data.updateRaid.id)
    } else if (createRaidResult.data && addRaidToRevisionResult.data) {
      notification.success(
        createNotification(
          'Raid Revision creation successful',
          'Your raid revision was successfully created. You can now view it and share it with others!',
          createRaidResult.data.createRaid.id,
          'raids'
        )
      )
      setRedirect(createRaidResult.data.createRaid.id)
    }
  }, [
    createRaidResult.data,
    updateRaidResult.data,
    addRaidToRevisionResult,
    createRaidRevisionResult.data,
  ])

  const handleSave = async () => {
    if (edit) {
      showEditConfirm()
    } else {
      try {
        await handleCreateSave(state, createRaid, createRaidRevision)
      } catch (e) {
        console.error(e)
        notification.error({
          message: 'Raid creation failed',
          description: 'Your raid could not be saved. Try again later.',
        })
      }
    }
  }

  const handleNextClick = () => {
    if (tab === 2) {
      handleSave()
    } else {
      setTab((tabIndex) => tabIndex + 1)
    }
  }

  const setTooltipTitle = () => {
    switch (tab) {
      case 0:
        return 'Select some general Information.'
      case 1:
        return 'Select the builds of your Setup.'
      case 2:
        return 'Confirm and Save.'
    }
  }

  const publishDisabled = !state.roles.reduce(
    (prevRole, currRole) =>
      prevRole &&
      currRole.builds.reduce<boolean>(
        (prevBuild, currBuild) => prevBuild && currBuild.build.published,
        true
      ),
    true
  )

  return (
    <RaidContext.Provider value={[state, dispatch]}>
      <Container>
        {pageIndex === 0 ? (
          <RaidGeneral edit={edit} />
        ) : pageIndex === 1 ? (
          <Builds edit={edit} />
        ) : pageIndex === 2 ? (
          <RaidReview local />
        ) : (
          <Redirect to={`${path}/0`} />
        )}
        {redirect !== '' ? <Redirect to={`/raids/${redirect}`} push /> : ''}
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
            description='Add general Raid info.'
          />
          <StyledStep title='Builds' description='Add builds to your setup.' />
          <StyledStep title='Review' description='Review and save.' />
        </Steps>
        <StyledButtonGroup size='large'>
          {tab === 2 && (
            <Tooltip
              title={
                publishDisabled
                  ? 'Some of the builds in your raid are set to private. Only use public builds to publish your raid.'
                  : state!.published
                  ? 'Your raid is set to public. It will be visible for anyone. Click to change.'
                  : 'Your raid is set to private. It will only be visible for you. Click to change.'
              }
            >
              <Button
                disabled={publishDisabled}
                onClick={handlePrivateChange}
                icon={state!.published ? <UnlockOutlined /> : <LockOutlined />}
              />
            </Tooltip>
          )}
          <Tooltip title={setTooltipTitle()}>
            <TabButton
              loading={createRaidResult.loading || updateRaidResult.loading}
              onClick={handleNextClick}
              disabled={
                isDisabled || createRaidResult.data || updateRaidResult.data
              }
              type='primary'
            >
              {tab === 2 ? 'Save' : 'Next'}
              {!(createRaidResult.loading || updateRaidResult.loading) &&
                (tab === 2 ? <SaveOutlined /> : <RightOutlined />)}
            </TabButton>
          </Tooltip>
        </StyledButtonGroup>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </RaidContext.Provider>
  )
}

export default Raid
