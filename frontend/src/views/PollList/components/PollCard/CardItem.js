import React , { useState } from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
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
import {Typography, Link } from '@material-ui/core';

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

function CardItem(props) {

    const { poll } = props;
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [pollSelect, setPollSelect] = useState(poll);

    const [open, setOpen] = useState(VerifyUser());

    const toVote = () => {
      props.vote(pollSelect, value);
      let currentPoll = pollSelect;
      let currentOption = currentPoll.options.find(d=>d.id==value);
      currentOption.votes.push({"user":{"username":props.user}});
      setValue();
      setOpen(false);
      setPollSelect(currentPoll);
    } 

    function VerifyUser(){
      var i = 0;
      var flag = false; 
      while(i<pollSelect.options.length &&!flag){
        var item = pollSelect.options[i];
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
      var result = 0;
      result = pollSelect.options.reduce((a,b)=>(a+b.votes.length),0);     
      return result>0?result:1;
    } 

    return (
        <Card className={classes.root}>
           <CardActionArea>
          <CardMedia
            className={classes.media}
            image={pollSelect.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pollSelect.description}
            </Typography>

            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            {open?pollSelect.options.map(option => (
              <FormControlLabel value={option.id} control={<Radio />} label={option.description} />
             )):<p></p>}
            </RadioGroup>
           
            {pollSelect.options.map(option => (
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
            ))}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" color="primary"
          onClick={toVote}
          style={{display:open?"block":"none"}}
          >
            Vote
          </Button>
        </CardActions>
       </Card>
    );
}

export default CardItem;



      