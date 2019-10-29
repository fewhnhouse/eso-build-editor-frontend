import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Icon,
  Button,
  Steps,
  Tooltip,
  notification,
  Input,
  message,
} from 'antd'
import { Redirect } from 'react-router'
import RaidGeneral from './general/RaidGeneral'
import { RaidContext, raidReducer, IRole } from './RaidStateContext'
import Builds from './builds/Builds'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import Flex from '../../components/Flex'
import RaidReview from './Review/RaidReview'
import { handleCreateSave, handleEditSave } from './util'
import { raid } from '../../util/fragments'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { createNotification } from '../../util/notification'

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
  color: ${props => props.theme.mainBg};
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
    setTab(tabIndex => tabIndex - 1)
  }

  const handlePrivateChange = () => {
    dispatch!({ type: 'TOGGLE_IS_PUBLISHED', payload: {} })
  }

  const [updateRaid, updateRaidResult] = useMutation<any, any>(UPDATE_RAID)

  const [createRaid, createRaidResult] = useMutation<any, any>(CREATE_RAID)

  const isDisabled =
    (tab === 0 && state.name === '') || (tab === 1 && state.roles.length <= 0)

  useEffect(() => {
    if (createRaidResult.data && createRaidResult.data.createRaid) {
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
    } else if (updateRaidResult.data && updateRaidResult.data.updateRaid) {
      notification.success(
        createNotification(
          'Raid update successful',
          'Your raid was successfully edited. You can now view it and share it with others!',
          updateRaidResult.data.updateRaid.id,
          'raids'
        )
      )
      setRedirect(updateRaidResult.data.updateRaid.id)
    }
  }, [createRaidResult.data, updateRaidResult.data])

  const handleSave = async () => {
    if (edit) {
      try {
        await handleEditSave(state, updateRaid, initialRoles)
      } catch (e) {
        console.error(e)
        notification.error({
          message: 'Raid Update failed',
          description: 'Your raid could not be updated. Try again later.',
        })
      }
    } else {
      try {
        await handleCreateSave(state, createRaid)
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
      setTab(tabIndex => tabIndex + 1)
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
          <Icon type='left' />
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
                icon={state!.published ? 'unlock' : 'lock'}
              />
            </Tooltip>
          )}
          <Tooltip title={setTooltipTitle()}>
            <TabButton
              loading={createRaidResult.loading || updateRaidResult.loading}
              onClick={handleNextClick}
              disabled={
                isDisabled || (createRaidResult.data || updateRaidResult.data)
              }
              type='primary'
            >
              {tab === 2 ? 'Save' : 'Next'}
              {!(createRaidResult.loading || updateRaidResult.loading) && (
                <Icon type={tab === 2 ? 'save' : 'right'} />
              )}
            </TabButton>
          </Tooltip>
        </StyledButtonGroup>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </RaidContext.Provider>
  )
}

export default Raid
