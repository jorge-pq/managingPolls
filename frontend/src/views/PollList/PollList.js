import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { PollToolbar, PollCard, PollListView } from './components';
import { Session } from '../../components'; 

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
    polls{
    id
    image
    description
    options{
      id
      description
      votes{
        user{
          username
        }
        updatedAt
      }
    }
  }
  }
`;

const ToVoteMutation = gql`
  mutation ToVote($poll: ID!,$option: ID!,$user: String!) {
    toVote(poll: $poll, option: $option, user:$user) {
      createdAt
    }
  }
`;

const PollList = () => {
  const classes = useStyles();
  const {session} = useContext(Session); 
  const { loading, error, data, refetch } = useQuery(GET_POLLS);

  const [toVote] = useMutation(ToVoteMutation, {
    update(data){
      if(!data) return;
      refetch();
    }
  });

  const handleVote = (poll, option) => {
     toVote({ variables: { poll: poll, option: option, user: session.username }})
  };

  const [viewSelected, setViewSelected] = useState(0);

  const handleView = (view) => {
    setViewSelected(view);
  }

  return (
    <div className={classes.root}>

      {
        loading?<div>Loading...</div>:
        (
          error?<Typography variant="h1">Server error!</Typography>:
          <div>
             <PollToolbar change={handleView}/>
            <div className={classes.content}>
              <Grid container spacing={3} style={{display:viewSelected==0?"flex":"none"}}>
                <PollListView polls={data.polls} vote={handleVote} user={session.username}/>
              </Grid>
              <Grid container spacing={3} style={{display:viewSelected==1?"flex":"none"}}>
                <PollCard polls={data.polls} vote={handleVote} user={session.username}/>
              </Grid>    
            </div>
          </div>
        )
      }
    </div>
  );
};

export default PollList;
