import {
  IBuildState,
  ISetSelection,
  WeaponType,
  IBuild,
  IBuildRevision,
} from '../BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../../home/UserHomeCard'

export const createNewBuild = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  state: IBuildState
): Promise<void | ExecutionResult<IBuild>> => {
  const {
    race,
    esoClass,
    mundusStone,
    accessRights,
    buff,
    ultimateOne,
    ultimateTwo,
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
    magicka,
    stamina,
    health,
    description,
  }: IBuildState = state!

  const hasValidFrontbar = frontbarSelection[0].selectedSet
    ? frontbarSelection[0].type === WeaponType.onehanded
      ? frontbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false
  const hasValidBackbar = backbarSelection[0].selectedSet
    ? backbarSelection[0].type === WeaponType.onehanded
      ? backbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false

  const hasValidBigPieces = bigPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )
  const hasValidSmallPieces = smallPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )
  const hasValidJewelry = jewelrySelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )

  const hasValidSkillBarOne = newBarOne.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  )
  const hasValidSkillBarTwo = newBarTwo.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  )
  const hasValidUltimateOne = ultimateOne && ultimateOne.skillId !== 0
  const hasValidUltimateTwo = ultimateTwo && ultimateTwo.skillId !== 0

  if (
    !hasValidBackbar ||
    !hasValidFrontbar ||
    !hasValidBigPieces ||
    !hasValidSmallPieces ||
    !hasValidJewelry ||
    !hasValidSkillBarOne ||
    !hasValidSkillBarTwo ||
    !hasValidUltimateOne ||
    !hasValidUltimateTwo
  ) {
    throw Error('Invalid build state.')
  }

  const createSetVariables = (setSelections: ISetSelection[]) => ({
    slots: setSelections.map(setSelection => setSelection.slot),
    types: setSelections.map(setSelection => setSelection.type || ''),
    weaponTypes: setSelections.map(
      setSelection => setSelection.weaponType || ''
    ),
    setIds: setSelections.map(setSelection =>
      setSelection.selectedSet ? setSelection.selectedSet.setId : 0
    ),
    glyphDescriptions: setSelections.map(setSelection =>
      setSelection.glyph ? setSelection.glyph.description : ''
    ),
    traitDescriptions: setSelections.map(setSelection =>
      setSelection.trait ? setSelection.trait.description : ''
    ),
  })
  const frontbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarOne.map(sel => sel.index),
      skillIds: newBarOne.map(sel => (sel.skill ? sel.skill.skillId : 0)),
    },
  })
  const backbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarTwo.map(sel => sel.index),
      skillIds: newBarTwo.map(sel => (sel.skill ? sel.skill.skillId : 0)),
    },
  })
  const bigPieceSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(bigPieceSelection),
    },
  })
  const smallPieceSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(smallPieceSelection),
    },
  })
  const jewelrySetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(jewelrySelection),
    },
  })
  const frontbarSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(frontbarSelection),
    },
  })
  const backbarSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(backbarSelection),
    },
  })

  return await createBuild({
    variables: {
      data: {
        name,
        race,
        accessRights,
        esoClass,
        description,
        applicationArea,
        role,
        health,
        stamina,
        magicka,
        mundusStone: { connect: { name: mundusStone.name } },
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
          ultimateOne && ultimateOne.skillId !== 0
            ? {
                connect: { skillId: ultimateOne.skillId },
              }
            : undefined,
        ultimateTwo:
          ultimateTwo && ultimateTwo.skillId !== 0
            ? {
                connect: { skillId: ultimateTwo.skillId },
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
    refetchQueries: [{ query: ME }],
  })
}

export const handleCreateSave = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createBuildRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuildRevision>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  state: IBuildState
): Promise<void | ExecutionResult<IBuild>> => {
  const build = await createNewBuild(
    createSkillSelections,
    createSetSelections,
    createBuild,
    state
  )
  if (build && build.data && build.data.id) {
    await createBuildRevision({
      variables: { data: { builds: [{ connect: { id: build.data.id } }] } },
    })
    return build
  }
}
