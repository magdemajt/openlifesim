import React from 'react';
import {
  Paper, Grid, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { reduce, forEach } from 'lodash';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: 'calc(100vh - 160px)',
    marginTop: theme.spacing(1),
    overflowY: 'auto',
  },
  paper: {
    width: theme.spacing(40),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(48),
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(50),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(60),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      height: theme.spacing(45),
    },
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
}));

function generateText(text) {
  return (
    <>
      {text}
      <br />
    </>
  );
}
function generateSkills(skills) {
  const filteredSkills = [];
  forEach(skills, (skill, skillIndex) => {
    if (skill > 0) {
      filteredSkills.push(
        <Typography color="secondary" key={skillIndex}>
          {skillIndex.charAt(0).toUpperCase() + skillIndex.slice(1)}
          :
          {skill}
        </Typography>,
      );
    }
  });
  return filteredSkills;
}

function MainPage({ user, nextYear }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid className={classes.container}>
        <Paper className={classes.paper}>
          <Typography>
            Your current happiness level is:
          </Typography>
          <Typography color="secondary">
            {`${user.lifeStats.happiness}`}
          </Typography>
          <Typography>
            Your current job is:
          </Typography>
          <Typography color="secondary">
            {`${user.job.name} at ${user.job.companyName}`}
          </Typography>
          <Typography>
            Your current salary:
          </Typography>
          <Typography color="secondary">
            <NumberFormat value={user.job.currentSalary} displayType="text" thousandSeparator />
          </Typography>
          <Typography>
            Your current income:
          </Typography>
          <Typography color="secondary">
            <NumberFormat value={user.income()} displayType="text" thousandSeparator />
          </Typography>
          <Typography>
            Your houses maintenance cost:
          </Typography>
          <Typography color="secondary">
            <NumberFormat
              value={reduce(user.houses, (sum, h) => sum + h.livingCost, 0)}
              displayType="text"
              thousandSeparator
            />
          </Typography>
          <Typography>
            Your current skills:
          </Typography>
          {generateSkills(user.skills)}
          <Typography>
            You live in:
          </Typography>
          <Typography color="secondary">
            {user?.house?.name}
          </Typography>
          <Typography>
            Your traits:
          </Typography>
          <Typography color="secondary">
            {user?.lifeStats.fussyEaterTrait ? generateText('- Fussy Eater ') : ''}
            {user?.lifeStats.partyGoerTrait ? generateText('- Party Goer ') : ''}
            {user?.lifeStats.investorTrait ? generateText('- Investor ') : ''}
            {user?.lifeStats.geniusTrait ? generateText('- Genius ') : ''}
          </Typography>
        </Paper>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={nextYear}
        >
          Next year
        </Button>
      </Grid>
    </Grid>
  );
}

export default MainPage;
