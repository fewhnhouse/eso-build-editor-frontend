import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router';
import Home from '../pages/home/Home';
import Build from '../pages/build/Build';
import Setup from '../pages/setup/Setup';
import Details from '../pages/details/Details';
import Raid from '../pages/raid/Raid';

interface IProtectedRouteProps extends RouteProps {
  loggedIn: boolean;
}
const ProtectedRoute = ({ loggedIn, ...props }: IProtectedRouteProps) => {
  return loggedIn ? <Route {...props} /> : <Redirect to="/" />;
};

export default ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home loggedIn={isLoggedIn}/>} />
      <Route exact path="/setup" component={Setup} />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path="/build/:id"
        component={Build}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path="/raid/:id"
        component={Raid}
      />
      <Route exact path="/details/:name" component={Details} />
    </Switch>
  );
};
