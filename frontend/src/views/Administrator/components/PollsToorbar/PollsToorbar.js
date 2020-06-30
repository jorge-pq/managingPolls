import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { SearchInput } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PollNewMutation = gql`
  mutation PollCreate($description: String, $image: String!, $options: [String!]!) {
    pollCreate(description: $description, image: $image, options:$options) {
      description
    }
  }
`;

const PollsToorbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [description, setDescription] = useState();
  const handleDescription = event => { setDescription(event.target.value) };

  const [image, setImage] = useState();
  const handleImage = event => {
    let img = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = e => {
        setImage(e.target.result);
      }
  };

  const [option, setOption] = useState();
  const handleOption = event => { setOption(event.target.value) };

  const [optionList, setOptionList] = useState([]);

  const addOpinion = () => {
    if(option!=null && option!="")
    {
      setOptionList(optionList => [...optionList,option]);
      setOption(''); 
    }  
    };
 
  const handleDelete = (option) => {
    setOptionList(optionList.filter(d=>d!=option)) 
    };

    const [pollCreate, { loading, error }] = useMutation(PollNewMutation, {
      onError(err) {
        console.log(err);
      },
      onCompleted(){
        window.location = '/administrator';
      }
    });
  
    const AddPoll = event => {
      event.preventDefault();
      pollCreate({ variables: { description: description, image: image, options: optionList }})
    };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          Add poll
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search poll"
        />
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form className={classes.form} onSubmit={AddPoll} >
        <DialogTitle id="form-dialog-title"> New Poll</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {loading?<p>Loading... </p>:<p></p>}
            {error?<p>Error</p>:<p></p>}
          </DialogContentText>
          
          <Grid container spacing={3}> 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                value={description}
                onChange={handleDescription}
                fullWidth
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
             <label>Imagen:</label>
                    <TextField
                      fullWidth
                      type="file"
                      required
                      onChange={handleImage}
                    />                 
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                margin="normal"
                value={option}
                onChange={handleOption}
                fullWidth
                label={"Add Option "+ (optionList.length + 1)}
              />
            </Grid>
            <Grid item xs={4}> 
             <Button variant="contained" color="primary" onClick={addOpinion} fullWidth style={{marginTop:'20px'}}>
              Add Option
            </Button>
            </Grid>  
            <Grid item xs={12}> 
            {
              optionList.map( item => 
                <Chip size="small" label={item} onDelete={()=>handleDelete(item)} color="primary" />
              )
            }          
            </Grid>
          </Grid>  
          
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" disabled={loading?true:false} type="submit">
            Create Poll
          </Button>
        </DialogActions>
        </form>
      </Dialog>


    </div>
  );
};

PollsToorbar.propTypes = {
  className: PropTypes.string
};

export default PollsToorbar;
