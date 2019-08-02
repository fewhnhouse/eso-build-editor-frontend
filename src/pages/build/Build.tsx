import React, { useState, useReducer, useEffect } from "react";
import {
  BuildContext,
  buildReducer,
  defaultBuildState
} from "./BuildStateContext";
import { RouteComponentProps, Redirect } from "react-router";
import { Layout, Button, Steps, Icon, message, Tooltip } from "antd";
import styled from "styled-components";
import Consumables from "./consumables/Consumables";
import Sets from "./Sets/Sets";
import Skills from "./Skills/Skills";
import RaceClass from "./RaceAndClass/RaceClass";

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
const TabButton = styled(Button)`
  margin: 0px 10px;
`;
const { Step } = Steps;
export default ({ match, location }: RouteComponentProps<{ id: string }>) => {
  const savedBuildState = localStorage.getItem("buildState");

  useEffect(() => {
    const savedBuildState = localStorage.getItem("buildState");
    if (savedBuildState) {
      message.info("Your settings have been restored.");
    }
  }, []);
  const [state, dispatch] = useReducer(
    buildReducer,
    savedBuildState ? JSON.parse(savedBuildState) : defaultBuildState
  );
  const { id } = match.params;
  const [tab, setTab] = useState(parseInt(id, 10) || 0);

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1);
  };

  const handleNextClick = () => {
    setTab(tabIndex => tabIndex + 1);
  };

  const isDisabled =
      tab === 3 ||
      (tab === 0 &&
        (state.race === "" ||
          state.class ===
            "")) /* ||
    (tab === 1 &&
      (state.abilityBarOne.find(skill => skill.id === 0) !== undefined ||
        state.abilityBarTwo.find(skill => skill.id === 0) !== undefined ||
        state.ultimateOne.id === 0 ||
        state.ultimateTwo.id === 0))*/;

  const setTooltipTitle = () => {
    if (!isDisabled) {
      return "";
    }
    switch (tab) {
      case 0:
        return "Select a Race and a Class to progress.";
      case 1:
        return "Fill your bars with Skills to progress.";
      case 2:
        return "Slot sets to progress.";
    }
  };
  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <Container>
        {id === "0" ? (
          <RaceClass />
        ) : id === "1" ? (
          <Skills />
        ) : id === "2" ? (
          <Sets />
        ) : id === "3" ? (
          <Consumables />
        ) : (
          <Redirect to="/build/0" />
        )}
      </Container>

      <Footer
        style={{
          display: "flex",
          zIndex: 100,
          alignItems: "center",
          boxShadow: "0 -2px 6px 0 rgba(0, 0, 0, 0.1)"
        }}
      >
        <TabButton
          onClick={handlePrevClick}
          disabled={tab === 0}
          size="large"
          type="primary"
        >
          <Icon type="left" />
          Prev
        </TabButton>
        <Steps progressDot current={tab}>
          <Step title="Race & Class" description="Select race and class." />
          <Step title="Skills" description="Select skills." />
          <Step title="Sets" description="Select sets." />
          <Step
            title="Consumables"
            description="Select mundus, potions, food."
          />
          <Step title="Review" description="Review and save." />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <TabButton
            onClick={handleNextClick}
            disabled={isDisabled}
            size="large"
            type="primary"
          >
            <Icon type="right" />
            Next
          </TabButton>
        </Tooltip>
        <Redirect to={`/build/${tab}`} push />
      </Footer>
    </BuildContext.Provider>
  );
};
