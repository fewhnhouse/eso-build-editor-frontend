import {
  IBuildState,
  ISetSelection,
  ISkillSelection,
  IBuild,
} from '../BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'

export const handleEditSave = async (
  updateSkillSelection: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  updateSetSelection: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  updateBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  state: IBuildState,
  initialFrontbarSelection: ISetSelection[],
  initialBackbarSelection: ISetSelection[]
) => {
  const {
    id,
    race,
    esoClass,
    accessRights,
    frontbarSelection,
    backbarSelection,
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    newBarOne,
    newBarTwo,
    applicationArea,
    role,
    mundusStone,
    buff,
    ultimateOne,
    ultimateTwo,
    name,
    magicka,
    stamina,
    health,
    description,
  }: IBuildState = state!

  const createSetVariables = (setSelection: ISetSelection) => ({
    where: { id: setSelection.id },
    data: {
      slot: setSelection.slot,
      selectedSet: setSelection.selectedSet
        ? {
            connect: { id: setSelection.selectedSet.id },
          }
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

  const createWeaponSetVariables = (
    setSelection: ISetSelection,
    index: number,
    bar: 'frontbar' | 'backbar'
  ) => {
    const prevSetSelection =
      bar === 'frontbar' ? initialFrontbarSelection : initialBackbarSelection

    return {
      where: { id: setSelection.id || prevSetSelection[index].id },
      data: {
        slot: setSelection.slot,
        selectedSet: setSelection.selectedSet
          ? {
              connect: { id: setSelection.selectedSet.id },
            }
          : prevSetSelection[index].selectedSet
          ? {
              disconnect: true,
            }
          : undefined,
        trait: setSelection.trait
          ? {
              connect: { description: setSelection.trait.description },
            }
          : prevSetSelection[index].trait
          ? {
              disconnect: true,
            }
          : undefined,
        glyph: setSelection.glyph
          ? {
              connect: { description: setSelection.glyph.description },
            }
          : prevSetSelection[index].glyph
          ? {
              disconnect: true,
            }
          : undefined,
        type: setSelection.id ? setSelection.type : null,
        weaponType: setSelection.id ? setSelection.weaponType : null,
      },
    }
  }
  await frontbarSelection.map(async (setSelection, index) => {
    return updateSetSelection({
      variables: {
        ...createWeaponSetVariables(setSelection, index, 'frontbar'),
      },
    })
  })
  await backbarSelection.map(async (setSelection, index) => {
    return updateSetSelection({
      variables: {
        ...createWeaponSetVariables(setSelection, index, 'backbar'),
      },
    })
  })
  await bigPieceSelection.map(async (setSelection) => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await smallPieceSelection.map(async (setSelection) => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    })
  })
  await jewelrySelection.map(async (setSelection) => {
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
  await newBarOne.map(async (skillSelection) => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    })
  })
  await newBarTwo.map(async (skillSelection) => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    })
  })

  await updateBuild({
    variables: {
      where: {
        id,
      },
      data: {
        name,
        race,
        esoClass,
        accessRights,
        description,
        applicationArea,
        health,
        stamina,
        magicka,
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
