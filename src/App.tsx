import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppContainer from "./AppContainer";
import axios from "axios";
import {
  buildReducer,
  defaultBuildState,
  BuildContext
} from "./pages/build/BuildStateContext";

//Avoid cors for now
axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/" + process.env.REACT_APP_API_URL;
const CONVERTED_API_TOKEN = btoa(process.env.REACT_APP_API_TOKEN || "");
axios.defaults.headers.common["Authorization"] = `Basic ${CONVERTED_API_TOKEN}`;

const theme = {
  primary: "blue"
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(buildReducer, defaultBuildState);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <BuildContext.Provider value={[state, dispatch]}>
          <AppContainer />
        </BuildContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
