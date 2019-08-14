import React, { useState, useReducer, useEffect } from 'react'
import {
  BuildContext,
  buildReducer,
  defaultBuildState,
  IBuildState,
  SlotType,
} from './BuildStateContext'
import { RouteComponentProps, Redirect } from 'react-router'
import {
  Layout,
  Button,
  Steps,
  Icon,
  message,
  Tooltip,
  notification,
} from 'antd'
import styled from 'styled-components'
import Consumables from './consumables/Consumables'
import Sets from './Sets/Sets'
import Skills from './Skills/Skills'
import RaceClass from './RaceAndClass/RaceClass'
import BuildReview from '../buildReview/BuildReview'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Flex from '../../components/Flex'

const { Footer, Content } = Layout

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: rgb(155, 155, 155);
`
const TabButton = styled(Button)`
  margin: 0px 10px;
`

const CREATE_BUILD = gql`
  mutation createBuild($data: BuildCreateInput!) {
    createBuild(data: $data) {
      id
      name
    }
  }
`

interface ISetSelectionData {
  slots: string[]
  glyphDescriptions: string[]
  traitDescriptions: string[]
  setIds: number[]
  types: (SlotType | '' | undefined)[]
}

const CREATE_SET_SELECTIONS = gql`
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

interface ISkillSelectionData {
  skillIds: number[]
  indices: number[]
}

const CREATE_SKILL_SELECTIONS = gql`
  mutation createSkillSelections($skillIds: [Int!]!, $indices: [Int!]!) {
    createSkillSelections(skillIds: $skillIds, indices: $indices) {
      id
    }
  }
`
const { Step } = Steps

