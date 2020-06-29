import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PollsToorbar, PollsTable } from './components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const GET_POLLS = gql`
  {
    polls {
      id
      description
    }
  }
`;



export default function AllPolls(props) {

  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_POLLS);
  
    return (
      <div className={classes.root}>
      {
        loading?<div>Loading...</div>:
        (
          error?<Typography variant="h1">Not authorized</Typography>:
          <div>
           <PollsToorbar />
            <div className={classes.content}>
              <PollsTable polls={data.polls} />
            </div>
          </div>
        )
      }
      </div>
    );
}
