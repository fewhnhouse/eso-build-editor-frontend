import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import Card from "./Card";
import { Divider, Layout, Typography } from "antd";
import Flex from "../../components/Flex";

const { Content } = Layout;
const { Title } = Typography;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`;

const Setup = styled(Flex)`
  &::nth-child() {
    padding: 10px;
  }
`;

const roles = [
  {
    role: "Stamina DD",
    classes: [
      {
        description: "Main damage + caltrops, Thurvokun.",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "Main damage + frost armor, Thurvokun.",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "Main damage + frost armor, retreating maneuver, Trollking.",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "Main damage, bone colossus & backup ressing ultimate.",
        class: "Necromancer",
        race: "Imperial"
      },
      {
        description: "Damage & support, ressing ultimate, buffs.",
        class: "Necromancer",
        race: "Imperial"
      }
    ]
  },
  {
    role: "Stamina Support",
    classes: [
      {
        description: "Damage and support, heavy on tether ultimates for healing.",
        class: "Nightblade",
        race: "Imperial"
      },
      {
        description: "Damage and support, nova & remembrance, repentance duty.",
        class: "Templar",
        race: "Imperial"
      },
      {
        description: "Damage and support, offensive / 1st negate.",
        class: "Sorcerer",
        race: "Imperial"
      },
      {
        description: "Damage and support, counter / 2nd negate, main speed duty.",
        class: "Sorcerer",
        race: "Imperial"
      }
    ]
  },
  {
    role: "Magicka DD",
    classes: [
      {
        description: "Damage, destro ultimate, just needs to stay alive.",
        class: "Nightblade",
        race: "Khajiit"
      }
    ]
  },
  {
    role: "Magicka Support",
    classes: [
      {
        description: "Support, purge and siege shield, bubbles, healing tethers.",
        class: "Nightblade",
        race: "Breton"
      },
      {
        description: "Support and synergies, bubbles, banners, talons.",
        class: "Dragonknight",
        race: "Breton"
      }
    ]
  }
];

export default () => {
  const [role, setRole] = useState("");

  const handleRoleClick = (roleName: string) => () => {
    setRole(roleName);
  };

  return role !== "" ? (
    <Redirect push to={`/details/${role}`} />
  ) : (
    <Container>
      <Title>FIST+ BUILD EDITOR DELUXE</Title>
      {roles.map(role => (
        <>
          <Divider>{role.role}</Divider>
          <Setup direction="row" align="" justify="center" wrap>
            {role.classes.map(classEl => (
              <Card role={{ role: role.role, esoClass: classEl }} />
            ))}
          </Setup>
        </>
      ))}
    </Container>
  );
};
