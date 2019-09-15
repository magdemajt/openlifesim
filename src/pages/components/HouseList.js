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
import { reduce, isEqual } from 'lodash';
import { updateUser } from '../../backend/User';
import { generateHouses } from '../../backend/database';
import { ListItemSecondaryAction, IconButton, Switch, ListSubheader } from '@material-ui/core';
import HouseOffer from '../../backend/HouseOffer';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]:{
      marginBottom: theme.spacing(10)
    }
  },
  paper: {
    // [theme.breakpoints.up('sm')]: {
    //   width: 200
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: 250
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: 350,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   width: 150,
    //   marginTop: theme.spacing(2)
    // },
    height: 430,
    width: '100%',
    overflow: 'auto',
  },
  paperWithUser: {
    // [theme.breakpoints.up('sm')]: {
    //   width: 300
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: 350
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: 500,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   width: 250,
    //   marginTop: theme.spacing(2)
    // },
    height: 430,
    width: '100%',
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  secondaryAction: {
    display: 'flex'
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function HouseList({ user, houses, setUser }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(user.houses);
  const [right, setRight] = React.useState(generateHouses(user));

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const generatePriceInfo = (house) => {
    return (
      <React.Fragment>
        <NumberFormat value={house.price} displayType="text" thousandSeparator={true} prefix="Price: " />
        {'  '}
        <NumberFormat value={house.livingCost} displayType="text" thousandSeparator={true} prefix="Cost: " />
        {'  '}
        <NumberFormat value={house.rent} displayType="text" thousandSeparator={true} prefix="Rent: " />
        {'  '}
        {house.habitable ? `Rooms: ${house.house.rooms}` : ''}
      </React.Fragment>
    )
  }

  const handleCheckedRight = () => {
    const fromSale = Math.round(reduce(leftChecked, (sum, h) => sum + h.price, 0) * 0.95);
    user.houses = not(left, leftChecked);
    user.addMoney(fromSale);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setUser(updateUser(user));
  };

  const handleCheckedLeft = () => {
    const toPay = reduce(rightChecked, (sum, h) => sum + h.price, 0);
    if (toPay <= user.money && (user.timeLeft() > 0 || (user.timeLeft() === 0 && user.houses.length % 3 < 2))) {
      user.houses = left.concat(rightChecked);
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
      user.payMoney(toPay);
      setUser(updateUser(user));
    }
  };

  const rent = (house) => {
    house.rented = !house.rented;
    setUser(updateUser(user));
  };

  const setHouseAsLiving = (house) => {
    if (house.habitable) {
      if (user.house !== null && user.house.house.rentable) {
        user.house.rentable = true;
      }
      house.rentable = false;
      house.rented = false;
      user.house = house;
      setUser(updateUser(user));
    }
  };

  const customList = items => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list" style={{width: '100%', height: '100%'}} subheader={
        <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
          Houses to buy
        </ListSubheader>
      }>
        {items.map(house => {
          const labelId = `transfer-list-item-${house.name}-label`;

          return (
            <ListItem key={house.name} role="listitem" button onClick={handleToggle(house)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(house) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${house.name}`} secondary={generatePriceInfo(house)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const userHousesList = items => (
    <Paper className={classes.paperWithUser}>
      <List dense component="div" role="list" style={{width: '100%', height: '100%'}} subheader={
        <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
          User's houses
        </ListSubheader>
      }>
        {items.map((house, index) => {
          const labelId = `transfer-list-item-${house.name}-label`;

          return (
            <ListItem key={house.name} role="listitem">
              <ListItemIcon onClick={handleToggle(house)}>
                <Checkbox
                  checked={checked.indexOf(house) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${house.name}`} secondary={generatePriceInfo(house)}/>
              <ListItemSecondaryAction className={classes.secondaryAction}>
              { house.rentable ? (
              <React.Fragment>
                <ListItemText id="switch-list-label-rent" primary="Rent" />
                  <Switch
                    edge="end"
                    onChange={() => rent(house)}
                    checked={house.rented}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-rent' }}
                  />
              </React.Fragment>
            ): null}
            { house.habitable ? (
              <React.Fragment>
                <ListItemText className={classes.marginLeft} id="switch-list-label-live" primary="Live" />
                  <Switch
                    edge="end"
                    onChange={() => setHouseAsLiving(house)}
                    checked={isEqual(house, user.house)}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-live' }}
                  />
              </React.Fragment>
              ): null}
              </ListItemSecondaryAction> 
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={12} md={7} lg={6}>{userHousesList(left)}</Grid>
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