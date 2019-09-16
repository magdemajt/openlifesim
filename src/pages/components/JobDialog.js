import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateUser } from '../../backend/User';
import Person from '../../backend/Person'
import { Typography, makeStyles, TextField, Divider, Grid } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import JobOffer from '../../backend/JobOffer';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 300,
    height: 350,
    overflowY: 'auto'
  },
  button: {
    marginTop: theme.spacing(1),
  },
  textField: {
    width: '100%'
  }
}));

export default function JobDialog({ user, setUser, job = new JobOffer(), setJob, setColor, setInfo, setPage }) {
  const classes = useStyles();

  function handleClose() {
    setUser(updateUser(user));
    setJob(null);
  }

  function handleApply (job, index = 0) {
    const success = job.applyForJob(user);
    job.jobMates.push(Person.generateJobMate(user));
    job.jobMates.push(Person.generateJobMate(user));
    job.jobMates.push(Person.generateWorkMate(user));
    job.jobMates.push(Person.generateWorkMate(user));
    setUser(updateUser(user));
    if (success) {
      setColor("success");
      setInfo(`You just got a job: ${user.job.name} at ${user.job.companyName}`);
      setPage(0);
    }
  };

  return (
      <Dialog
        open={job !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{job !== null ? job.name + ' ' + job.companyName : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Typography color="textPrimary">
            Salary: 
          </Typography>
          <Typography color="textSecondary">
            <NumberFormat displayType="text" value={job !== null ? job.currentSalary : 0} thousandSeparator={true} />
          </Typography>

          <Divider variant="fullWidth"/>
          <Grid item xs={12}>
            <Grid container justify="center" alignContent="center">
              <Button color="secondary" className={classes.button} onClick={() => handleApply(job)}>
               Apply for Job
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
