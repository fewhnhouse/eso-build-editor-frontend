import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

const Container = styled.div``;

const Setup = styled.div``;

const Title = styled.h1`
  font-size: calc(10px + 2vmin);
  color: white;
`;

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
        <div className="raidRole">
          <h2>Stamwarden</h2>
        </div>
        <div className="raidRole">
          <h2>Stamnecro</h2>
        </div>
        <div className="raidRole">
          <h2>Bomb blade</h2>
        </div>
        <div className="raidRole">
          <h2>Dragonknight</h2>
        </div>
        <div className="raidRole">
          <h2>Purgeblade</h2>
        </div>
      </Setup>
      <div className="raidDetails">
        <h2>Role specific details</h2>
        <p>DD role wears pants</p>
      </div>
    </>
  );
};
