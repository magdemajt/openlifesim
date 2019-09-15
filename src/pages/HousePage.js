import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HouseList from './components/HouseList';
import { houses } from '../backend/database';

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
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      height: 300
    },
    [theme.breakpoints.up('md')]: {
      height: 350
    },
    [theme.breakpoints.up('lg')]: {
      height: 500,
    },
    [theme.breakpoints.down('sm')]: {
      height: 250,
      marginTop: theme.spacing(2)
    },
    overflowY: 'auto'
  }
}));

function HousePage ({ user, year, setUser }) {
  const classes = useStyles();  

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      {/* <Grid className={classes.container}> */}
        <HouseList user={user} houses={houses} setUser={setUser} />
      {/* </Grid> */}
    </Grid>
  );
}

export default HousePage;
