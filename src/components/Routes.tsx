import React from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/home/Home";
import Build from "../pages/build/Build";
import Setup from "../pages/setup/Setup";
import Details from "../pages/details/Details";
import Raid from "../pages/raid/Raid";
import RaidOverview from "../pages/raidoverview/RaidOverview";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/setup" component={Setup} />
      <Route exact path="/build/:id" component={Build} />
      <Route exact path="/raid/:id" component={Raid} />
      <Route exact path="/raidoverview/" component={RaidOverview} />
      <Route exact path="/details/:name" component={Details} />
    </Switch>
  );
};
