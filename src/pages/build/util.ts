import {
  IBuildState,
  IMundus,
  ISetSelection,
  ISkillSelection,
  WeaponType,
} from './BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common'
import { ISpecialBuff } from './consumables/BuffMenu'
import { ISkill } from '../../components/SkillSlot'
export const handleEditSave = async (
  initialSkillBarOne: ISkillSelection[],
  initialSkillBarTwo: ISkillSelection[],
  updateSkillSelection: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  updateSetSelection: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  updateBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  state: IBuildState,
  mundusStone: IMundus,
  buff: ISpecialBuff,
  ultimateOne?: ISkill,
  ultimateTwo?: ISkill
) => {
  const {
    id,
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
    // mainResource,
    description,
    published,
  }: IBuildState = state!

  const createSetVariables = (setSelection: ISetSelection) => ({
    where: { id: setSelection.id },
    data: {
      slot: setSelection.slot,
      selectedSet: setSelection.selectedSet
        ? { connect: { id: setSelection.selectedSet.id } }
        : undefined,
      trait: setSelection.trait
        ? {
            connect: { description: setSelection.trait.description },
          }
        : undefined,
      glyph: setSelection.glyph
        ? {
            connect: { description: setSelection.glyph.description },
          }
        : undefined,
      type: setSelection.type,
      weaponType: setSelection.weaponType,
    },
  })
  await frontbarSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await backbarSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await bigPieceSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await smallPieceSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await jewelrySelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })

  const createSkillVariables = (skillSelection: ISkillSelection) => ({
    where: { id: skillSelection.id },
    data: {
      index: skillSelection.index,
      skill: skillSelection.skill
        ? { connect: { id: skillSelection.skill.id } }
        : undefined,
    },
  })
  await newBarOne.map(async skillSelection => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    })
  })
  await newBarTwo.map(async skillSelection => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    })
  })

  console.log('done with prior')

  return await updateBuild({
    variables: {
      where: {
        id,
      },
      data: {
        name,
        race,
        esoClass,
        description,
        applicationArea,
        published,
        /*
        newBarOne: {
          delete: initialSkillBarOne.map(skillSelection => ({ id: skillSelection.id })),
          create: newBarOne.map(skillSelection => ({ index: skillSelection.index, skill: { connect: skillSelection.skill ? { id: skillSelection.skill.id } : undefined } }))
        },
        newBarTwo: {
          delete: initialSkillBarTwo.map(skillSelection => ({ id: skillSelection.id })),
          create: newBarOne.map(skillSelection => ({ index: skillSelection.index, skill: { connect: skillSelection.skill ? { id: skillSelection.skill.id } : undefined } }))
        },*/
        role,
        mundusStone: { connect: { name: mundusStone.name } },
        buff: { connect: { name: buff.name } },
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
      },
    },
  })
}

export const handleCreateSave = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  state: IBuildState,
  mundusStone: IMundus,
  buff: ISpecialBuff,
  ultimateOne?: ISkill,
  ultimateTwo?: ISkill
) => {
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
    published,
    // mainResource,
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
        published,
        esoClass,
        description,
        applicationArea,
        role,
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
  })
}
