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
import { doFriendlyStuff, giveMoney, askForMoney, assault, shoutAt, askToBeADate, joke, talk, doRomanticStuff, tryForABaby } from '../../backend/PersonActions';
import SleepButton from './SleepButton';

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

export default function RelationsDialog({ user, setUser, person = new Person(), setOptions, options, setPerson, setColor, setInfo }) {
  const [amount, setAmount] = React.useState(0);
  const [canClose, setCanClose] = React.useState(true);
  const classes = useStyles();
  const optionsDefaulted = { showMoneyOptions: false, showFamilyOptions: false, showLoveOptions: false, showMateOptions: false, showFriendsOptions: false, fiance: false, married: false, ...options };

  function handleClose() {
    if (canClose) {
      setUser(updateUser(user));
      setPerson(null);
      setOptions({});
    }
  }
  function doFriendlyStuffClick (user, person) {
    if (doFriendlyStuff(user, person)) {
      setColor("success");
      setInfo(`${person.name} ${person.surename} enjoyed doing friendly Stuff with You!`)
    } else {
      setColor("error");
      setInfo(`${person.name} ${person.surename} didn't enjoy doing friendly Stuff with You :(`)
    }
    setUser(updateUser(user));
  }
  function giveMoneyClick (user, person) {
    if (giveMoney(user, person, Number(amount))) {
      setColor("success");
      setInfo(<NumberFormat value={amount} prefix={`You gave ${person.name} ${person.surename}: `} thousandSeparator={true} displayType="text" />);
    } else {
      setColor("error");
      setInfo("You don't have enough money.");
    }
    setUser(updateUser(user));
  }
  function askForMoneyClick (user, person) {
    if (askForMoney(user, person, Number(amount))) {
      setColor("success");
      setInfo(<NumberFormat value={amount} prefix={`${person.name} ${person.surename} gave you: `} thousandSeparator={true} displayType="text" />);
    } else {
      setColor("error");
      setInfo("You ask for too much.");
    }
    setUser(updateUser(user));
  }
  function assaultClick (user, person) {
    if (assault(user, person)) {
      setColor("success");
      setInfo(`You kicked ${person.name} ${person.surename}'s ***`);
    } else {
      setColor("error");
      setInfo(`${person.name} ${person.surename} was stronger then you. You lost some health.`);
    }
    setUser(updateUser(user));
  }
  function askToBeADateClick (user, person) {
    if (askToBeADate(user, person)) {
      setColor("success");
      setInfo(`${person.name} ${person.surename} is your partner now!`);
      optionsDefaulted.updateLoveList(user, person);
    } else {
      setColor("error");
      setInfo(`${person.name} ${person.surename} doesn't want you as ${person.gender === 1 ? 'his' : 'her'} partner.`);
    }
    setUser(updateUser(user));
  }
  function shoutAtClick (user, person) {
    shoutAt(user, person);
    setColor("info");
    setInfo(`You shouted at ${person.name} ${person.surename}.`);
    setUser(updateUser(user));
  }
  function jokeClick (user, person) {
    if (joke(user, person)) {
      setColor("success");
      setInfo(`${person.name} ${person.surename} liked your joke!`);
    } else {
      setColor("error");
      setInfo(`${person.name} ${person.surename} didn't like your joke! :(`);
    }
    setUser(updateUser(user));
  }
  function talkClick (user, person) {
    if (talk(user, person)) {
      setColor("success");
      setInfo(`${person.name} ${person.surename} enjoyed conversation!`)
    } else {
      setColor("error");
      setInfo(`${person.name} ${person.surename} didn't enjoy talking to You`)
    }
    setUser(updateUser(user));
  }
  function doRomanticStuffClick(user, person) {
    doRomanticStuff(user, person)
    setColor("success");
    setInfo(`You spent some time with ${person.name} ${person.surename}! You paid some money for dinner.`);
    setUser(updateUser(user));
  }
  function tryForABabyClick(user, person) {
    if (tryForABaby(user, person)) {
    setColor("success");
    setInfo(`${person.gender === 0 ? 'Your partner got pregnant' : 'You got pregnant'}!`);
    } else {
      setColor("error");
      setInfo(`You won't have a baby this time :(`);
    }
    setUser(updateUser(user));
  }

  return (
      <Dialog
        open={person !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{person !== null ? person.name + ' ' + person.surename : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Typography color="textPrimary">
            Salary: 
          </Typography>
          <Typography color="textSecondary">
            <NumberFormat displayType="text" value={person !== null && !person.deceased ? person.job.currentSalary : 0} thousandSeparator={true} />
          </Typography>
          <Typography color="textPrimary">
            Income: 
          </Typography>
          <Typography color="textSecondary">
            <NumberFormat displayType="text" value={person !== null && !person.deceased ? person.income() : 0} thousandSeparator={true} />
          </Typography>
          <Typography color="textPrimary">
            Relation:
          </Typography>
          <Typography color="textSecondary">
            <NumberFormat displayType="text" value={person !== null && !person.deceased ? person.relation : 100} />
          </Typography>
          <Divider variant="fullWidth"/>
          {
            person !== null && !person.deceased && user.age > 3 && person.age > 3 ? (
              
          <Grid container justify="center" alignContent="center">
            {optionsDefaulted.showLoveOptions && user.age >= 10 ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => doRomanticStuffClick(user, person)}>
                    Do Romantic Stuff!
                  </SleepButton>
                </Grid>
              </React.Fragment>
            ): null}
            {optionsDefaulted.showLoveOptions && user.age >= 16 && user.gender !== person.gender ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <SleepButton timeLeft={user.timeLeft()} canClose={canClose} color="secondary" className={classes.button} onClick={() => tryForABabyClick(user, person)}>
                    Try for a baby
                  </SleepButton>
                </Grid>
              </React.Fragment>
            ): null}
            <Grid item xs={12}>
              <Grid container justify="center" alignContent="center">
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => talkClick(user, person)}>
                  Talk
                </SleepButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignContent="center">
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => jokeClick(user, person)}>
                  Joke
                </SleepButton>
              </Grid>
            </Grid>
            {user.lifeStats.happiness >= 50 && person.relation > 30 ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container justify="center" alignContent="center">
                    <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => doFriendlyStuffClick(user, person)}>
                      Do Friendly Stuff!
                    </SleepButton>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : ( 
            <React.Fragment>
              <Grid item xs={12}>
                <Grid container justify="center" alignContent="center">
                  <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => assaultClick(user, person)}>
                    Assault
                  </SleepButton>
                </Grid>
              </Grid>
            </React.Fragment>
            )}
            <Grid item xs={12}>
              <Grid container justify="center" alignContent="center">
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => shoutAtClick(user, person)}>
                  Shout at
                </SleepButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignContent="center">
              <TextField
                id="standard-number"
                label="Amount of money"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignContent="center">
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => giveMoneyClick(user, person)}>
                  Give money!
                </SleepButton>
              </Grid>
            </Grid>
            {optionsDefaulted.showMoneyOptions && user.age >= 10 ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container justify="center" alignContent="center">
                    <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => askForMoneyClick(user, person)}>
                      Ask for money
                    </SleepButton>
                  </Grid>
                </Grid>
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button}>

                </SleepButton>
              </React.Fragment>
            ): null}
            {optionsDefaulted.showFriendsOptions && user.age >= 10 && person.gender === user.sexuality && person.relation >= 80 && !optionsDefaulted.fiance ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container justify="center" alignContent="center">
                    <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button} onClick={() => askToBeADateClick(user, person)}>
                      Ask to be a date
                    </SleepButton>
                  </Grid>
                </Grid>
                <SleepButton timeLeft={user.timeLeft()} canClose={canClose} setCanClose={setCanClose} color="secondary" className={classes.button}>

                </SleepButton>
              </React.Fragment>
            ): null}
            </Grid> 
            ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
