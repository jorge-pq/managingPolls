import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignInMutation = gql`
  mutation SignIn($username: String!,$password: String!) {
    signIn(username: $username, password:$password)
  }
`;

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    username:'',
    password:''
});

 
  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
  
    setFormState({
      ...formState,
        [event.target.name]: event.target.value,
    });
  };

  const [signIn, { loading, error }] = useMutation(SignInMutation, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data){
      localStorage.setItem('token',data.signIn);
      console.log(data.signIn)
      history.push('/');
    }
  });

  const handleSignIn = event => {
     event.preventDefault();
     signIn({ variables: { username: formState.username, password: formState.password }})

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
                 Sign in on our polls web site.
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
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                {loading?<p>Loading... </p>:<p></p>}
                {error?          
                <Alert severity="error">Invalid username o password</Alert>
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
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.password}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
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

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
