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
import { map } from 'lodash';

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
  },
  centerize: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function JobDialog({ user, setUser, job = new JobOffer(), setJob, setColor, setInfo, setPage }) {
  const classes = useStyles();

  function handleClose() {
    setUser(updateUser(user));
    setJob(null);
  }

  function generateSkillList (title, skills) {
    return (
    <React.Fragment>
      <Typography color="textPrimary" className={classes.centerize}>
        {title}
      </Typography>
      {map(skills, (skill, skillName) => {
        return (
          <Typography color="textSecondary" key={skillName} className={classes.centerize}>
            {`${skillName.charAt(0).toUpperCase() + skillName.substr(1)}: ${skill}`}
          </Typography>
        )
      })}
    </React.Fragment>
    );
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
  function generateContent () {
    return (
      <React.Fragment>
        <Typography color="textPrimary">
          Salary: 
        </Typography>
        <Typography color="textSecondary">
          <NumberFormat displayType="text" value={job.currentSalary} thousandSeparator={true} />
        </Typography>
        <Divider variant="fullWidth" />
        {generateSkillList('Requirements: ', job.requirement)}
        <Divider variant="fullWidth" />
        {generateSkillList('Skill growth: ', job.skillGrowth)}
        <Divider variant="fullWidth"/>
        <Grid item xs={12}>
          <Grid container justify="center" alignContent="center">
            <Button color="secondary" className={classes.button} onClick={() => handleApply(job)}>
              Apply for Job
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return (
      <Dialog
        open={job !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{job !== null ? job.name + ' ' + job.companyName : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {job !== null ? generateContent() : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
