import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { Layout } from "antd";

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


const theme = {
  primary: "blue"
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Header>asd</Header>
        <Container>
          <Router>
            <Routes />
          </Router>
        </Container>
        <Footer>asd</Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
