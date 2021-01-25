import React, { useState, useReducer, useEffect } from 'react'
import {
  BuildContext,
  buildReducer,
  SlotType,
  TwohandedWeapon,
  OnehandedWeapon,
  IBuildState,
} from './BuildStateContext'
import { Redirect } from 'react-router'
import { Layout, Button, Steps, Tooltip, notification, Modal } from 'antd'
import styled from 'styled-components'
import Consumables from './consumables/Consumables'
import Sets from './Sets/Sets'
import Skills from './Skills/Skills'
import RaceClass from './RaceAndClass/RaceClass'
import BuildReview from './Review/BuildReview'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { build } from '../../util/fragments'
import { createNotification } from '../../util/notification'
import { handleAddRevision } from './utils/revision'
import { handleEditSave } from './utils/edit'
import { handleCreateSave } from './utils/create'
import { verifyBuild } from './utils/verifyBuild'
import { LeftOutlined, SaveOutlined, RightOutlined } from '@ant-design/icons'

const { confirm } = Modal
const { Footer, Content } = Layout
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
const TabButton = styled(Button)`
  margin: 0px 10px;
`

export const CREATE_BUILD = gql`
  mutation createBuild($data: BuildCreateInput!) {
    createBuild(data: $data) {
      ...Build
    }
  }
  ${build}
`

export const CREATE_BUILD_REVISION = gql`
  mutation createBuildRevision($data: BuildRevisionCreateInput!) {
    createBuildRevision(data: $data) {
      id
    }
  }
`

export const ADD_BUILD_TO_REVISION = gql`
  mutation addBuildToRevision($id: ID, $buildId: ID) {
    addBuildToRevision(id: $id, buildId: $buildId) {
      id
    }
  }
`

export interface ISetSelectionData {
  slots: string[]
  glyphDescriptions: string[]
  traitDescriptions: string[]
  setIds: number[]
  types: (SlotType | '' | undefined)[]
  weaponTypes: (OnehandedWeapon | TwohandedWeapon | '' | undefined)[]
}

export const CREATE_SET_SELECTIONS = gql`
  mutation createSetSelections(
    $slots: [String!]!
    $glyphDescriptions: [String!]!
    $traitDescriptions: [String!]!
    $setIds: [Int!]!
    $types: [String!]!
    $weaponTypes: [String!]!
  ) {
    createSetSelections(
      slots: $slots
      glyphDescriptions: $glyphDescriptions
      traitDescriptions: $traitDescriptions
      setIds: $setIds
      types: $types
      weaponTypes: $weaponTypes
    ) {
      id
    }
  }
`

export interface ISkillSelectionData {
  skillIds: number[]
  indices: number[]
}

export const CREATE_SKILL_SELECTIONS = gql`
  mutation createSkillSelections($skillIds: [Int!]!, $indices: [Int!]!) {
    createSkillSelections(skillIds: $skillIds, indices: $indices) {
      id
    }
  }
`

const UPDATE_SKILL_SELECTION = gql`
  mutation updateSkillSelection(
    $where: SkillSelectionWhereUniqueInput!
    $data: SkillSelectionUpdateInput!
  ) {
    updateSkillSelection(where: $where, data: $data) {
      id
    }
  }
`

const UPDATE_SET_SELECTION = gql`
  mutation updateSetSelection(
    $where: SetSelectionWhereUniqueInput!
    $data: SetSelectionUpdateInput!
  ) {
    updateSetSelection(where: $where, data: $data) {
      id
    }
  }
`

const UPDATE_BUILD = gql`
  mutation updateBuild(
    $where: BuildWhereUniqueInput!
    $data: BuildUpdateInput!
  ) {
    updateBuild(where: $where, data: $data) {
      ...Build
    }
  }
  ${build}
`
const { Step } = Steps

const StyledFooter = styled(Footer)`
  display: flex;
  z-index: 100;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const StyledStep = styled(Step)`
  white-space: nowrap;
`

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
`

interface IBuildProps {
  build: IBuildState
  pageIndex: number
  path: string
  edit?: boolean
}

