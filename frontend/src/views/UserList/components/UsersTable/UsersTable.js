import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import EditRounded from '@material-ui/icons/EditRounded';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  Tooltip,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getInitials } from '../../../../helpers';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  icon:{
    color: '#1259b5'
  },
   container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ChangeRoleMutation = gql`
  mutation ChangeRol($username: String!,$role: String!) {
    changeRol(username: $username, role: $role) {
      username
    }
  }
`;


const UsersTable = props => {
  const { className, users, roles, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [userSelected, setUserSelected] = useState();

  const [roleSelected, setRoleSelected] = useState(0);
  const handleRoleSelected = event => {
    setRoleSelected(event.target.value);
  };

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleClickOpen = (username) => {
    setOpen(true);
    setUserSelected(username);
    console.log(username);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [changeRol, { loading, error }] = useMutation(ChangeRoleMutation, {
    onError(err) {
      console.log(err);
    },
    onCompleted(){
      window.location = "/users";
    }
  });
 
  const handleChangeRole = () => {
     changeRol({ variables: { username: userSelected, role: roleSelected }})
  };

  return (
   <div>
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Change role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography variant="body1">{user.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                    <Tooltip title="Change role">
                      <Link onClick={()=>handleClickOpen(user.username)} className={classes.icon}>    
                          <EditRounded />
                      </Link>
                    </Tooltip>  
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>


    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select role</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Role</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={roleSelected}
                onChange={handleRoleSelected}
                input={<Input />}
              >
                {
                  roles.map(role=>
                    <MenuItem value={role.name}>{role.name}</MenuItem>
                    )
                }           
              
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeRole} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
