import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

const Setup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  font-size: calc(10px + 2vmin);
  color: white;
`;

const roles = [
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
  },
  {
    role: "Stamina DD",
    description: "",
    class: "Warden",
    race: "Imperial"
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
        <h1>FIST BUILD EDITOR</h1>
      </Title>
      <ul>
        <li onClick={handleRoleClick("Warden")}>Stamwarden</li>
        <li>
          <Link to="/details/purge">Purgeblade</Link>
        </li>
      </ul>
      <Setup>
        {roles.map(role => (
          <Card
            cover={
              <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
          >
            <Meta title={role.role} description={role.class} />
          </Card>
        ))}
      </Setup>
    </>
  );
};
