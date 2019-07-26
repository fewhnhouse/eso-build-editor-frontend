import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import Build from "./Build";
import Setup from "./Setup";
import Details from "./Details";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/setup" component={Setup} />
      <Route exact path="/build" component={Build} />
      <Route exact path="/details/:name" component={Details} />
    </Switch>
  );
};
