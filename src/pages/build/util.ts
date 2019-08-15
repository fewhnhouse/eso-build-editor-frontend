import {
  IBuildState,
  IMundus,
  ISetSelection,
  ISkillSelection,
} from './BuildStateContext';
import { message, notification } from 'antd';
import React from 'react';
import {
  MutationFunction,
  MutationFunctionOptions,
  ExecutionResult,
} from '@apollo/react-common';
import { ISpecialBuff } from './consumables/BuffMenu';
import { ISkill } from '../../components/SkillSlot';
export const handleEditSave = async (
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
  ultimateTwo?: ISkill,
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
    mainResource,
    description,
  }: IBuildState = state!;

  const createSetVariables = (setSelection: ISetSelection) => ({
    where: { id: setSelection.id },
    data: {
      slot: setSelection.slot,
      selectedSet:
        setSelection.selectedSet && setSelection.selectedSet.setId !== 0
          ? { connect: { setId: setSelection.selectedSet.setId } }
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
  });
  console.log(frontbarSelection, backbarSelection, bigPieceSelection, smallPieceSelection, jewelrySelection, newBarOne, newBarTwo)
  const frontbar = await frontbarSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    });
  });
  const backbar = await backbarSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    });
  });
  const bigPieces = await bigPieceSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    });
  });
  const smallPieces = await smallPieceSelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    });
  });
  const jewelry = await jewelrySelection.map(async setSelection => {
    return updateSetSelection({
      variables: {
        ...createSetVariables(setSelection),
      },
    });
  });

  const createSkillVariables = (skillSelection: ISkillSelection) => ({
    where: { id: skillSelection.id },
    data: {
      index: skillSelection.index,
      skill:
        skillSelection.skill && skillSelection.skill.skillId !== 0
          ? { connect: { skillId: skillSelection.skill.skillId } }
          : undefined,
    },
  });
  newBarOne.map(async skillSelection => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    });
  });
  newBarTwo.map(async skillSelection => {
    return updateSkillSelection({
      variables: {
        ...createSkillVariables(skillSelection),
      },
    });
  });
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
  });
};

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
    mainResource,
    description,
  }: IBuildState = state!;

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
  });
  const frontbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarOne.map(sel => sel.index),
      skillIds: newBarOne.map(sel => (sel.skill ? sel.skill.skillId : 0)),
    },
  });
  const backbarSkillSelections: any = await createSkillSelections({
    variables: {
      indices: newBarTwo.map(sel => sel.index),
      skillIds: newBarTwo.map(sel => (sel.skill ? sel.skill.skillId : 0)),
    },
  });
  const bigPieceSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(bigPieceSelection),
    },
  });
  const smallPieceSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(smallPieceSelection),
    },
  });
  const jewelrySetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(jewelrySelection),
    },
  });
  const frontbarSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(frontbarSelection),
    },
  });
  const backbarSetSelections: any = await createSetSelections({
    variables: {
      ...createSetVariables(backbarSelection),
    },
  });

  return await createBuild({
    variables: {
      data: {
        name,
        race,
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
  });
};
