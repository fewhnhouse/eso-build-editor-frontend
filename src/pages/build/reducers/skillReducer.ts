import {
  IBuildState,
  defaultBuildState,
  ISkillSelection,
} from './../BuildStateContext'
import { IBuildAction } from '../BuildStateContext'
import { classSkillLines, skillLines } from '../Skills/skillLines'

export const skillReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'SELECT_MORPH': {
      const { baseSkill, morph } = action.payload
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.skillId === baseSkill.skillId
          ? { skill: morph, index: slot.index }
          : slot
      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map((skillLine) => {
          if (skillLine.id === state.skillLine) {
            return {
              id: skillLine.id,
              selectedSkills: skillLine.selectedSkills.map(morphMap),
              selectedUltimate:
                skillLine.selectedUltimate &&
                skillLine.selectedUltimate.skillId === baseSkill.skillId
                  ? morph
                  : skillLine.selectedUltimate,
            }
          } else {
            return skillLine
          }
        }),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.skillId === baseSkill.skillId
            ? morph
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.skillId === baseSkill.skillId
            ? morph
            : state.ultimateTwo,
      }
    }
    case 'UNSELECT_MORPH': {
      const { baseSkill, morph } = action.payload
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.skillId === morph.skillId
          ? { skill: baseSkill, index: slot.index }
          : slot

      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map((skillLine) =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate &&
                  skillLine.selectedUltimate.skillId === morph.skillId
                    ? baseSkill
                    : skillLine.selectedUltimate,
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.skillId === morph.skillId
            ? baseSkill
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.skillId === morph.skillId
            ? baseSkill
            : state.ultimateTwo,
      }
    }
    case 'SWAP_MORPH': {
      const { oldMorph, newMorph } = action.payload
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.skillId === oldMorph.skillId
          ? { skill: newMorph, index: slot.index }
          : slot

      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map((skillLine) =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate &&
                  skillLine.selectedUltimate.skillId === oldMorph.skillId
                    ? newMorph
                    : skillLine.selectedUltimate,
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.skillId === oldMorph.skillId
            ? newMorph
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.skillId === oldMorph.skillId
            ? newMorph
            : state.ultimateTwo,
      }
    }
    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.payload,
      }
    case 'SET_SELECTED_SKILLS_AND_ULTIMATE': {
      const { id, selectedSkills, ultimate } = action.payload
      return {
        ...state,
        selectedSkills,
        selectedSkillLines: state.selectedSkillLines.find(
          (skillLine) => skillLine.id === id
        )
          ? [...state.selectedSkillLines]
          : [
              ...state.selectedSkillLines,
              { id, selectedSkills, selectedUltimate: ultimate },
            ],
      }
    }
    case 'SET_SKILLLINE': {
      const { skillLine } = action.payload
      return {
        ...state,
        skillLine,
      }
    }
    case 'RESET_SKILLS': {
      const { ultimateOne, ultimateTwo, esoClass } = defaultBuildState
      const currentClassSkillLines = classSkillLines.find(
        (line) => line.esoClass === esoClass
      )
      return {
        ...state,
        ultimateOne: currentClassSkillLines?.items.find(
          (item) => item.id === state.ultimateOne?.skillline
        )
          ? undefined
          : ultimateOne,
        ultimateTwo: currentClassSkillLines?.items.find(
          (item) => item.id === state.ultimateTwo?.skillline
        )
          ? undefined
          : ultimateTwo,
        newBarOne: state!.newBarOne.map((item) => {
          const hasClassSkill = !!currentClassSkillLines?.items.find(
            (classLine) => classLine.id === item.skill?.skillline
          )
          return hasClassSkill ? { ...item, skill: undefined } : item
        }),
        newBarTwo: state!.newBarTwo.map((item) => {
          const hasClassSkill = !!currentClassSkillLines?.items.find(
            (classLine) => classLine.id === item.skill?.skillline
          )
          return hasClassSkill ? { ...item, skill: undefined } : item
        }),
        skillLine: 0,
      }
    }
    default:
      return state
  }
}
