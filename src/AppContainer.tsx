import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Routes from "./components/Routes";
import styled from "styled-components";
import { Layout, Menu, Button, Popover, Steps } from "antd";
import WrappedNormalLoginForm from "./components/LoginForm";
import { leather } from "./assets/backgrounds/";

const { Header, Content, Footer } = Layout;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 164px);
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
  background-image: url(${leather});
  background-repeat: repeat;
`;

const theme = {
  primary: "blue"
};
const { Step } = Steps;

export default () => {
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
      <Footer>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </Footer>
    </Layout>
  );
};
