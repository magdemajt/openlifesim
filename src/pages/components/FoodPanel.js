import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { isEqual } from 'lodash';
import User, { updateUser } from '../../backend/User';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '480px',
    overflowY: 'auto'
  },
}));

export default function FoodPanel({ user = new User(), setUser }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(user.lifeStats.selectedFood);

  const handleToggle = newChecked => () => {
    const success = user.changeSelectedFood(newChecked);
    if (success) {
      setChecked(newChecked);
      setUser(updateUser(user));
    }
  };

  return (
    <List className={classes.root}>
      {user.lifeStats.foodOptions.map(foodOption => {
        const labelId = `checkbox-list-label-${foodOption.name}`;

        const priceInfo = (
          <React.Fragment>
            <NumberFormat value={foodOption.price} displayType="text" thousandSeparator={true} prefix="Price: " />
            {` Time: ${foodOption.timeDecay}`}
          </React.Fragment>
        );

        return (
          <ListItem key={foodOption.name} role={undefined} dense button onClick={handleToggle(foodOption)}>
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={isEqual(checked, foodOption)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${foodOption.name}`} secondary={priceInfo} />
          </ListItem>
        );
      })}
    </List>
  );
}
