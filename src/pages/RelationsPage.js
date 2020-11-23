import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Grid, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import JobList from './components/JobList';
import StudyList from './components/StudyList';
import { retired, unemployed } from '../backend/database';
import { updateUser } from '../backend/User';
import RelationsList from './components/RelationsList';
import RelationsDialog from './components/RelationsDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: 'calc(100vh - 160px)',
    marginTop: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paper: {
    width: theme.spacing(40),
    height: theme.spacing(60),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    width: '50%',
    marginTop: theme.spacing(2),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxHeight: '500px',
    overflowY: 'auto',
  },
}));

function RelationsPage({
  user, setUser, setPage, setColor, setInfo,
}) {
  const classes = useStyles();

  const [modalPerson, setModalPerson] = React.useState(null);
  const [modalOptions, setModalOptions] = React.useState({ });

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid item xs={6} className={classes.container}>
        <RelationsList
          user={user}
          setUser={setUser}
          setPage={setPage}
          setColor={setColor}
          setInfo={setInfo}
          setModalPerson={setModalPerson}
          setModalOptions={setModalOptions}
        />
      </Grid>
      <RelationsDialog
        user={user}
        setColor={setColor}
        setInfo={setInfo}
        setUser={setUser}
        options={modalOptions}
        setPerson={setModalPerson}
        person={modalPerson}
        setOptions={setModalOptions}
      />
    </Grid>
  );
}

export default RelationsPage;
