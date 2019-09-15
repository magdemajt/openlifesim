import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import JobList from './components/JobList';
import StudyList from './components/StudyList';
import LifeStatsTabs from './components/LifeStatsTabs';

const useStyles = makeStyles(theme => ({
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
    justifyContent: 'flex-start'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  toTop: {
    alignSelf: 'flex-start'
  }
}));

function LifeStatsPage ({ user, year, setUser, setPage }) {
  const classes = useStyles();  

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid item xs={12} className={classes.toTop}>
        <LifeStatsTabs user={user} setUser={setUser} />
      </Grid>
    </Grid>
  );
}

export default LifeStatsPage;
