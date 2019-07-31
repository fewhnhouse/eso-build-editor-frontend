import {
  IBuildState,
  defaultBuildState,
  ISkillSelection
} from "./../BuildStateContext";
import { IBuildAction } from "../BuildStateContext";

export const skillReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "SELECT_MORPH": {
      const { baseSkill, morph } = action.payload;
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.id === baseSkill.id
          ? { skill: morph, index: slot.index }
          : slot;
      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine => {
          if (skillLine.id === state.skillLine) {
            return {
              id: skillLine.id,
              selectedSkills: skillLine.selectedSkills.map(morphMap),
              selectedUltimate:
                skillLine.selectedUltimate &&
                skillLine.selectedUltimate.id === baseSkill.id
                  ? morph
                  : skillLine.selectedUltimate
            };
          } else {
            return skillLine;
          }
        }),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.id === baseSkill.id
            ? morph
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.id === baseSkill.id
            ? morph
            : state.ultimateTwo
      };
    }
    case "UNSELECT_MORPH": {
      const { baseSkill, morph } = action.payload;
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.id === morph.id
          ? { skill: baseSkill, index: slot.index }
          : slot;

      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate &&
                  skillLine.selectedUltimate.id === morph.id
                    ? baseSkill
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.id === morph.id
            ? baseSkill
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.id === morph.id
            ? baseSkill
            : state.ultimateTwo
      };
    }
    case "SWAP_MORPH": {
      const { oldMorph, newMorph } = action.payload;
      const morphMap = (slot: ISkillSelection) =>
        slot.skill && slot.skill.id === oldMorph.id
          ? { skill: newMorph, index: slot.index }
          : slot;

      return {
        ...state,
        newBarOne: state.newBarOne.map(morphMap),
        newBarTwo: state.newBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate &&
                  skillLine.selectedUltimate.id === oldMorph.id
                    ? newMorph
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne && state.ultimateOne.id === oldMorph.id
            ? newMorph
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo && state.ultimateTwo.id === oldMorph.id
            ? newMorph
            : state.ultimateTwo
      };
    }
    case "SET_SKILLS":
      return {
        ...state,
        skills: action.payload
      };
    case "SET_SELECTED_SKILLS_AND_ULTIMATE": {
      const { id, selectedSkills, ultimate } = action.payload;
      return {
        ...state,
        selectedSkills,
        selectedSkillLines: state.selectedSkillLines.find(
          skillLine => skillLine.id === id
        )
          ? [...state.selectedSkillLines]
          : [
              ...state.selectedSkillLines,
              { id, selectedSkills, selectedUltimate: ultimate }
            ]
      };
    }
    case "SET_SKILLLINE":
      const { skillLine } = action.payload;
      return {
        ...state,
        skillLine
      };
    case "RESET_SKILLS":
      const { ultimateOne, ultimateTwo } = defaultBuildState;
      return {
        ...state,
        ultimateOne,
        ultimateTwo,
        skillLine: 0
      };
    default:
      return state;
  }
};
