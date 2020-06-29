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

    const { polls } = props;

    const [lista, setLista] = useState(polls);
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [open, setOpen] = useState(true);

    const [pollSelected, setPollSelected] = useState();

    const SelectPoll = (poll) => {
      setPollSelected(poll);
      setOpen(VerifyUser(poll));
    } 

    const toVote = (poll) => {
      props.vote(poll, value);
      let currentPoll = polls.find(d=>d.id==pollSelected.id);
      let currentOption = currentPoll.options.find(d=>d.id==value);
      currentOption.votes.push({"user":{"username":props.user}});
      setValue();
      setOpen(false);
      setPollSelected(currentPoll);
    } 

    function VerifyUser(poll){
      let currentPoll = polls.find(d=>d.id==poll.id);
      var i = 0;
      var flag = false; 
      while(i<currentPoll.options.length &&!flag){
        var item = currentPoll.options[i];
        var j = 0;
        var aux = false; 
        while(j<item.votes.length &&!aux){
          if(item.votes[j].user.username==props.user)
          {
            aux = true;
          }
          j++;
        }
        if(aux){
          flag = true;
        }
        i++;
      }     
      return flag?false:true;
    }

    function getTotal()
    {
      var result = 0
      if(pollSelected!=null){
        result = pollSelected.options.reduce((a,b)=>(a+b.votes.length),0);
      }
      
      return result>0?result:1;
    } 

    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
      <List className={classes.root}>
        {lista.map(poll => (
         <div>
        <Link onClick={()=>SelectPoll(poll)} style={{textDecoration:'none',cursor:'pointer'}}>   
         <ListItem alignItems="flex-start" title="SEE POLL">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp"  src={poll.image} />
          </ListItemAvatar>
          <ListItemText
            primary={poll.description}
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
            image={pollSelected!=null?pollSelected.image:""}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pollSelected!=null?pollSelected.description:""}
            </Typography>

            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            {pollSelected!=null&&open?pollSelected.options.map(option => (
              <FormControlLabel value={option.id} control={<Radio />} label={option.description} />
             )):<p></p>}
            </RadioGroup>
           
            {pollSelected!=null?pollSelected.options.map(option => (
              <div>
                <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'15px'}}>
                  {option.description} {(option.votes.length * 100) / getTotal()}%
                </Typography>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(option.votes.length * 100) / getTotal()}
                />
            </div>
            )):<p>No options</p>}
              
          </CardContent>
        </CardActionArea>
        {pollSelected!=null?
        <CardActions>
           <Button size="small" variant="contained" color="primary"
            onClick={ () => toVote(pollSelected.id)}
            style={{display:open?"block":"none"}}
          >
            Vote
          </Button>
        </CardActions>:<div></div>}
      </Card>
      </Grid>

      </Grid>
    );
  }
