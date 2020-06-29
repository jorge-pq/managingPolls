import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, from } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Routes from './Routes';
import { Session } from './components'; 
import jwtDecode from 'jwt-decode';

const browserHistory = createBrowserHistory();

 const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:8000/graphql',
  headers:{
    authorization: localStorage.getItem('token')
  },
  cache: new InMemoryCache()
});


export default function App() {

  const [session, setSession] = React.useState(
    localStorage.getItem('token')!=null?jwtDecode(localStorage.getItem('token')).user:
    {
      "username":"GUEST",
      "role":"GUEST"
    }
   );

  return (
     <ApolloProvider client={client}>
      <Session.Provider value={{session, setSession}}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
      </Session.Provider>
    </ApolloProvider>
  );
}

