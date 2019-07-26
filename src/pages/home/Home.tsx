import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import Card from "./Card";
import { Divider } from "antd";

const Setup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  &::nth-child() {
    padding: 10px;
  }
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
    <>
      <Title>
        FIST+ BUILD EDITOR DELUXE
      </Title>
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
    </>
  );
};
