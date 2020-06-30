import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { UsersToolbar, UsersTable } from './components';
import {
  Typography
} from '@material-ui/core';
import useRoles from '../../components/Roles/useRoles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const GET_USERS = gql`
  {
    users {
      id
      username
      name
      avatar
      role
      email
    }
  }
`;

const UserList = () => {

  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USERS);
  const roles = useRoles();
  return (
    <div className={classes.root}>
      {
        loading?<div>Loading...</div>:
        (
          error?<Typography variant="h1">Not authorized</Typography>:
          <div>
            <UsersToolbar />
            <div className={classes.content}>
              <UsersTable users={data.users} roles={roles}/>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default UserList;
