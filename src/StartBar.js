import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  floatCenter: {
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  marginAuto: {
    marginLeft: theme.spacing(10)
  },
  bigAvatar: {
    width: 80,
    height: 80,
    margin: theme.spacing(1),
    marginRight: 0,
  },
  bigAvatarInvisible: {
    width: 80,
    height: 80,
    margin: theme.spacing(1),
    marginRight: 0,
    backgroundColor: 'transparent'
  }
}));

export default function StartBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.flex}>
          <Avatar className={classes.bigAvatar} src="/logo.png" />
          <Typography className={classes.floatCenter} variant="h6" color="inherit">
            Open Life Sim v.0.1
          </Typography>
          <Avatar className={classes.bigAvatarInvisible} />
        </Toolbar>
      </AppBar>
    </div>
  );
}