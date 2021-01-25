import { ISetSelection, IBuild, IBuildRevision } from '../BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../../home/LoggedInHome'

export const handleCopy = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createBuildRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuildRevision>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  build: IBuild
) => {
  const {
    race,
    accessRights,
    name,
    description,
    esoClass,
    applicationArea,
    role,
    mundusStone,
    buff,
    frontbarSelection,
    backbarSelection,
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    newBarOne,
    newBarTwo,
    ultimateOne,
    ultimateTwo,
    magicka,
    stamina,
    health,
  } = build

  const createSetVariables = (setSelections: ISetSelection[]) => ({
    slots: setSelections.map((setSelection) => setSelection.slot),
    types: setSelections.map((setSelection) => setSelection.type || ''),
    weaponTypes: setSelections.map(
      (setSelection) => setSelection.weaponType || ''
    ),
    setIds: setSelections.map((setSelection) =>
      setSelection.selectedSet ? setSelection.selectedSet.setId : 0
    ),
    glyphDescriptions: setSelections.map((setSelection) =>
      setSelection.glyph ? setSelection.glyph.description : ''
    ),
    traitDescriptions: setSelections.map((setSelection) =>
      setSelection.trait ? setSelection.trait.description : ''
    ),
  })

  const frontbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarOne.map((sel) => sel.index),
      skillIds: newBarOne.map((sel) => (sel.skill ? sel.skill.skillId : 0)),
    },
  })
  const backbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarTwo.map((sel) => sel.index),
      skillIds: newBarTwo.map((sel) => (sel.skill ? sel.skill.skillId : 0)),
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

  const createdBuild = await createBuild({
    variables: {
      data: {
        name,
        race,
        esoClass,
        description,
        applicationArea,
        role,
        health,
        stamina,
        magicka,
        accessRights,
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

  if (createdBuild && createdBuild.data && createdBuild.data.createBuild.id) {
    await createBuildRevision({
      variables: {
        data: { builds: { connect: { id: createdBuild.data.createBuild.id } } },
      },
    })
    return createdBuild
  }
}
