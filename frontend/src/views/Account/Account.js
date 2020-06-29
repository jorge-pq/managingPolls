import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const PROFILE = gql`
  {
    me{
    username
    city
    avatar
    country
    phone
    name
    email
    web
    phone
  }
  }
`;


const Account = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PROFILE);
  return (
    <div className={classes.root}>
       {
        loading?<div>Loading...</div>:
        (
          error?<Typography variant="h1">Not authorized</Typography>:
          <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <AccountProfile user={data.me} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountDetails user={data.me}/>
          </Grid>
        </Grid>
        )
      }
      
    </div>
  );
};

export default Account;
