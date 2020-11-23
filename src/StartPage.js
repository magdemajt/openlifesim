import React from 'react';
import {
  Grid, Button, makeStyles, Typography,
} from '@material-ui/core';
import StartBar from './StartBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  mainGridCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  button: {
    width: '50%',
  },
}));

export default function StartPage({ setStarted }) {
  const classes = useStyles();

  return (
    <>
      <StartBar />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} className={classes.mainGrid}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={() => setStarted(true)}
          >
            Start Game
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.mainGridCell}>
          <Typography>
            Game is randomly generated.
            Any resemblance to real events or names is a coincidence.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.mainGridCell}>
          <Typography>
            Any suggestions or problems:
            {' '}
            <b>magdemajt.trash@gmail.com</b>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
