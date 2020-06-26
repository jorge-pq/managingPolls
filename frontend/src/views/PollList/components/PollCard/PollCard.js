import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
const BorderLinearProgress = withStyles({
  root3: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: 'rgb(63, 81, 181)',
  },
})(LinearProgress);

const PollCard = props => {
  const { className, products, ...rest } = props;

  const classes = useStyles();

  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <Grid container>
        {products.map(product => (

          <Grid item key={product.id} lg={4} md={6} xs={12}> 
          <Card className={classes.root}>
           <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.description}
            </Typography>

            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
           
            <Typography gutterBottom variant="h5" component="h2">
              option one 50%
            </Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={50}
            />
              <Typography gutterBottom variant="h5" component="h2">
              option two 50%
            </Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={50}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            Vote
          </Button>
        </CardActions>
       </Card>
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
