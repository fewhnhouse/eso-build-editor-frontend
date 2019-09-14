import React, { useState } from 'react'
import styled from 'styled-components'
import { Layout, Steps, Button, Icon, Tooltip } from 'antd'
import { Redirect } from 'react-router'
import GroupGeneral from './general/GroupGeneral'
import GroupSetup from './groupsetup/GroupSetup'
import GroupReview from './review/GroupReview'

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
  group: any
  edit?: boolean
  pageIndex: number
  path: string
}

export default ({ group, edit, pageIndex, path }: IGroupProps) => {
  const [redirect, setRedirect] = useState('')
  const [tab, setTab] = useState(pageIndex || 0)

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1)
  }

  const handleNextClick = () => {
    if (tab === 2) {
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
    <>
      <Container>
        {pageIndex === 0 ? (
          <GroupGeneral edit={edit} />
        ) : pageIndex === 1 ? (
          <GroupSetup />
        ) : pageIndex === 2 ? (
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
          <StyledStep title='Group setup' description='Form a group.' />
          <StyledStep title='Review' description='Review and save.' />
        </Steps>
        <StyledButtonGroup size='large'>
          {tab === 2 && (
            <Tooltip title={'Group privacy settings'}>
              <Button icon={'lock'} />
            </Tooltip>
          )}
          <Tooltip title={setTooltipTitle()}>
            <TabButton onClick={handleNextClick} type='primary'>
              {tab === 2 ? 'Save' : 'Next'}
            </TabButton>
          </Tooltip>
        </StyledButtonGroup>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </>
  )
}
