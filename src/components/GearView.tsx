import React from "react";
import styled from "styled-components";

import { Typography } from "antd";
import Flex from "./Flex";
import GearSlot, { IGearSlot, DisplaySlot } from "./GearSlot";

const GearView = styled.div``;

const { Title } = Typography;

export interface IGearSetup {
  id: string;
  label: string;
  data: IGearSlot[];
}

export interface IEnchants {
  weaponEnchants: any;
  armorEnchants: any;
  jewelryEnchants: any;
}

export interface ITraits {
  weaponTraits: any;
  jewelryTraits: any;
  armorTraits: any;
}

interface IGearViewProps {
  setups: IGearSetup[];
  droppable?: boolean;
  disabled?: boolean;
  newGear?: boolean;
  enchants?: IEnchants;
  traits?: ITraits;
}

export default ({
  setups,
  droppable,
  newGear,
  disabled,
  enchants,
  traits
}: IGearViewProps) => {
  return (
    <GearView>
      {setups.map((setup: IGearSetup, index) => (
        <div key={"setup" + index}>
          <Title level={4}>{setup.label}</Title>
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ flexWrap: "wrap" }}
          >
            {setup.data.map((slot: IGearSlot, index: number) => {
              return disabled ? (
                <DisplaySlot slot={slot} />
              ) : (
                <GearSlot
                  droppable={droppable}
                  slot={slot}
                  group={setup.id}
                  key={"drop" + slot.slot + index}
                />
              );
            })}
          </Flex>
        </div>
      ))}
    </GearView>
  );
};
