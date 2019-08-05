import React, { useState, useReducer, useEffect } from 'react'
import {
  BuildContext,
  buildReducer,
  defaultBuildState,
} from './BuildStateContext'
import { RouteComponentProps, Redirect } from 'react-router'
import { Layout, Button, Steps, Icon, message, Tooltip } from 'antd'
import styled from 'styled-components'
import Consumables from './consumables/Consumables'
import Sets from './Sets/Sets'
import Skills from './Skills/Skills'
import RaceClass from './RaceAndClass/RaceClass'
import Details from '../details/Details'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'

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

interface IBuildCreateData {}
const CREATE_BUILD = gql`
  mutation createBuild($data: BuildCreateInput!) {
    createBuild(data: $data) {
      id
      name
    }
  }
`

const GET_SKILL = gql`
  query skill($id: Int!) {
    skill(skillId: $id) {
      id
    }
  }
`

const GET_MUNDUS_STONE = gql`
  query mundusStone($name: String) {
    mundusStone(name: $name) {
      id
    }
  }
`

const GET_BUFF = gql`
  query buff($name: String!) {
    buff(name: $name) {
      id
    }
  }
`

const GET_RACE = gql`
  query race($name: String!) {
    race(name: $name) {
      id
    }
  }
`

const GET_CLASS = gql`
  query class($name: String!) {
    class(name: $name) {
      id
    }
  }
`

//where: { setId_in: [10, 11, 12] }
const GET_SETS = gql`
  query sets($where: SetWhereInput!) {
    sets(where: $where) {
      id
    }
  }
`
//where: { skillId_in: [10, 11, 12] }
const GET_SKILLS = gql`
  query skills($where: SkillWhereInput!) {
    skills(where: $where) {
      id
    }
  }
`

interface ISetSelectionData {
  slots: string[]
  glyphDescriptions: string[]
  traitDescriptions: string[]
  setIds: number[]
}

const CREATE_SET_SELECTIONS = gql`
  mutation createSetSelections(
    $slots: [String!]!
    $glyphDescriptions: [String!]!
    $traitDescriptions: [String!]!
    $setIds: [Int!]!
  ) {
    createSetSelections(
      slots: $slots
      glyphDescriptions: $glyphDescriptions
      traitDescriptions: $traitDescriptions
      setIds: $setIds
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
  const { id } = match.params
  const [tab, setTab] = useState(parseInt(id, 10) || 0)

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1)
  }

  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  )
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  )
  const [createBuild] = useMutation<any, any>(CREATE_BUILD)
  const { mundus, buff, ultimateOne, ultimateTwo } = state!

  const selectedMundus: any = useQuery(GET_MUNDUS_STONE, {
    variables: { name: mundus.name },
  })
  const selectedBuff: any = useQuery(GET_BUFF, {
    variables: { name: buff.name },
  })
  const selectedUltimateOne: any = useQuery(GET_SKILL, {
    variables: { id: ultimateOne ? ultimateOne.id : 0 },
  })
  const selectedUltimateTwo: any = useQuery(GET_SKILL, {
    variables: { id: ultimateTwo ? ultimateTwo.id : 0 },
  })

  const handleSave = async () => {
    const {
      race,
      frontbarSelection,
      backbarSelection,
      bigPieceSelection,
      smallPieceSelection,
      jewelrySelection,
      newBarOne,
      newBarTwo,
    } = state!
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

    console.log(
      bigPieceSetSelections,
      smallPieceSelection,
      jewelrySetSelections,
      frontbarSetSelections,
      backbarSetSelections,
      frontbarSkillSelections,
      backbarSkillSelections
    )

    const build: any = await createBuild({
      variables: {
        data: {
          name: 'Test Build',
          race,
          esoClass: 'Warden',
          mundusStone: { connect: { id: selectedMundus.id } },
          buff: { connect: { id: selectedBuff.id } },
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
          ultimateOne: { connect: { id: selectedUltimateOne.id } },
          ultimateTwo: { connect: { id: selectedUltimateTwo.id } },
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

    console.log(build)
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
      state.class ===
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
          <Details />
        ) : (
          <Redirect to='/build/0' />
        )}
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
            onClick={handleNextClick}
            disabled={isDisabled}
            size='large'
            type='primary'
          >
            <Icon type={tab === 4 ? 'save' : 'right'} />
            {tab === 4 ? 'Save' : 'Next'}
          </TabButton>
        </Tooltip>
        <Redirect to={`/build/${tab}`} push />
      </Footer>
    </BuildContext.Provider>
  )
}
