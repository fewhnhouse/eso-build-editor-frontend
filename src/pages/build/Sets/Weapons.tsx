import React, { useState, useContext } from "react";
import { Divider, Select, Radio, Typography } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import {
  amethyst,
  turquoise,
  jade,
  potentNirncrux,
  chysolite,
  ruby,
  fireOpal,
  carnelian,
  citrine
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
import { OptionProps, SelectValue } from "antd/lib/select";
import { CustomSelect, SelectWithTitle } from "./CustomSelect";
import { BuildContext } from "../BuildStateContext";

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`;

const StyledSelectWithTitle = styled(SelectWithTitle)`
  width: 50%;
  margin: 0px 10px;
`;

const StyledSelectContainer = styled(Flex)`
  margin: 20px;
  width: 50%;
`;

const SelectContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const { Option } = Select;
export default () => {
  const glyphs = [
    { type: "Glyph of Flame", description: "Deals fire damage.", icon: flame },
    { type: "Glyph of Frost", description: "Deals cold damage.", icon: frost },
    { type: "Glyph of Shock", description: "Deals shock damage.", icon: shock },
    {
      type: "Glyph of Poison",
      description: "Deals poison damage.",
      icon: poison
    },
    {
      type: "Glyph of Foulness",
      description: "Deals disease damage.",
      icon: foulness
    },
    {
      type: "Glyph of Decrease Health",
      description: "Deals unresistable damage.",
      icon: decreaseHealth
    },
    {
      type: "Glyph of Hardening",
      description: "Grants a point damage shield for 5 seconds.",
      icon: hardening
    },
    {
      type: "Glyph of Absorb Health",
      description: "Deals magic damage and restores health.",
      icon: absorbHealth
    },
    {
      type: "Glyph of Absorb Magicka",
      description: "Deals magic damage and restores magicka.",
      icon: absorbMagicka
    },
    {
      type: "Glyph of Absorb Stamina",
      description: "Deals physical damage and restores stamina.",
      icon: absorbStamina
    },
    {
      type: "Glyph of Weapon Damage",
      description: "Increases your weapon/spell damage for 5 seconds.",
      icon: rage
    },
    {
      type: "Glyph of Weakening",
      description: "Reduces targets weapon damage for 5 seconds.",
      icon: weakening
    },
    {
      type: "Glyph of Crushing",
      description: "Reduces targets armor for 5 seconds.",
      icon: crushing
    },
    {
      type: "Glyph of Prismatic Onslaught",
      description: "Deals magic damage to undead and daedra.",
      icon: prismatic
    }
  ];

  const traits = [
    {
      type: "Charged",
      description: "Increases chance to apply Status Effects by 110% / 220%",
      icon: amethyst
    },
    {
      type: "Defending",
      description:
        "Increases total Physical Resistance and Spell Resistance by 1376 / 2752.",
      icon: turquoise
    },
    {
      type: "Infused",
      description:
        "Reduces Enchantment Cooldown by 50%. Increases Weapon Enchantment effect by 30%.",
      icon: jade
    },
    {
      type: "Nirnhoned",
      description: "Increases Weapon Damage by 15%.",
      icon: potentNirncrux
    },
    {
      type: "Powered",
      description: "Increases healing done by 4.5% / 9%.",
      icon: chysolite
    },
    {
      type: "Precise",
      description: "Increases Weapon and Spell Critical Values by 3.5% / 7%.",
      icon: ruby
    },
    {
      type: "Sharpened",
      description: "Increase Armor and Spell Penetration by 1376 / 2752.",
      icon: fireOpal
    },
    {
      type: "Training",
      description: "Increases experience gained from kills by 4.5% / 9%.",
      icon: carnelian
    },
    {
      type: "Decisive",
      description:
        "20% / 40% Chance to gain 1 additional Ultimate anytime that Ultimate is gained.",
      icon: citrine
    }
  ];
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "SET_WEAPON_TYPE",
      payload: { weaponType: e.target.value }
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
  const { weaponType, weapons } = state!;
  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group onChange={onChange} defaultValue="onehanded">
        <Radio.Button value="onehanded">One Handed</Radio.Button>
        <Radio.Button value="twohanded">Two Handed</Radio.Button>
      </Radio.Group>
      <Divider />
      <StyledSelectContainer direction="row" justify="center" align="center">
        {weaponType === "onehanded" ? (
          <>
            <Select
              size="large"
              onChange={onChangeSelect(0, "SET_WEAPONS", "selectedGlyphs")}
              placeholder="Select Mainhand"
              style={{ flex: 1, margin: "0px 10px" }}
            >
              <Option value="main-dagger">Dagger</Option>
              <Option value="main-sword">Sword</Option>
              <Option value="main-mace">Mace</Option>
              <Option value="main-axe">Axe</Option>
            </Select>
            <Select
              size="large"
              onChange={onChangeSelect(1, "SET_WEAPONS", "selectedGlyphs")}
              placeholder="Select Off-Hand"
              style={{ flex: 1, margin: "0px 10px" }}
            >
              <Option value="off-dagger">Dagger</Option>
              <Option value="off-sword">Sword</Option>
              <Option value="off-mace">Mace</Option>
              <Option value="off-axe">Axe</Option>
              <Option value="off-shield">Shield</Option>
            </Select>
          </>
        ) : (
          <Select
            size="large"
            onChange={onChangeSelect(0, "SET_WEAPONS", "selectedGlyphs")}
            placeholder="Select a weapon"
            style={{ flex: 1, margin: "0px 10px" }}
          >
            <Option value="two-restoration">Restoration Staff</Option>
            <Option value="two-fire">Fire Staff</Option>
            <Option value="two-shock">Shock Staff</Option>
            <Option value="two-frost">Frost Staff</Option>
            <Option value="two-sword">Sword</Option>
            <Option value="two-maul">Maul</Option>
            <Option value="two-axe">Axe</Option>
          </Select>
        )}
      </StyledSelectContainer>
      <Divider>Enchants</Divider>
      <SelectContainer>
        {weaponType === "twohanded" ? (
          <StyledSelectWithTitle
            onChange={onChangeSelect(0, "SET_WEAPON_STATS", "selectedGlyphs")}
            title="Main Hand"
            items={glyphs}
          />
        ) : (
          <Flex
            style={{ width: "100%" }}
            direction="row"
            justify="center"
            align="flex-start"
          >
            <StyledSelectWithTitle
              onChange={onChangeSelect(0, "SET_WEAPON_STATS", "selectedGlyphs")}
              title="Main Hand"
              items={glyphs}
            />
            <StyledSelectWithTitle
              onChange={onChangeSelect(1, "SET_WEAPON_STATS", "selectedGlyphs")}
              title="Off Hand"
              items={glyphs}
            />
          </Flex>
        )}
      </SelectContainer>
      <SelectContainer>
        <Divider>Traits</Divider>
        {weaponType === "twohanded" ? (
          <StyledSelectWithTitle
            onChange={onChangeSelect(0, "SET_WEAPON_STATS", "selectedTraits")}
            title="Main Hand"
            dropdownMenuStyle={{ top: -30, position: "absolute" }}
            items={traits}
          />
        ) : (
          <Flex
            style={{ width: "100%" }}
            direction="row"
            justify="center"
            align="flex-start"
          >
            <StyledSelectWithTitle
              onChange={onChangeSelect(0, "SET_WEAPON_STATS", "selectedTraits")}
              title="Main Hand"
              items={traits}
            />
            <StyledSelectWithTitle
              onChange={onChangeSelect(1, "SET_WEAPON_STATS", "selectedTraits")}
              title="Off Hand"
              items={traits}
            />
          </Flex>
        )}
      </SelectContainer>
    </StyledFlex>
  );
};
