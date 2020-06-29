import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Grid } from '@material-ui/core';
import CardItem from './CardItem';

const PollCard = props => {
  const { className, polls, ...rest } = props;

  const [lista, setLista] = useState(polls);

  const toVote = (poll, value) => {
    props.vote(poll, value);
  } 

  return (
    <Grid container>
        {polls.map(poll => (

          <Grid item key={poll.id} lg={4} md={6} xs={12}> 
            <CardItem poll={poll} user={props.user} vote={toVote}/>
          </Grid>
        
    ))}
    </Grid>
    
  );
};

PollCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default PollCard;
