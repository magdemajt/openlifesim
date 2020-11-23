import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { reduce, isEqual, random } from 'lodash';
import {
  ListItemSecondaryAction, IconButton, Switch, ListSubheader,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { updateUser } from '../../backend/User';
import { generateHouses, generateCars } from '../../backend/database';
import HouseOffer from '../../backend/HouseOffer';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: '100%',
    height: 430,
    overflow: 'auto',
  },
  paperWithUser: {
    width: '100%',
    height: 430,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  secondaryAction: {
    display: 'flex',
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function CarsList({ user, year, setUser }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(user.cars);
  const [right, setRight] = React.useState(generateCars(user, year));

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const fromSale = Math.round(reduce(leftChecked, (sum, h) => sum + h.price, 0) * 0.95);
    user.cars = not(left, leftChecked);
    user.addMoney(fromSale);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setUser(updateUser(user));
  };

  const handleCheckedLeft = () => {
    const toPay = reduce(rightChecked, (sum, h) => sum + h.price, 0);
    if (toPay <= user.money) {
      user.cars = left.concat(rightChecked);
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
      user.removeMoney(toPay);
      setUser(updateUser(user));
    }
  };

  const carPriceInfo = (car) => (
    <>
      <NumberFormat value={car.price} displayType="text" thousandSeparator prefix="Price: " />
      <NumberFormat value={car.cost} displayType="text" thousandSeparator prefix=" Cost: " />
    </>
  );

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List
        dense
        component="div"
        role="list"
        style={{ width: '100%', height: '100%' }}
        subheader={(
          <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
            Cars to buy
          </ListSubheader>
        )}
      >
        {items.map((car, index) => {
          const labelId = `transfer-list-item-${car.name + index}-label`;

          return (
            <ListItem key={car.name + index} role="listitem" button onClick={handleToggle(car)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(car) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${car.name}`} secondary={carPriceInfo(car)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const userCarsList = (items) => (
    <Paper className={classes.paperWithUser}>
      <List
        dense
        component="div"
        role="list"
        style={{ width: '100%', height: '100%' }}
        subheader={(
          <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
            User's cars
          </ListSubheader>
        )}
      >
        {items.map((car, index) => {
          const labelId = `transfer-list-item-${car.name + index}-label`;

          return (
            <ListItem key={`${car.name}${index}`} role="listitem">
              <ListItemIcon onClick={handleToggle(car)}>
                <Checkbox
                  checked={checked.indexOf(car) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${car.name}`} secondary={carPriceInfo(car)} />
              {/* <ListItemSecondaryAction className={classes.secondaryAction}>
                <ListItemText id="switch-list-label-rent" primary="More..." />
                  <Switch
                    edge="end"
                    onChange={() => rent(car)}
                    checked={car.rented}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-rent' }}
                  />
              </ListItemSecondaryAction>  */}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={12} md={7} lg={6}>{userCarsList(left)}</Grid>
      <Grid item xs={12} md={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            Buy
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Sell
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} lg={5}>{customList(right)}</Grid>
    </Grid>
  );
}
