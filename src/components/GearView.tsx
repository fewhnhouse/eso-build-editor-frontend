import React from "react";
import styled from "styled-components";
import GearSlot, { IGearSlotProps, IGearSlot } from "../components/GearSlot";

import { Typography } from "antd";
import Flex from "./Flex";
import { IGearSetup } from "../pages/build/Sets/RightContent";

const GearView = styled.div``;

const { Title } = Typography;

export default ({ setups, id }: { setups: IGearSetup[]; id: number }) => {
  return (
    <GearView>
      {setups.map((setup: IGearSetup) => (
        <>
          <Title level={4}>{setup.name}</Title>
          <Flex direction="row" justify="center" align="center">
            {setup.data.map((slot: IGearSlot, index: number) => (
              <GearSlot
                droppable
                id={`${setup.name}-${id}`}
                slot={slot}
                index={index}
              />
            ))}
          </Flex>
        </>
      ))}
    </GearView>
  );
};
