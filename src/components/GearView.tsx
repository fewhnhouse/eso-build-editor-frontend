import React from "react";
import styled from "styled-components";

import { Typography } from "antd";
import Flex from "./Flex";
import GearSlot, { DisplaySlot } from "./GearSlot";
import { ISetSelection } from "../pages/build/BuildStateContext";

const GearView = styled.div``;

const { Title } = Typography;

const StyledTitle = styled(Title)`
  margin-bottom: 5px !important;
  margin-top: 10px;
`

export interface IGearSetup {
  id: string;
  label: string;
  data: ISetSelection[];
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
}

export default ({ setups, droppable, disabled }: IGearViewProps) => {
  return (
    <GearView>
      {setups.map((setup: IGearSetup, index) => (
        <div key={"setup" + index}>
          <StyledTitle level={4}>{setup.label}</StyledTitle>
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ flexWrap: "wrap" }}
          >
            {setup.data.map((slot: ISetSelection, index: number) => {
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
