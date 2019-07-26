import React from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/home/Home";
import Build from "../pages/build/Build";
import Setup from "../pages/setup/Setup";
import Details from "../pages/home/Details";
import FirstPage from "../pages/build/RaceAndClass/FirstPage";
import SecondPage from "../pages/build/Sets/SecondPage";
import ThirdPage from "../pages/build/Skills/ThirdPage";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/setup" component={Setup} />
      <Route exact path="/build/0" component={FirstPage} />
      <Route exact path="/build/1" component={SecondPage} />
      <Route exact path="/build/2" component={ThirdPage} />

      <Route exact path="/details/:name" component={Details} />
    </Switch>
  );
};
