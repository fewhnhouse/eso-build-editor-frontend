import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import AppContainer from './AppContainer'
import globalStyles from './components/globalStyles'
import axios from 'axios'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

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
  headers: {
    headers: {
      authorization: localStorage.getItem('auth-token') || '',
    },
  },
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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
})

client.onResetStore(async () => cache.writeData({ data }))
//Avoid cors for now
axios.defaults.baseURL =
  'https://cors-anywhere.herokuapp.com/' + process.env.REACT_APP_API_URL
const CONVERTED_API_TOKEN = btoa(process.env.REACT_APP_API_TOKEN || '')
axios.defaults.headers.common['Authorization'] = `Basic ${CONVERTED_API_TOKEN}`

const theme = globalStyles

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <AppContainer />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
