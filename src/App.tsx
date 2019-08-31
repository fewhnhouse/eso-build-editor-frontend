import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import AppContainer from './components/AppContainer'
import globalStyles from './components/globalStyles'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { notification } from 'antd'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION_URL || "",
  options: {
    reconnect: true,
  },
})

notification.config({
  top: 80,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    //logout
    console.log(`[Network error]: ${networkError}`)
  }
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
})
const cache = new InMemoryCache()

const data = {
  todos: [],
  loggedIn: false,
  visibilityFilter: 'SHOW_ALL',
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: false,
  },
}

cache.writeData({ data })

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink, wsLink]),
  cache,
})

export const LoginContext = React.createContext<any>(undefined)
client.onResetStore(async () => cache.writeData({ data }))
//Avoid cors for now

const theme = globalStyles

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <ApolloProvider client={client}>
        <Router>
          <ThemeProvider theme={theme}>
            <AppContainer />
          </ThemeProvider>
        </Router>
      </ApolloProvider>
    </LoginContext.Provider>
  )
}

export default App
