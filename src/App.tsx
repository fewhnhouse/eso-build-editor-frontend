import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppContainer from "./AppContainer";

const theme = {
  primary: "blue"
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
