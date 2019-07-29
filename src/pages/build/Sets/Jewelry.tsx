import React, { useState, useContext } from "react";
import { Divider, Select, Radio, Typography } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import {
  slaughterStone,
  dibellium,
  gildinWax,
  dawnPrism,
  titanium,
  aurbicAmber,
  zinc,
  antimony,
  cobalt
} from "../../../assets/traits";
import {
  flame,
  frost,
  shock,
  poison,
  foulness,
  decreaseHealth,
  hardening,
  absorbHealth,
  absorbMagicka,
  absorbStamina,
  weakening,
  crushing,
  prismatic,
  rage
} from "../../../assets/glyphs";
import { SelectWithTitle } from "./CustomSelect";
import { SelectValue } from "antd/lib/select";
import { BuildContext } from "../BuildStateContext";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
  overflow-y: auto;
`;

const StyledSelect = styled(Select)`
  width: 50%;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px 10px;
`;

const { Option } = Select;
export default () => {
  const glyphs = [
    {
      type: "Glyph of Increase Physical Harm",
      description: "Adds 174 Weapon Damage.",
      icon: flame
    },
    {
      type: "Glyph of Increase Magical Harm",
      description: "Adds 174 Spell Damage",
      icon: frost
    },
    {
      type: "Glyph of Health Recovery",
      description: "Adds 169 Health Recovery",
      icon: shock
    },
    {
      type: "Glyph of Magicka Recovery",
      description: "Adds 169 Magicka Recovery.",
      icon: poison
    },
    {
      type: "Glyph of Stamina Recovery",
      description: "Adds 169 Stamina Recovery.",
      icon: foulness
    },
    {
      type: "Glyph of Reduce Spell Cost",
      description: "Reduce Magicka cost of spells by 203.",
      icon: decreaseHealth
    },
    {
      type: "Glyph of Reduce Feat Cost",
      description: "Reduce Stamina cost of abilities by 203.",
      icon: hardening
    },
    {
      type: "Glyph of Shielding",
      description:
        "Reduce cost of bash by 304 and reduce cost of blocking by 203.",
      icon: absorbHealth
    },
    {
      type: "Glyph of Bashing",
      description: "Increase Bash Damage by 288.",
      icon: absorbMagicka
    },
    {
      type: "Glyph of Decrease Physical Harm",
      description: "Adds 927 Physical Resistance.",
      icon: absorbStamina
    },
    {
      type: "Glyph of Decrease Spell Harm",
      description: "Adds 927 Spell Resistance.",
      icon: rage
    },
    {
      type: "Glyph of Flame Resist",
      description: "Adds 3520 Flame Resistance.",
      icon: weakening
    },
    {
      type: "Glyph of Frost Resist",
      description: "Adds 3520 Cold Resistance.",
      icon: crushing
    },
    {
      type: "Glyph of Shock Resist",
      description: "Adds 3520 Shock Resistance.",
      icon: prismatic
    },
    {
      type: "Glyph of Poison Resist",
      description: "Adds 3520 Poison Resistance.",
      icon: prismatic
    },
    {
      type: "Glyph of Disease Resist",
      description: "Adds 3520 Disease Resistance.",
      icon: prismatic
    },
    {
      type: "Glyph of Potion Speed",
      description:
        "Reduce the cooldown of potions below this item's level by 5 seconds.",
      icon: prismatic
    },
    {
      type: "Glyph of Potion Boost",
      description: "Increase the duration of potion effects by 3.6 seconds.",
      icon: prismatic
    }
  ];

  const traits = [
    {
      type: "Arcane",
      description: "Increases Max Magicka by 870.",
      icon: cobalt
    },
    {
      type: "Healthy",
      description: "Increases Max Health 957.",
      icon: antimony
    },
    {
      type: "Robust",
      description: "Increases Max Stamina by 870.",
      icon: zinc
    },
    {
      type: "Infused",
      description: "Increases Enchantment Effectiveness by 60%.",
      icon: aurbicAmber
    },
    {
      type: "Protective",
      description: "Increases Physical and Spell Resistance by 1844.",
      icon: titanium
    },
    {
      type: "Triune",
      description: "Increases Health by 478, Stamina by 435 & Magicka by 435.",
      icon: dawnPrism
    },
    {
      type: "Swift",
      description: "Increases Movement Speed by 6%.",
      icon: gildinWax
    },
    {
      type: "Harmony",
      description: "Increases Synergy Effectiveness by 35%.",
      icon: dibellium
    },
    {
      type: "Bloodthirsty",
      description: "Increases Damage against low-health foes by 10%.",
      icon: slaughterStone
    }
  ];

  const onChangeSelect = (
    index: number,
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { index, value, type } });
  };
  const [state, dispatch] = useContext(BuildContext);
  const { jewelryStats } = state!;

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Divider>Glyphs</Divider>
      <Flex
        style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[0]}
          onChange={onChangeSelect(0, "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Necklace"
          items={glyphs}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[1]}
          onChange={onChangeSelect(1, "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Ring 1"
          items={glyphs}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedGlyphs[2]}
          onChange={onChangeSelect(2, "SET_JEWELRY_STATS", "selectedGlyphs")}
          title="Ring 2"
          items={glyphs}
        />
      </Flex>

      <Divider>Traits</Divider>
      <Flex
        style={{ width: "100%", minHeigt: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[0]}
          onChange={onChangeSelect(0, "SET_JEWELRY_STATS", "selectedTraits")}
          title="Necklace"
          items={traits}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[1]}
          onChange={onChangeSelect(1, "SET_JEWELRY_STATS", "selectedTraits")}
          title="Ring 1"
          items={traits}
        />
        <StyledSelectWithTitle
          value={jewelryStats.selectedTraits[2]}
          onChange={onChangeSelect(2, "SET_JEWELRY_STATS", "selectedTraits")}
          title="Ring 2"
          items={traits}
        />
      </Flex>
    </StyledFlex>
  );
};

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 250px;
  max-width: 250px;

  margin: 0px 10px;
`;
