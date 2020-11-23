import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { isEqual } from 'lodash';
import User, { updateUser } from '../../backend/User';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '480px',
    overflowY: 'auto',
  },
}));

export default function EntertainmentPanel({ user = new User(), setUser }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(user.lifeStats.selectedParty);

  const handleToggle = (newChecked) => () => {
    const success = user.changeSelectedParty(newChecked);
    if (success) {
      setChecked(newChecked);
      setUser(updateUser(user));
    }
  };

  return (
    <List className={classes.root}>
      {user.lifeStats.partyOptions.map((partyOption) => {
        const labelId = `checkbox-list-label-${partyOption.name}`;

        return (
          <ListItem
            key={partyOption.name}
            role={undefined}
            dense
            button
            onClick={handleToggle(partyOption)}
          >
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={isEqual(checked, partyOption)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${partyOption.name}`} secondary={`Price: ${partyOption.price} Time: ${partyOption.timeDecay}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
