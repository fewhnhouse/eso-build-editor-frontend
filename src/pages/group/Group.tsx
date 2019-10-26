import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import { Layout, Steps, Button, Icon, Tooltip } from 'antd'
import { Redirect } from 'react-router'
import GroupGeneral from './general/GroupGeneral'
import GroupSetup from './groupsetup/GroupSetup'
import GroupReview from './review/GroupReview'
import { IGroupState, GroupContext, groupReducer } from './GroupStateContext'
import GroupRaids from './groupRaids/GroupRaids'

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

interface IGroupProps {
  group: IGroupState
  edit?: boolean
  pageIndex: number
  path: string
}

export default ({ group, edit, pageIndex, path }: IGroupProps) => {
  const [state, dispatch] = useReducer(groupReducer, group)
  const [redirect, setRedirect] = useState('')
  const [tab, setTab] = useState(pageIndex || 0)

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1)
  }

  const handleNextClick = () => {
    if (tab === 3) {
      alert('Handle group save')
    } else {
      setTab(tabIndex => tabIndex + 1)
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
          <GroupReview />
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
          <Icon type='left' />
          Prev
        </TabButton>
        <Steps progressDot current={tab}>
          <StyledStep
            title='General Information'
            description='Add general group info.'
          />
          <StyledStep title='Group raids' description='Add raids to a group.' />
          <StyledStep
            title='Raid Members'
            description='Assign members to builds.'
          />
          <StyledStep title='Review' description='Review and save.' />
        </Steps>
        <StyledButtonGroup size='large'>
          {tab === 3 && (
            <Tooltip title={'Group privacy settings'}>
              <Button icon={'lock'} />
            </Tooltip>
          )}
          <Tooltip title={setTooltipTitle()}>
            <TabButton onClick={handleNextClick} type='primary'>
              {tab === 3 ? 'Save' : 'Next'}
            </TabButton>
          </Tooltip>
        </StyledButtonGroup>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </GroupContext.Provider>
  )
}
