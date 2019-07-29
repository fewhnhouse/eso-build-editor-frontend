import { IBuildState, defaultBuildState } from "./../BuildStateContext";
import { ISkill } from "../../../components/SkillSlot";
import { ISlot, IBuildAction } from "../BuildStateContext";

export const skillReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "SELECT_MORPH": {
      const { baseId, morphId } = action.payload;
      const morphMap = (slot: ISlot) =>
        slot.id === baseId ? { id: morphId, index: slot.index } : slot;
      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === baseId
                    ? morphId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === baseId
            ? { id: morphId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === baseId
            ? { id: morphId, index: 5 }
            : state.ultimateTwo
      };
    }
    case "UNSELECT_MORPH": {
      const { baseId, morphId } = action.payload;
      const morphMap = (slot: ISlot) =>
        slot.id === morphId ? { id: baseId, index: slot.index } : slot;

      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === morphId
                    ? baseId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === morphId
            ? { id: baseId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === morphId
            ? { id: baseId, index: 5 }
            : state.ultimateTwo
      };
    }
    case "SWAP_MORPH": {
      const { oldMorphId, newMorphId } = action.payload;
      const morphMap = (slot: ISlot) =>
        slot.id === oldMorphId ? { id: newMorphId, index: slot.index } : slot;

      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === oldMorphId
                    ? newMorphId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === oldMorphId
            ? { id: newMorphId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === oldMorphId
            ? { id: newMorphId, index: 5 }
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
      const {
        activeBar,
        abilityBarOne,
        abilityBarTwo,
        ultimateOne,
        ultimateTwo
      } = defaultBuildState;
      return {
        ...state,
        activeBar,
        abilityBarOne,
        abilityBarTwo,
        ultimateOne,
        ultimateTwo,
        skillLine: 0
      };
    default:
      return state;
  }
};
