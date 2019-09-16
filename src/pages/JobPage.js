import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import JobList from './components/JobList';
import StudyList from './components/StudyList';
import { retired, unemployed } from '../backend/database';
import { updateUser } from '../backend/User';
import JobDialog from './components/JobDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    height: 'calc(100vh - 160px)',
    marginTop: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden'
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
    width: '50%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(10)
    },
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


function JobPage ({ user, year, setUser, setPage, setColor, setInfo }) {
  const [job, setJob] = useState(null);
  
  const classes = useStyles();  

  const retire = () => {
    retired.applyForJob(user);
    setUser(updateUser(user));
  }
  const leaveJob = () => {
    unemployed.applyForJob(user);
    setUser(updateUser(user));
  }

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid item xs={12} sm={4} md={5} className={classes.container}>
        <JobList user={user} setUser={setUser} setPage={setPage} setColor={setColor} setInfo={setInfo} setJob={setJob} />
      </Grid>
      <Grid item xs={12} sm={4} md={5} className={classes.container}>
        <StudyList user={user} setUser={setUser} setPage={setPage} setColor={setColor} setInfo={setInfo} setJob={setJob} />
      </Grid>
      {user.age > 60 ? (<Button variant="contained" color="secondary" className={classes.button} disabled={user.job.name === "Unemployed" || user.job.name === "Retired"} onClick={retire}>Retire</Button>) : <Button variant="contained" color="secondary" disabled={user.job.name === "Unemployed"} className={classes.button} onClick={leaveJob}>Leave job</Button>}
      <JobDialog job={job} setJob={setJob} user={user} setUser={setUser} setColor={setColor} setInfo={setInfo} setPage={setPage} />
    </Grid>
  );
}

export default JobPage;
