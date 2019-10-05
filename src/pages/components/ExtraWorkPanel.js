import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { isEqual } from 'lodash';
import User, { updateUser } from '../../backend/User';
import { extraTimeLessons } from '../../backend/database';
import ExtraLessonDialog from './ExtraLessonDialog';
import { ListSubheader } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '480px',
    overflowY: 'auto'
  },
}));

export default function ExtraWorkPanel({ user = new User(), setUser, setColor, setInfo }) {
  const classes = useStyles();
  const [extraLesson, setExtraLesson] = React.useState(null);

  const handleToggle = lesson => () => {
    setExtraLesson(lesson);
  };

  return (
    <React.Fragment>
      <List className={classes.root} subheader={
        <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
          Extra lessons
        </ListSubheader>}>
        {user.lifeStats.extraLessons.map(lesson => {
          const labelId = `checkbox-list-label-${lesson.name}`;

          return (
            <ListItem key={lesson.name} role={undefined} dense button onClick={handleToggle(lesson)}>
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  checked={lesson.active}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${lesson.name}`} secondary={`Price: ${lesson.price} Time: ${lesson.time}`}/>
            </ListItem>
          );
        })}
      </List>
      <ExtraLessonDialog user={user} setUser={setUser} setExtraLesson={setExtraLesson} extraLesson={extraLesson} setColor={setColor} setInfo={setInfo}/>
    </React.Fragment>
  );
}
