import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Icon, Button, Steps, Tooltip, notification } from 'antd'
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
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`

const TabButton = styled(Button)`
  margin: 0px 10px;
`

const CREATE_RAID = gql`
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

export default ({
  raid,
  pageIndex,
  path,
  edit = false,
  initialRoles = [],
}: IRaidProps) => {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

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
    if (saved) {
      if (createRaidResult.data && createRaidResult.data.createRaid) {
        localStorage.removeItem('raidState')
        setRedirect(createRaidResult.data.createRaid.id)
      } else if (updateRaidResult.data && updateRaidResult.data.updateRaid) {
        setRedirect(updateRaidResult.data.updateRaid.id)
      }
    }
  }, [createRaidResult.data, saved, updateRaidResult.data])

  const handleSave = async () => {
    setLoading(true)
    if (edit) {
      try {
        await handleEditSave(state, updateRaid, initialRoles)
        notification.success({
          message: 'Raid update successful',
          description: (
            <Flex direction='column' align='center' justify='center'>
              <div>
                Your raid was successfully edited. You can now view it and share
                it with others!
              </div>
              <Flex
                style={{ width: '100%', marginTop: 10 }}
                direction='row'
                align='center'
                justify='space-between'
              >
                <Button icon='share-alt'>Share link</Button>
              </Flex>
            </Flex>
          ),
        })
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
        notification.success({
          message: 'Raid creation successful',
          description: (
            <Flex direction='column' align='center' justify='center'>
              <div>
                Your raid was successfully saved. You can now view it and share
                it with others!
              </div>
              <Flex
                style={{ width: '100%', marginTop: 10 }}
                direction='row'
                align='center'
                justify='space-between'
              >
                <Button icon='share-alt'>Share link</Button>
              </Flex>
            </Flex>
          ),
        })
      } catch (e) {
        console.error(e)
        notification.error({
          message: 'Raid creation failed',
          description: 'Your raid could not be saved. Try again later.',
        })
      }
    }

    setLoading(false)
    setSaved(true)
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
      <Footer
        style={{
          display: 'flex',
          zIndex: 100,
          alignItems: 'center',
          boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
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
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title='General Information'
            description='Add general Raid info.'
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title='Builds'
            description='Add builds to your setup.'
          />
          <Step
            title='Review'
            style={{ whiteSpace: 'nowrap' }}
            description='Review and save.'
          />
        </Steps>
        <ButtonGroup style={{ display: 'flex' }} size='large'>
          {tab === 2 && (
            <Tooltip
              title={
                state!.published
                  ? 'Your raid is set to public. It will be visible for anyone. Click to change.'
                  : 'Your raid is set to private. It will only be visible for you. Click to change.'
              }
            >
              <Button
                onClick={handlePrivateChange}
                icon={state!.published ? 'unlock' : 'lock'}
              />
            </Tooltip>
          )}
          <Tooltip title={setTooltipTitle()}>
            <TabButton
              // style={{minWidth: 120}}
              loading={loading}
              onClick={handleNextClick}
              disabled={isDisabled || saved}
              type='primary'
            >
              {tab === 2 ? 'Save' : 'Next'}
              {!loading && <Icon type={tab === 2 ? 'save' : 'right'} />}
            </TabButton>
          </Tooltip>
        </ButtonGroup>
        <Redirect to={`${path}/${tab}`} push />
      </Footer>
    </RaidContext.Provider>
  )
}
