import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { PollToolbar, PollCard, PollListView } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PollList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  const [viewSelected, setViewSelected] = useState(0);

  const handleView = (view) => {
    setViewSelected(view);
  }

  return (
    <div className={classes.root}>
      <PollToolbar change={handleView}/>
      <div className={classes.content}>
        <Grid container spacing={3} style={{display:viewSelected==0?"flex":"none"}}>
           <PollListView products={products} />
        </Grid>
        <Grid container spacing={3} style={{display:viewSelected==1?"flex":"none"}}>
          <PollCard products={products}/>
        </Grid>    
      </div>
    </div>
  );
};

export default PollList;
