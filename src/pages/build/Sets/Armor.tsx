import React, { useState } from "react";
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
  const [weaponType, setWeaponType] = useState("onehanded");
  const onChange = (e: RadioChangeEvent) => {
    setWeaponType(e.target.value);
  };
  return (
    <StyledFlex direction="column" justify="center" align="center">
      <Radio.Group onChange={onChange} defaultValue="mediumarmor">
        <Radio.Button value="lightarmor">Light Armor</Radio.Button>
        <Radio.Button value="mediumarmor">Medium Armor</Radio.Button>
        <Radio.Button value="heavyarmor">Heavy Armor</Radio.Button>
      </Radio.Group>

      <Divider>Enchants</Divider>
      <Flex
        style={{ width: "100%", height: 150 }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle items={glyphs} title="Head" />
        <StyledSelectWithTitle items={glyphs} title="Chest" />
        <StyledSelectWithTitle items={glyphs} title="Legs" />
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      <Flex
        style={{ width: "100%", height: 150 }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle items={glyphs} title="Hands" />
        <StyledSelectWithTitle items={glyphs} title="Feet" />
        <StyledSelectWithTitle items={glyphs} title="Shoulders" />
        <StyledSelectWithTitle items={glyphs} title="Belt" />
      </Flex>
      <Divider>Traits</Divider>
      <Flex
        style={{ width: "100%", height: 150 }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle title="Head" items={traits} />
        <StyledSelectWithTitle title="Chest" items={traits} />
        <StyledSelectWithTitle title="Legs" items={traits} />
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      <Flex
        style={{ width: "100%", height: 150 }}
        direction="row"
        justify="space-between"
        align="flex-start"
      >
        <StyledSelectWithTitle title="Hands" items={traits} />
        <StyledSelectWithTitle title="Feet" items={traits} />
        <StyledSelectWithTitle title="Shoulders" items={traits} />
        <StyledSelectWithTitle title="Belt" items={traits} />
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
  margin: 0px 10px;
`;
