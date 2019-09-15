import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { jobs, generateJobs, getEducation } from '../../backend/database';
import { updateUser } from '../../backend/User';
import { ListSubheader } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Person from '../../backend/Person';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function StudyList({ user, setUser, setPage, setInfo, setColor }) {
  const classes = useStyles();
  const [applied, setApplied] = React.useState(null);
  const [list, setList] = React.useState(getEducation());

  const handleApply = (job, index) => {
    const success = job.applyForJob(user);
    job.jobMates.push(Person.generateJobMate(user));
    job.jobMates.push(Person.generateJobMate(user));
    job.jobMates.push(Person.generateJobMate(user));
    job.jobMates.push(Person.generateJobMate(user));
    setApplied(index);
    setUser(updateUser(user));
    if (success) {
      setColor("success");
      setInfo(`You just started studying as: ${user.job.name} at ${user.job.companyName}`);
      setPage(0);
    }
  }

  return (
    <List className={classes.root} subheader={<ListSubheader component="div" id="nested-list-subheader">Education</ListSubheader>}>
      {list.map((job, index) => {
        const labelId = `checkbox-list-label-${job.name + job.companyName}`;
        const labelId2 = `checkbox-list-label-${job.name + job.companyName}2`;

        const jobSalaryInfo = (
          <React.Fragment>
            <NumberFormat value={job.currentSalary >= 0 ? job.currentSalary : -job.currentSalary} thousandSeparator={true} displayType="text" prefix={job.currentSalary >= 0 ? " Salary: " : " Fee: "}/>
          </React.Fragment>
          );

        return (
          <ListItem key={job.name + job.companyName} role={undefined} dense button onClick={() => handleApply(job, index)}>
            <ListItemText id={labelId} primary={`${job.name} at ${job.companyName}`} secondary={jobSalaryInfo}  />
            <ListItemText id={labelId2} primary={`Add.: ${job.skillGrowth}`} secondary={`Req.: ${job.requirement}`}  />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="apply" onClick={() => handleApply(job, index)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}