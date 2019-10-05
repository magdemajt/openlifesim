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
import ExtraTimeLesson from '../../backend/ExtraTimeLesson';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 300,
    height: 350,
    overflowY: 'auto'
  },
  button: {
    marginTop: theme.spacing(1),
  },
  margin: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
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

export default function ExtraLessonDialog({ user, setUser, extraLesson = ExtraTimeLesson(), setExtraLesson, setColor, setInfo }) {
  const classes = useStyles();

  function handleClose() {
    setUser(updateUser(user));
    setExtraLesson(null);
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

  function activateExtraLesson (lesson) {
    if (lesson.checkIfCanActivate()) {
      lesson.active = true;
      setUser(updateUser(user));
      setColor("success");
      setInfo(`You started going to ${lesson.name}`);
    } else {
      setColor("error");
      setInfo(`You don't have enough time or money.`);
    }
  }
  function deactivateExtraLesson (lesson) {
    lesson.active = false;
    setUser(updateUser(user));
    setColor("success");
    setInfo(`You stopped going to ${lesson.name}`);
  }
  function generateContent () {
    return (
      <React.Fragment>
        <Typography color="textPrimary" className={classes.margin}>
          {extraLesson.name}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography color="textSecondary" className={classes.margin}>
          <NumberFormat prefix={'Cost: '} displayType="text" value={extraLesson.price} thousandSeparator={true} />
        </Typography>
        <Divider variant="fullWidth" />
        <Typography color="textSecondary" className={classes.margin}>
          Time it takes: {extraLesson.time}
        </Typography>
        <Divider variant="fullWidth" />
        {generateSkillList('Requirements: ', extraLesson.requiredSkills)}
        <Divider variant="fullWidth" />
        {generateSkillList('Skill growth: ', extraLesson.skillsItAdds)}
        <Divider variant="fullWidth"/>
        <Grid item xs={12}>
          <Grid container justify="center" alignContent="center">
            <Button color="secondary" className={classes.button} onClick={extraLesson.active ? () => deactivateExtraLesson(extraLesson) : () => activateExtraLesson(extraLesson)}>
              {extraLesson.active ? 'Unselect It' : 'Select it!'}
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return (
      <Dialog
        open={extraLesson !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{extraLesson !== null ? extraLesson.name : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {extraLesson !== null ? generateContent() : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
