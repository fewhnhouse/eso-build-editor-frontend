import React, { Suspense, lazy } from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router'
import Home from '../pages/home/Home'
import Setup from '../pages/setup/Setup'
import Verify from './Verify'
import { Spin, Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SingleBuffFood from '../pages/singleItems/SingleBuffFood'
import SingleMundus from '../pages/singleItems/SingleMundus'
import SingleSet from '../pages/singleItems/SingleSet'
import SingleSkillLine from '../pages/singleItems/SingleSkillLine'
import Tos from '../pages/home/Tos'
import GroupReview from '../pages/group/review/GroupReview'

const RaidReview = lazy(() => import('../pages/raid/Review/RaidReview'))
const BuildReview = lazy(() => import('../pages/build/Review/BuildReview'))
const BuildHome = lazy(() => import('../pages/build/Home/BuildHome'))
const BuildWrapper = lazy(() => import('../pages/build/BuildWrapper'))
const RaidWrapper = lazy(() => import('../pages/raid/RaidWrapper'))
const GroupWrapper = lazy(() => import('../pages/group/GroupWrapper'))
const Overview = lazy(() => import('../pages/overview/Overview'))
const Profile = lazy(() => import('../pages/profile/Profile'))

interface IProtectedRouteProps extends RouteProps {
  loggedIn: boolean
}
const ProtectedRoute = ({ loggedIn, ...props }: IProtectedRouteProps) => {
  if (loggedIn === undefined) {
    return null
  }
  return loggedIn ? <Route {...props} /> : <Redirect to='/' />
}

const PageNotFoundContainer = styled.div`
  background: #ededed;
  width: 100vw;
  height: 100%;
`

const PageNotFound = () => (
  <PageNotFoundContainer>
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Link to='/'>
          <Button type='primary'>Back Home</Button>
        </Link>
      }
    />
  </PageNotFoundContainer>
)

export default ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  if (isLoggedIn === undefined) {
    return <Spin />
  }
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route exact path='/' render={() => <Home loggedIn={isLoggedIn} />} />
        <Route exact path='/verify/:token' component={Verify} />
        <Route exact path='/setup' component={Setup} />
        <ProtectedRoute
          loggedIn={isLoggedIn}
          path='/editBuild/:id/:pageIndex'
          render={props => <BuildWrapper edit {...props} />}
        />
        <ProtectedRoute
          loggedIn={isLoggedIn}
          path='/editRaid/:id/:pageIndex'
          render={props => <RaidWrapper edit {...props} />}
        />
        <ProtectedRoute
          loggedIn={isLoggedIn}
          path='/editGroup/:id/:pageIndex'
          render={props => <GroupWrapper edit {...props} />}
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
        <ProtectedRoute
          loggedIn={isLoggedIn}
          exact
          path='/groupEditor/:id'
          render={props => <GroupWrapper {...props} />}
        />
        <Route exact path='/builds' component={BuildHome} />
        <Route exact path='/raids' render={() => <div>Test raids</div>} />
        <Route exact path='/groups' render={() => <div>Test groups</div>} />
        <Route exact path='/groups/:id' component={GroupReview} />

        <Route exact path='/overview/:tab' component={Overview} />
        <Route exact path='/builds/:id' component={BuildReview} />
        <Route exact path='/overview/mundus/:id' component={SingleMundus} />
        <Route
          exact
          path='/overview/skillLines/:id'
          component={SingleSkillLine}
        />
        <Route exact path='/overview/buffs/:id' component={SingleBuffFood} />
        <Route exact path='/overview/sets/:id' component={SingleSet} />
        <Route exact path='/tos' component={Tos} />
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
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  )
}
