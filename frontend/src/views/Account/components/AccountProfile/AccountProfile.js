import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  hide:{
    display:'none' 
  }
}));

const AccountProfile = props => {
  const { className, user, ...rest } = props;

  const [userCurrent, setUserCurrent] = useState(user);

  const classes = useStyles();
  const inputFileRef = useRef(null);

  const OpenDialog = event => {
    inputFileRef.current.click();
  };

  const [image, setImage] = useState(userCurrent.avatar);
  const handleImage = event => {
    let img = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = e => {
        setImage(e.target.result);
      }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {userCurrent.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {userCurrent.city}{userCurrent.country!=null?",":""} {userCurrent.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={image}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={OpenDialog}
        >
          Upload picture
        </Button>
        <Button variant="text" onClick={()=>setImage()}>Remove picture</Button>
        <input type="file" className={classes.hide} ref={inputFileRef} onChange={handleImage}/>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
