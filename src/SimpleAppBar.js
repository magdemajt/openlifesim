import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  floatRight: {
    marginRight: theme.spacing(1),
    marginLeft: 'auto'
  },
  marginAuto: {
    marginLeft: theme.spacing(10)
  }
}));

export default function SimpleAppBar({ user, year }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {user.name} {user.surename} 
            <div> Age: {user.age} </div>
          </Typography>
          <Typography className={classes.marginAuto} variant="h6" color="inherit">
            Year: {year}
          </Typography>
          <Typography className={classes.floatRight} variant="h6" color="secondary">
            Time Points: {user.timeLeft()}
          </Typography>
          <Typography className={classes.floatRight} variant="h6" color="secondary">
            Balance: <NumberFormat value={user.money} thousandSeparator={true} displayType="text" />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}