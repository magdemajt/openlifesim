import React, { useState, useEffect } from 'react';
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
import Business from '../../backend/Business';
import BrandList from './BrandList';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 300,
    height: 350,
    overflowY: 'auto'
  },
  button: {
    marginTop: theme.spacing(1),
    width: '100%'
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

const defaultBusiness = { name: '', startingMoney: 0, brand: null };

export default function BusinessCreateDialog({ user, setUser, opened, setOpened, setColor, setInfo, setPage }) {
  const classes = useStyles();

  const [newBusiness, setNewBusiness] = useState(defaultBusiness);

  function createBusiness () {
    if (user.money < newBusiness.startingMoney) {
      setNewBusiness({...newBusiness, startingMoney: user.money});
      setColor('warning');
      setInfo("You don't have enough money.");
      return false;
    }
    const name = newBusiness.name.trim();
    if (name !== "" && !isNaN(newBusiness.startingMoney)) {
      const createdBusiness = new Business(name, newBusiness.brand, parseInt(newBusiness.startingMoney));
      user.removeMoney(newBusiness.startingMoney);
      setNewBusiness({...defaultBusiness});
      user.businesses.push(createdBusiness);
      setUser(updateUser(user));
    }
  }

  function handleClose() {
    setUser(updateUser(user));
    setOpened(false);
  }

  function generateContent () {
    return (
    <React.Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12}>
          <TextField
            id="standard-number"
            label="Company name"
            value={newBusiness.name}
            onChange={(e) => setNewBusiness({...newBusiness, name: e.target.value})}
            type="text"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12}>
          <TextField
            id="standard-number"
            label="Starting money"
            value={newBusiness.startingMoney}
            onChange={(e) => setNewBusiness({...newBusiness, startingMoney: !isNaN(e.target.value) || e.target.value === "" ? (e.target.value) : 0})}
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
        <BrandList setSelectedBrand={(brand) => setNewBusiness({ ...newBusiness, brand })} selectedBrand={newBusiness.brand} />
      </Grid>
      <Button className={classes.button} onClick={() => createBusiness()}>
        Create company
      </Button>
    </React.Fragment>
    );
  }
  return (
      <Dialog
        open={opened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{newBusiness.name !== null ? newBusiness.name : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {generateContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
