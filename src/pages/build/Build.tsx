import React, { useState, useReducer, useEffect } from "react";
import FirstPage from "./RaceAndClass/FirstPage";
import SecondPage from "./Sets/SecondPage";
import {
  BuildContext,
  buildReducer,
  defaultBuildState
} from "./BuildStateContext";
import { RouteComponentProps, Redirect } from "react-router";
import ThirdPage from "./Skills/ThirdPage";

import { Layout, Button, Steps, Icon, message } from "antd";
import styled from "styled-components";

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

  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <Container>
        {id === "0" ? (
          <FirstPage />
        ) : id === "1" ? (
          <SecondPage />
        ) : id === "2" ? (
          <ThirdPage />
        ) : (
          <Redirect to="/build/0" />
        )}
      </Container>

      <Footer
        style={{
          display: "flex",
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
          <Step title="Review" description="Review and save." />
        </Steps>
        <TabButton
          onClick={handleNextClick}
          disabled={tab === 2}
          size="large"
          type="primary"
        >
          <Icon type="right" />
          Next
        </TabButton>
        <Redirect to={`/build/${tab}`} push />
      </Footer>
    </BuildContext.Provider>
  );
};
