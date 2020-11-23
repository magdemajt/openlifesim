import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CarsList from './components/CarsList';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: 'calc(100vh - 160px)',
    marginTop: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

function CarsPage({ user, year, setUser }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <CarsList user={user} setUser={setUser} year={year} />
    </Grid>
  );
}

export default CarsPage;
