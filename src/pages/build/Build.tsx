import React, { useState, useReducer } from "react";
import styled from "styled-components";
import FirstPage from "./RaceAndClass/FirstPage";
import SecondPage from "./Sets/SecondPage";
import { Tabs } from "antd";
import {
  BuildContext,
  buildReducer,
  defaultBuildState
} from "./BuildStateContext";

const { TabPane } = Tabs;

export default () => {
  const [state, dispatch] = useReducer(buildReducer, defaultBuildState);
  console.log(state, dispatch)
  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <SecondPage />
    </BuildContext.Provider>
  );
};
