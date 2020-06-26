import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PollsToorbar, PollsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export default function AllPolls(props) {

  const classes = useStyles();
  const [users] = useState(mockData);
  
    return (
        <div className={classes.root}>
          <PollsToorbar />
        <div className={classes.content}>
          <PollsTable users={users} />
        </div>
      </div>
    );
}
