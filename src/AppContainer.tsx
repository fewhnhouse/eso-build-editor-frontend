import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Routes from "./components/Routes";
import styled from "styled-components";
import { Layout, Menu, Button, Popover } from "antd";
import WrappedNormalLoginForm from "./components/LoginForm";

const { Header, Content, Footer } = Layout;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #282c34;
  width: 100%;
  height: calc(100vh - 133px);
  color: rgb(155, 155, 155);
`;

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
`;

const theme = {
  primary: "blue"
};

export default () => {
  return (
    <Layout>
      <StyledHeader>
        <div>
          <Logo />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Test</Menu.Item>
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
      <Container>
        <Routes />
      </Container>
      <Footer>asd</Footer>
    </Layout>
  );
};
