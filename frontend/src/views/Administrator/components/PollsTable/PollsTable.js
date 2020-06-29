import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import EditRounded from '@material-ui/icons/EditRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { getInitials } from '../../../../helpers';

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
  }
}));

const PollsTable = props => {
  const { className, polls, ...rest } = props;

  const classes = useStyles();

  const [selectedPolls, setSelectedPolls] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { polls } = props;

    let selectedPolls;

    if (event.target.checked) {
      selectedPolls = polls.map(d => d.id);
    } else {
      selectedPolls = [];
    }

    setSelectedPolls(selectedPolls);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPolls.indexOf(id);
    let newSelectedPolls = [];

    if (selectedIndex === -1) {
      newSelectedPolls = newSelectedPolls.concat(selectedPolls, id);
    } else if (selectedIndex === 0) {
      newSelectedPolls = newSelectedPolls.concat(selectedPolls.slice(1));
    } else if (selectedIndex === selectedPolls.length - 1) {
      newSelectedPolls = newSelectedPolls.concat(selectedPolls.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPolls = newSelectedPolls.concat(
        selectedPolls.slice(0, selectedIndex),
        selectedPolls.slice(selectedIndex + 1)
      );
    }

    setSelectedPolls(newSelectedPolls);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
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
                      checked={selectedPolls.length === polls.length}
                      color="primary"
                      indeterminate={
                        selectedPolls.length > 0 &&
                        selectedPolls.length < polls.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell><strong>Polls</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {polls.slice(0, rowsPerPage).map(poll => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={poll.id}
                    selected={selectedPolls.indexOf(poll.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedPolls.indexOf(poll.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, poll.id)}
                        value="true"
                      />
                    </TableCell>
                
                    <TableCell>{poll.description}</TableCell>
                    <TableCell>
                    <Tooltip title="Editar">
                      <Link to={'/s'+ poll.id} className={classes.icon}>    
                          <EditRounded />
                      </Link>
                    </Tooltip>  
                    <Tooltip title="Eliminar">
                      <Link to={'/d'+ poll.id} className={classes.icon}>    
                          <DeleteRounded />
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
          count={polls.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

PollsTable.propTypes = {
  className: PropTypes.string,
  polls: PropTypes.array.isRequired
};

export default PollsTable;
