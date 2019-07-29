import React, { useState, useContext } from "react";
import { Divider, Select, Radio, Typography } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import {
  sapphire,
  garnet,
  diamond,
  bloodstone,
  fortifiedNirncrux,
  sardonyx,
  emerald,
  quartz,
  almandine
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
  rage,
  health,
  magicka,
  stamina
} from "../../../assets/glyphs";
import { SelectWithTitle, CustomSelect } from "./CustomSelect";
import { BuildContext } from "../BuildStateContext";
import { SelectValue } from "antd/lib/select";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`;

export default () => {
  const glyphs = [
    {
      type: "Glyph of Health",
      description: "Adds 954 Max Health.",
      icon: health
    },
    {
      type: "Glyph of Magicka",
      description: "Adds 868 Max Magicka.",
      icon: magicka
    },
    {
      type: "Glyph of Stamina",
      description: "Adds 868 Max Stamina.",
      icon: stamina
    },
    {
      type: "Glyph of Prismatic Defense",
      description: "Adds 477 Health, 434 Stamina and 434 Magicka.",
      icon: prismatic
    }
  ];

  const traits = [
    {
      type: "Divines",
      description: "Increases Mundus Stone effects by 7.5%",
      icon: sapphire
    },
    {
      type: "Invigorating",
      description: "Increases Magicka, Stamina and Health Recovery 11.",
      icon: garnet
    },
    {
      type: "Impenetrable",
      description:
        "Reduces item's durability damage 50%. Increases Critical Resistance by 258.",
      icon: diamond
    },
    {
      type: "Infused",
      description: "Increase Armor Enchantment effect by 20%",
      icon: bloodstone
    },
    {
      type: "Nirnhoned",
      description: "Increases Spell Resistance and Physical Resistance by 301",
      icon: fortifiedNirncrux
    },
    {
      type: "Reinforced",
      description: "Increases Armor by 16%",
      icon: sardonyx
    },
    { type: "Sturdy", description: "Reduced Block cost by 4%.", icon: quartz },
    {
      type: "Training",
      description: "Increases experience gained from kills by 11%.",
      icon: emerald
    },
    {
      type: "Well-Fitted",
      description: "Reduces the cost of Sprinting and Roll Dodge by 5%.",
      icon: almandine
    }
  ];
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "SET_ARMOR_TYPE",
      payload: { armorType: e.target.value }
    });
  };

  const onChangeSelect = (
    index: number,
    actionType: string,
    type: "selectedTraits" | "selectedGlyphs"
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { index, value, type } });
  };
  const [state, dispatch] = useContext(BuildContext);
  const { armorType, armorStats } = state!;

  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group
        onChange={onChange}
        defaultValue={armorType || "mediumarmor"}
      >
        <Radio.Button value="lightarmor">Light Armor</Radio.Button>
        <Radio.Button value="mediumarmor">Medium Armor</Radio.Button>
        <Radio.Button value="heavyarmor">Heavy Armor</Radio.Button>
      </Radio.Group>

      <Divider>Enchants</Divider>
      <Flex
        style={{ width: "100%", minHeight: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[0]}
          onChange={onChangeSelect(0, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Head"
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[1]}
          onChange={onChangeSelect(1, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Chest"
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[2]}
          onChange={onChangeSelect(2, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Legs"
        />
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      <Flex
        style={{ width: "100%", minHeight: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[3]}
          onChange={onChangeSelect(3, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Hands"
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[4]}
          onChange={onChangeSelect(4, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Feet"
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[5]}
          onChange={onChangeSelect(5, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Shoulders"
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[6]}
          onChange={onChangeSelect(6, "SET_ARMOR_STATS", "selectedGlyphs")}
          items={glyphs}
          title="Belt"
        />
      </Flex>
      <Divider>Traits</Divider>
      <Flex
        style={{ width: "100%", minHeight: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[0]}
          onChange={onChangeSelect(0, "SET_ARMOR_STATS", "selectedTraits")}
          title="Head"
          items={traits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[1]}
          onChange={onChangeSelect(1, "SET_ARMOR_STATS", "selectedTraits")}
          title="Chest"
          items={traits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[2]}
          onChange={onChangeSelect(2, "SET_ARMOR_STATS", "selectedTraits")}
          title="Legs"
          items={traits}
        />
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      <Flex
        style={{ width: "100%", minHeight: 150, flexWrap: "wrap" }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[3]}
          onChange={onChangeSelect(3, "SET_ARMOR_STATS", "selectedTraits")}
          title="Hands"
          items={traits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[4]}
          onChange={onChangeSelect(4, "SET_ARMOR_STATS", "selectedTraits")}
          title="Feet"
          items={traits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[5]}
          onChange={onChangeSelect(5, "SET_ARMOR_STATS", "selectedTraits")}
          title="Shoulders"
          items={traits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[6]}
          onChange={onChangeSelect(6, "SET_ARMOR_STATS", "selectedTraits")}
          title="Belt"
          items={traits}
        />
      </Flex>
    </StyledFlex>
  );
};

const StyledCustomSelect = styled(CustomSelect)`
  flex: 1;
  margin: 0px 10px;
`;

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 250px;
  max-width: 250px;
  margin: 0px 10px;
`;
