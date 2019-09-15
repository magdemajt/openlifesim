import React from 'react';
import StartBar from './StartBar';
import { Grid, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  centerize: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400
  },
  centerizeSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  button: {
    width: '50%'
  }
}));

export default function StartPage({ setStarted }) {

  const classes = useStyles();

  return (
    <React.Fragment>
      <StartBar />
      <Grid container alignItems="center" justify="center" >
        <Grid item xs={12} className={classes.centerize}>
          <Button color="secondary" variant="contained" className={classes.button} onClick={() => setStarted(true)}>Start Game</Button>
        </Grid>
        <Grid item xs={12} className={classes.centerizeSmall}>
          <Typography>
            Any suggestions or problems: <b>contact@openlifesim.com</b>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );

}