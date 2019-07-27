import React from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/home/Home";
import Build from "../pages/build/Build";
import Setup from "../pages/setup/Setup";
import Details from "../pages/details/Details";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/setup" component={Setup} />
      <Route exact path="/build/:id" component={Build} />
      <Route exact path="/details/:name" component={Details} />
    </Switch>
  );
};
