import React from 'react';
import { BrowserRouter as Router, Switch, Redirect  } from 'react-router-dom'

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  PollList as PollListView,
  UserList as UserListView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  AllPolls as AdministratorView
} from './views';

const Routes = () => {
  return (
    <Router>
    <Switch>

     <RouteWithLayout
        component={PollListView}
        exact
        layout={MainLayout}
        path="/"
      />
    
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={PollListView}
        exact
        layout={MainLayout}
        path="/polls"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={AdministratorView}
        exact
        layout={MainLayout}
        path="/administrator"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

    </Switch>
    </Router>
  );
};

export default Routes;
