import React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router'
import Home from '../pages/home/Home'
import Setup from '../pages/setup/Setup'
import Verify from './Verify'
import { Spin } from 'antd'
import RaidReview from '../pages/raid/Review/RaidReview'
import BuildReview from '../pages/build/Review/BuildReview'
import BuildWrapper from '../pages/build/BuildWrapper'
import RaidWrapper from '../pages/raid/RaidWrapper'
import Overview from '../pages/overview/Overview'
import Profile from '../pages/home/Profile'

interface IProtectedRouteProps extends RouteProps {
  loggedIn: boolean
}
const ProtectedRoute = ({ loggedIn, ...props }: IProtectedRouteProps) => {
  if (loggedIn === undefined) {
    return null
  }
  console.log(loggedIn)
  return loggedIn ? <Route {...props} /> : <Redirect to='/' />
}

export default ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  if (isLoggedIn === undefined) {
    return <Spin />
  }
  return (
    <Switch>
      <Route exact path='/' render={() => <Home loggedIn={isLoggedIn} />} />
      <Route exact path='/verify/:token' component={Verify} />
      <Route exact path='/setup' component={Setup} />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        path='/editBuild/:buildId/:id'
        render={props => <BuildWrapper edit {...props} />}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        path='/editRaid/:raidId/:id'
        render={props => <RaidWrapper edit {...props} />}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path='/buildEditor/:id'
        render={props => <BuildWrapper {...props} />}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path='/raidEditor/:id'
        render={props => <RaidWrapper {...props} />}
      />
      <Route exact path='/builds' render={() => <div>Test</div>} />
      <Route exact path='/raids' render={() => <div>Test</div>} />
      <Route exact path='/overview' component={Overview} />
      <Route exact path='/builds/:id' component={BuildReview} />
      <Route
        loggedIn={isLoggedIn}
        exact
        path='/raids/:id'
        component={RaidReview}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path='/profile'
        component={Profile}
      />
    </Switch>
  )
}