export default ({ build, pageIndex, path, edit = false }: IBuildProps) => {
  const [state, dispatch] = useReducer(buildReducer, build)
  const [tab, setTab] = useState(pageIndex || 0)
  const [redirect, setRedirect] = useState('')

  const handlePrevClick = () => {
    setTab((tabIndex) => tabIndex - 1)
  }
  const [updateBuild, updateBuildResult] = useMutation<any, any>(UPDATE_BUILD)
  const [createBuild, createBuildResult] = useMutation<any, any>(CREATE_BUILD)
  const [createBuildRevision, createBuildRevisionResult] = useMutation<
    any,
    any
  >(CREATE_BUILD_REVISION)
  const [addBuildToRevision, addBuildToRevisionResult] = useMutation<any, any>(
    ADD_BUILD_TO_REVISION
  )
  const [updateSetSelection] = useMutation<any, any>(UPDATE_SET_SELECTION)
  const [updateSkillSelection] = useMutation<any, any>(UPDATE_SKILL_SELECTION)

  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  )
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  )

  const showEditConfirm = () => {
    confirm({
      title: 'Do you want to update the existing revision or create a new one?',
      content:
        'By creating a new revision, you can still revisit the state of this build before your changes later.',
      okText: 'Create Revision',
      okType: 'primary',
      cancelText: 'Update Revision',
      onOk: async () => {
        try {
          await handleAddRevision(
            createSkillSelections,
            createSetSelections,
            createBuild,
            addBuildToRevision,
            state
          )
        } catch (e) {
          notification.error({
            message: 'Build update failed',
            description: 'Your build could not be saved. Try again later.',
          })
        }
      },
      onCancel: async () => {
        try {
          await handleEditSave(
            updateSkillSelection,
            updateSetSelection,
            updateBuild,
            state,
            build.frontbarSelection,
            build.backbarSelection
          )
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
      createBuildResult.data?.createBuild &&
      createBuildRevisionResult.data?.createBuildRevision
    ) {
      localStorage.removeItem('buildState')
      notification.success(
        createNotification(
          'Build creation successful.',
          'Your build was successfully created. You can now view it and share it with others!',
          createBuildResult.data.createBuild.id,
          'builds'
        )
      )
      setRedirect(createBuildResult.data.createBuild.id)
    } else if (updateBuildResult.data?.updateBuild) {
      notification.success(
        createNotification(
          'Build update successful.',
          'Your build was successfully edited. You can now view it and share it with others!',
          updateBuildResult.data.updateBuild.id,
          'builds'
        )
      )
      setRedirect(updateBuildResult.data.updateBuild.id)
    } else if (createBuildResult.data && addBuildToRevisionResult.data) {
      notification.success(
        createNotification(
          'Build Revision creation successful.',
          'Your raid revision was successfully created. You can now view it and share it with others!',
          createBuildResult.data.createBuild.id,
          'builds'
        )
      )
      setRedirect(createBuildResult.data.createBuild.id)
    }
  }, [
    createBuildResult.data,
    updateBuildResult.data,
    addBuildToRevisionResult,
    createBuildRevisionResult.data,
  ])

  const handleSave = async () => {
    if (edit) {
      showEditConfirm()
    } else {
      try {
        await handleCreateSave(
          createSkillSelections,
          createSetSelections,
          createBuildRevision,
          createBuild,
          state!
        )
      } catch (e) {
        await notification.error({
          message: 'Build creation failed',
          description: 'Your build could not be saved. Try again later.',
        })
        notification.error({
          message: 'Build creation failed',
          description: 'Your build could not be saved. Try again later.',
        })
      }
    }
  }

  const handleNextClick = () => {
    if (tab === 4) {
      handleSave()
    } else {
      setTab((tabIndex) => tabIndex + 1)
    }
  }

  const isDisabled = verifyBuild(state!, tab)

  const setTooltipTitle = () => {
    if (!isDisabled) {
      return ''
    }
    switch (tab) {
      case 0:
        return 'Select a Race and a Class to progress.'
      case 1:
        return 'Slot Skills and Ultimates to progress.'
      case 2:
        return 'Slot Armor, Weapons and Jewelry to progress.'
    }
  }

  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <Container>
        {pageIndex === 0 ? (
          <RaceClass edit={edit} />
        ) : pageIndex === 1 ? (
          <Skills edit={edit} />
        ) : pageIndex === 2 ? (
          <Sets edit={edit} />
        ) : pageIndex === 3 ? (
          <Consumables edit={edit} />
        ) : pageIndex === 4 ? (
          <BuildReview local />
        ) : (
          <Redirect to={`${path}/0`} />
        )}
        {redirect && <Redirect to={`/builds/${redirect}`} push />}
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
            title='Race & Class'
            description='Select race and class.'
          />
          <StyledStep title='Skills' description='Select skills.' />
          <StyledStep title='Sets' description='Select sets.' />
          <StyledStep
            title='Consumables'
            description='Select mundus, potions, food.'
          />
          <Step title='Review' description='Review and save.' />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <StyledButtonGroup size='large'>
            <TabButton
              loading={createBuildResult.loading || updateBuildResult.loading}
              onClick={handleNextClick}
              disabled={
                isDisabled || createBuildResult.data || updateBuildResult.data
              }
              type='primary'
            >
              {tab === 4 ? 'Save' : 'Next'}
              {!(createBuildResult.loading || updateBuildResult.loading) &&
                (tab === 4 ? <SaveOutlined /> : <RightOutlined />)}
            </TabButton>
          </StyledButtonGroup>
        </Tooltip>
        <Redirect to={`${path}/${tab}`} push />
      </StyledFooter>
    </BuildContext.Provider>
  )
}
