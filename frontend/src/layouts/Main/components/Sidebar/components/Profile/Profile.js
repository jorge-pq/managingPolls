import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    display: localStorage.getItem('token')!=null?'flex':'none',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const CURRENT_USER = gql`
  {
    me {
      name
      avatar
      web
    }
  }
`;

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return '';
  if (error) return '';

  console.log(data);
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={data.me.avatar}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {data.me.name}
      </Typography>
      <Typography variant="body2">{data.me.web}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
