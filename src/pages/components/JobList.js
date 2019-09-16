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
import { jobs, generateJobs } from '../../backend/database';
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

export default function JobList({ user, setUser, setPage, setColor, setInfo, setJob }) {
  const classes = useStyles();
  const [applied, setApplied] = React.useState(null);
  const [list, setList] = React.useState(generateJobs(user));

  return (
    <List className={classes.root} subheader={<ListSubheader component="div" id="nested-list-subheader">Jobs</ListSubheader>}>
      {list.map((job, index) => {
        const labelId = `checkbox-list-label-${job.name + job.companyName}`;

        const jobSalaryInfo = (
          <React.Fragment>
            <NumberFormat value={job.currentSalary} thousandSeparator={true} displayType="text" prefix=" Salary: "/>
          </React.Fragment>
        );

        return (
          <ListItem key={job.name + job.companyName} role={undefined} dense button onClick={() => setJob(job)}>
            <ListItemText id={labelId} primary={`${job.name} at ${job.companyName}`} secondary={jobSalaryInfo} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="apply" onClick={() => setJob(job)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}