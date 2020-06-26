import React, { useState } from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  root2: {
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

export default function PollListView(props) {

    const { products } = props;

    const classes = useStyles();

    const [value, setValue] = useState();

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [pollSelected, setPollSelected] = useState();

  const SelectPoll = (product) => {
    setPollSelected(product);
  }

    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
      <List className={classes.root}>
        {products.map(product => (
         <div>
        <Link onClick={()=>SelectPoll(product)} style={{textDecoration:'none',cursor:'pointer'}}>   
         <ListItem alignItems="flex-start" title="SEE POLL">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp"  src={product.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={product.description}
          />
         </ListItem>
         </Link>
        <Divider variant="inset" component="li" /> 
        </div>  
         ))}
                   
      </List>
      </Grid>
      <Grid item xs={6} style={{display:pollSelected!=null?"block":"none"}}>
      <Card className={classes.root2}>
      <CardActionArea>
          <CardMedia
            className={classes.media}
            image={pollSelected!=null?pollSelected.imageUrl:""}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pollSelected!=null?pollSelected.description:""}
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

      </Grid>
    );
  }
