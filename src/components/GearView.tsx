import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import GearSlot from "../components/GearSlot";
import { head, chest, legs, hands, belt, feet, shoulders, mainHand, offHand, quickslot, ring, neck } from "../assets/gear";

const GearView = styled.div`
  height: 100vw;
`;

const MiniTitle = styled.h4`
  font-size: 1em;
`

export default () => {
    return (
        <GearView>
          <MiniTitle>Apparel</MiniTitle>
          <GearSlot tooltip="top" slot={head} title="OP DLC set" content="OP set with random stats" /><br/>
          <GearSlot tooltip="left" slot={shoulders} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={chest} title="OP DLC set" content="OP set with random stats" /><br/>
          <GearSlot tooltip="left" slot={belt} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={hands} title="OP DLC set" content="OP set with random stats" /><br/>
          <GearSlot tooltip="left" slot={legs} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={feet} title="OP DLC set" content="OP set with random stats" /><br/>
          <MiniTitle>Accessories</MiniTitle>
          <GearSlot tooltip="left" slot={neck} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="bottom" slot={ring} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={ring} title="OP DLC set" content="OP set with random stats" />
          <MiniTitle>Weapons</MiniTitle>
          <GearSlot tooltip="left" slot={mainHand} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={offHand} title="OP DLC set" content="OP set with random stats" /><br/>
          <GearSlot tooltip="left" slot={mainHand} title="OP DLC set" content="OP set with random stats" />
          <GearSlot tooltip="right" slot={offHand} title="OP DLC set" content="OP set with random stats" />
        </GearView>
    )
};