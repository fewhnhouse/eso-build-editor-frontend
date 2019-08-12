import React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router'
import Home from '../pages/home/Home'
import Build from '../pages/build/Build'
import Setup from '../pages/setup/Setup'
import Raid from '../pages/raid/Raid'
import Verify from './Verify'
import { Spin } from 'antd'
import RaidReview from '../pages/raidReview/RaidReview'
import BuildReview from '../pages/buildReview/BuildReview'

interface IProtectedRouteProps extends RouteProps {
  loggedIn: boolean
}
const ProtectedRoute = ({ loggedIn, ...props }: IProtectedRouteProps) => {
  if (loggedIn === undefined) {
    return null
  }
  return loggedIn ? <Route {...props} /> : <Redirect to='/' />
}

export default ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  console.log(isLoggedIn)
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
        exact
        path='/build/:id'
        component={Build}
      />
      <ProtectedRoute
        loggedIn={isLoggedIn}
        exact
        path='/raid/:id'
        component={Raid}
      />
      <Route exact path='/buildreview/:id' component={BuildReview} />
      <Route exact path='/raidreview/:id' component={RaidReview} />
    </Switch>
  )
}