export default ({ match, location }: RouteComponentProps<{ id: string }>) => {
  const savedBuildState = localStorage.getItem('buildState')

  useEffect(() => {
    const savedBuildState = localStorage.getItem('buildState')
    if (savedBuildState) {
      console.log(JSON.parse(savedBuildState))
      message.info('Your settings have been restored.')
    }
  }, [])
  const [state, dispatch] = useReducer(
    buildReducer,
    savedBuildState ? JSON.parse(savedBuildState) : defaultBuildState
  )
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const { id } = match.params
  const [tab, setTab] = useState(parseInt(id, 10) || 0)
  const [redirect, setRedirect] = useState('')

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1)
  }

  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  )
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  )
  const [createBuild, { data }] = useMutation<any, any>(CREATE_BUILD)

  const { mundus, buff, ultimateOne, ultimateTwo } = state!

  useEffect(() => {
    if (data && data.createBuild) {
      setRedirect(data.createBuild.id)
    }
  }, [data])

  const handleSave = async () => {
    setLoading(true)
    try {
      const {
        race,
        esoClass,
        frontbarSelection,
        backbarSelection,
        bigPieceSelection,
        smallPieceSelection,
        jewelrySelection,
        newBarOne,
        newBarTwo,
        applicationArea,
        role,
        name,
        mainResource,
        description,
      }: IBuildState = state!
      console.log(
        bigPieceSelection,
        smallPieceSelection,
        jewelrySelection,
        frontbarSelection,
        backbarSelection
      )
      console.log(jewelrySelection.map(piece => piece.type || ''))
      console.log(bigPieceSelection.map(piece => piece.type || ''))
      const frontbarSkillSelections: any = await createSkillSelections({
        variables: {
          indices: newBarOne.map(sel => sel.index),
          skillIds: newBarOne.map(sel => (sel.skill ? sel.skill.id : 0)),
        },
      })
      const backbarSkillSelections: any = await createSkillSelections({
        variables: {
          indices: newBarTwo.map(sel => sel.index),
          skillIds: newBarTwo.map(sel => (sel.skill ? sel.skill.id : 0)),
        },
      })
      const bigPieceSetSelections: any = await createSetSelections({
        variables: {
          slots: bigPieceSelection.map(piece => piece.slot),
          types: bigPieceSelection.map(piece => piece.type || ''),
          setIds: bigPieceSelection.map(piece =>
            piece.selectedSet ? piece.selectedSet.id : 0
          ),
          glyphDescriptions: bigPieceSelection.map(piece =>
            piece.glyph ? piece.glyph.description : ''
          ),
          traitDescriptions: bigPieceSelection.map(piece =>
            piece.trait ? piece.trait.description : ''
          ),
        },
      })
      const smallPieceSetSelections: any = await createSetSelections({
        variables: {
          slots: smallPieceSelection.map(piece => piece.slot),
          types: smallPieceSelection.map(piece => piece.type || ''),
          setIds: smallPieceSelection.map(piece =>
            piece.selectedSet ? piece.selectedSet.id : 0
          ),
          glyphDescriptions: smallPieceSelection.map(piece =>
            piece.glyph ? piece.glyph.description : ''
          ),
          traitDescriptions: smallPieceSelection.map(piece =>
            piece.trait ? piece.trait.description : ''
          ),
        },
      })
      const jewelrySetSelections: any = await createSetSelections({
        variables: {
          slots: jewelrySelection.map(piece => piece.slot),
          types: jewelrySelection.map(piece => piece.type || ''),
          setIds: jewelrySelection.map(piece =>
            piece.selectedSet ? piece.selectedSet.id : 0
          ),
          glyphDescriptions: jewelrySelection.map(piece =>
            piece.glyph ? piece.glyph.description : ''
          ),
          traitDescriptions: jewelrySelection.map(piece =>
            piece.trait ? piece.trait.description : ''
          ),
        },
      })
      const frontbarSetSelections: any = await createSetSelections({
        variables: {
          slots: frontbarSelection.map(piece => piece.slot),
          types: frontbarSelection.map(piece => piece.type || ''),
          setIds: frontbarSelection.map(piece =>
            piece.selectedSet ? piece.selectedSet.id : 0
          ),
          glyphDescriptions: frontbarSelection.map(piece =>
            piece.glyph ? piece.glyph.description : ''
          ),
          traitDescriptions: frontbarSelection.map(piece =>
            piece.trait ? piece.trait.description : ''
          ),
        },
      })
      const backbarSetSelections: any = await createSetSelections({
        variables: {
          slots: backbarSelection.map(piece => piece.slot),
          types: backbarSelection.map(piece => piece.type || ''),
          setIds: backbarSelection.map(piece =>
            piece.selectedSet ? piece.selectedSet.id : 0
          ),
          glyphDescriptions: backbarSelection.map(piece =>
            piece.glyph ? piece.glyph.description : ''
          ),
          traitDescriptions: backbarSelection.map(piece =>
            piece.trait ? piece.trait.description : ''
          ),
        },
      })

      const build: any = await createBuild({
        variables: {
          data: {
            name,
            race,
            esoClass,
            applicationArea,
            role,
            mundusStone: { connect: { name: mundus.name } },
            buff: { connect: { name: buff.name } },
            bigPieceSelection: {
              connect: bigPieceSetSelections.data.createSetSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            frontbarSelection: {
              connect: frontbarSetSelections.data.createSetSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            backbarSelection: {
              connect: backbarSetSelections.data.createSetSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            smallPieceSelection: {
              connect: smallPieceSetSelections.data.createSetSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            jewelrySelection: {
              connect: jewelrySetSelections.data.createSetSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            ultimateOne:
              ultimateOne && ultimateOne.id !== 0
                ? {
                    connect: { skillId: ultimateOne.id },
                  }
                : undefined,
            ultimateTwo:
              ultimateTwo && ultimateTwo.id !== 0
                ? {
                    connect: { skillId: ultimateTwo.id },
                  }
                : undefined,
            newBarOne: {
              connect: frontbarSkillSelections.data.createSkillSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
            newBarTwo: {
              connect: backbarSkillSelections.data.createSkillSelections.map(
                (selection: any) => ({
                  id: selection.id,
                })
              ),
            },
          },
        },
      })
      notification.success({
        message: 'Build creation successful',
        description: (
          <Flex direction='column' align='center' justify='center'>
            <div>
              Your build was successfully saved. You can now view it and share
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

      localStorage.removeItem('buildState')
    } catch (e) {
      notification.error({
        message: 'Build creation failed',
        description: 'Your build could not be saved. Try again later.',
      })
    }
    setLoading(false)
    setSaved(true)
  }

  const handleNextClick = () => {
    if (tab === 4) {
      console.log('save')
      handleSave()
    } else {
      setTab(tabIndex => tabIndex + 1)
    }
  }

  const isDisabled =
    tab === 0 &&
    (state.race === '' ||
      state.esoClass ===
        '') /* ||
    (tab === 1 &&
      (state.abilityBarOne.find(skill => skill.id === 0) !== undefined ||
        state.abilityBarTwo.find(skill => skill.id === 0) !== undefined ||
        state.ultimateOne.id === 0 ||
        state.ultimateTwo.id === 0))*/

  const setTooltipTitle = () => {
    if (!isDisabled) {
      return ''
    }
    switch (tab) {
      case 0:
        return 'Select a Race and a Class to progress.'
      case 1:
        return 'Fill your bars with Skills to progress.'
      case 2:
        return 'Slot sets to progress.'
    }
  }

  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <Container>
        {id === '0' ? (
          <RaceClass />
        ) : id === '1' ? (
          <Skills />
        ) : id === '2' ? (
          <Sets />
        ) : id === '3' ? (
          <Consumables />
        ) : id === '4' ? (
          <BuildReview local={true} />
        ) : (
          <Redirect to='/build/0' />
        )}
        {redirect !== '' && <Redirect to={`/buildreview/${redirect}`} push />}
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
            title='Race & Class'
            description='Select race and class.'
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title='Skills'
            description='Select skills.'
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title='Sets'
            description='Select sets.'
          />
          <Step
            title='Consumables'
            style={{ whiteSpace: 'nowrap' }}
            description='Select mundus, potions, food.'
          />
          <Step title='Review' description='Review and save.' />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <TabButton
            // style={{minWidth: 120}}
            loading={loading}
            onClick={handleNextClick}
            disabled={isDisabled || saved}
            size='large'
            type='primary'
          >
            {tab === 4 ? 'Save' : 'Next'}
            <Icon type={tab === 4 ? (loading ? '' : 'save') : 'right'} />
          </TabButton>
        </Tooltip>
        <Redirect to={`/build/${tab}`} push />
      </Footer>
    </BuildContext.Provider>
  )
}
