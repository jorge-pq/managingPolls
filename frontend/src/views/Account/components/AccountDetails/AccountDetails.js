import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserEditMutation = gql`
  mutation UserEdit($username: String!,$name: String!,$city: String,$country: String,$phone: String,$web: String,$email: String) {
    userEdit(username: $username, name: $name, city:$city, country:$country, phone:$phone, web:$web, email:$email) {
      name
      city
      country
      phone
      web
      email
    }
  }
`;


const AccountDetails = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    name: user.name,
    web:  user.web,
    email: user.email,
    phone: user.phone,
    state: user.city,
    country: user.country
});

const handleChange = event => {

  setFormState({
    ...formState,
      [event.target.name]: event.target.value,
  });
};

const [userEdit, { loading, error }] = useMutation(UserEditMutation, {
  onError(err) {
    console.log(err);
  },
  onCompleted(data){
    console.log(data);
  }
});


const handleSignUp = event => {

  event.preventDefault();
  if(formState.name!="" && formState.name!=null)
  {
    userEdit({ variables: { username: user.username, name: formState.name, city:formState.state, country:formState.country, phone:formState.phone, web:formState.web, email:formState.email}})
  }
  
};

  const countries = [
    {
      value: 'Cuba'
    },
    {
      value: 'Mexico'
    },
    {
      value: 'USA'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        {loading?<p>Loading... </p>:<p></p>}
        {error?<p>Error...</p>:<p></p>}
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={formState.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Web"
                margin="dense"
                name="web"
                onChange={handleChange}
                
                value={formState.web}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                
                value={formState.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="text"
                value={formState.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                
                select
                SelectProps={{ native: true }}
                value={formState.country}
                variant="outlined"
              >
                {countries.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="state"
                onChange={handleChange}
              
                value={formState.state}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSignUp}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
