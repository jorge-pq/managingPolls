import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { onError } from 'apollo-link-error';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: 'gray',
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: 'gray'
  },
  bio: {
    color: 'gray'
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUpMutation = gql`
  mutation SignUp($username: String!,$name: String!,$password: String!) {
    signUp(username: $username, name: $name, password:$password) {
      username
      name
    }
  }
`;

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
      username:'',
      fullname:'',
    	password:''
  });

  const handleChange = event => {
  
    setFormState({
      ...formState,
        [event.target.name]: event.target.value,
    });
  };

  const handleBack = () => {
    history.goBack();
  };

  const [signUp, { loading, error }] = useMutation(SignUpMutation, {
    onError(err) {
      console.log(err);
    },
    onCompleted(){
      history.push('/sign-in');
    }
  });
 

  const handleSignUp = event => {
    event.preventDefault();
      signUp({ variables: { username: formState.username, name: formState.fullname, password: formState.password }})
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Sign up on our polls web site.
              </Typography>
              
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Jorge Pozo
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Developer
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form} onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new account
                </Typography>
                {loading?<p>Loading... </p>:<p></p>}
                {error?          
<                 Alert severity="error">{error.message.split(':')[1]}</Alert>
               :<p></p>}
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.firstName}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Full name"
                  name="fullname"
                  onChange={handleChange}
                  type="text"
                  value={formState.fullname}
                  variant="outlined"
                />
               
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.password}
                  variant="outlined"
                />
               
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth              
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
