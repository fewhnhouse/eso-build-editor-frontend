import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import Card from "./Card";
import { Divider, Layout } from "antd";

const Setup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  &::nth-child() {
    padding: 10px;
  }
`;
const { Footer, Content } = Layout;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: rgb(155, 155, 155);
`;
const Title = styled.h1`
  font-size: 4em;
`;

const roles = [
  {
    role: "Stamina DD",
    classes: [
      {
        description: "The bestest of DD's in raid",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "",
        class: "Warden",
        race: "Imperial"
      },
      {
        description: "",
        class: "Necromancer",
        race: "Imperial"
      },
      {
        description: "",
        class: "Necromancer",
        race: "Imperial"
      }
    ]
  },
  {
    role: "Stamina Support",
    classes: [
      {
        description: "",
        class: "Nightblade",
        race: "Imperial"
      },
      {
        description: "",
        class: "Templar",
        race: "Imperial"
      },
      {
        description: "",
        class: "Sorcerer",
        race: "Imperial"
      },
      {
        description: "",
        class: "Sorcerer",
        race: "Imperial"
      }
    ]
  },
  {
    role: "Magicka DD",
    classes: [
      {
        description: "",
        class: "Nightblade",
        race: "Khajiit"
      }
    ]
  },
  {
    role: "Magicka Support",
    classes: [
      {
        description: "",
        class: "Nightblade",
        race: "Breton"
      },
      {
        description: "",
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
          <Setup>
            {role.classes.map(classEl => (
              <Card role={{ role: role.role, esoClass: classEl }} />
            ))}
          </Setup>
        </>
      ))}
    </Container>
  );
};
