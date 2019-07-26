import React, { useState, useReducer } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import { Tabs } from "antd";
import {
  BuildContext,
  buildReducer,
  defaultBuildState
} from "./BuildStateContext";

const { TabPane } = Tabs;

export default () => {
  const [current, setCurrent] = useState(0);
  const [state, dispatch] = useReducer(buildReducer, defaultBuildState);

  const next = () => {
    setCurrent(current => current + 1);
  };

  const prev = () => {
    setCurrent(current => current - 1);
  };

  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <SecondPage />
    </BuildContext.Provider>
  );
};
