import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Link,
  RouteComponentProps,
  withRouter,
  Redirect
} from "react-router-dom";
import Routes from "./components/Routes";
import styled from "styled-components";
import { Layout, Menu, Button, Popover, Steps, Icon } from "antd";
import WrappedNormalLoginForm from "./components/LoginForm";
import { leather } from "./assets/backgrounds/";

const { Header, Content, Footer } = Layout;

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-image: url(${leather});
  background-repeat: repeat;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`;

const TabButton = styled(Button)`
  margin: 0px 10px;
`;

const { Step } = Steps;

const AppContainer = ({ location, match }: RouteComponentProps<any>) => {
  return (
    <Layout>
      <StyledHeader>
        <div>
          <Logo />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/build/0">Build Editor</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Popover
          placement="bottomRight"
          title={"Login"}
          content={<WrappedNormalLoginForm />}
          trigger="click"
        >
          <Button
            style={{ float: "right" }}
            type="primary"
            icon="user"
            size="large"
          >
            Login
          </Button>
        </Popover>
      </StyledHeader>
      <Routes />
    </Layout>
  );
};

export default withRouter(AppContainer);
