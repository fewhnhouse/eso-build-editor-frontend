import React, { useState } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current => current + 1);
  };

  const prev = () => {
    setCurrent(current => current - 1);
  };

  return <SecondPage />;
};
