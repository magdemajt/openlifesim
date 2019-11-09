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
import Business from '../../backend/Business';

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
  },
  centerize: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const defaultProduct = { name: '', cost: 0, price: 0, amount: 0, earnings: 0 };

export default function BusinessDialog({ user, setUser, business = new Business(), setBusiness, setColor, setInfo, setPage }) {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [updatedCosts, setUpdatedCosts] = useState(true);
  const [productWindow, setProductWindow] = useState(false);

  const [product, setNewProduct] = useState(defaultProduct);
  
  function setProduct (newProduct = {}) {
    setUpdatedCosts(false);
    setNewProduct(newProduct);
  }

  function createProduct () {
    setUpdatedCosts(false);
    business.createProduct(product.name, product.price, product.amount);
    setProduct({...defaultProduct});
    setProductWindow(false);
    setUser(updateUser(user));
  }

  useEffect(() => {
    if (!updatedCosts && business !== null) {
      const newProduct = business.seeProductCosts(product.name, product.price, product.amount);
      setNewProduct({ ...newProduct });
      setUpdatedCosts(true);
    }
    /*eslint-disable-next-line*/
  }, [product])


  function handleClose() {
    setUser(updateUser(user));
    console.log('Seems to work')
    setBusiness(null);
  }

  function payDividend() {
    business.payDividend(user, parseInt(amount));
    setAmount(0);
    setUser(updateUser(user));
  }

  function generateContent () {
    return (
    <React.Fragment>
      <Typography color="textPrimary" className={classes.centerize}>
        Name: {business.name}
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Available money: {<NumberFormat displayType="text" value={business.companyMoney} thousandSeparator={true}  />}
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Market share: {Math.round(business.percentageOfMarket)}%
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Brand: {business.brand.name}
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Marketing expenses: {<NumberFormat displayType="text" value={business.marketingMoney} thousandSeparator={true}  />}
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Other expenses: {<NumberFormat displayType="text" value={business.yearlyExpenses} thousandSeparator={true}  />}
      </Typography>
      <Typography color="textPrimary" className={classes.centerize}>
        Yearly earnings: {<NumberFormat displayType="text" value={business.yearlyEarnings} thousandSeparator={true}  />}
      </Typography>
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
      <Button onClick={() => payDividend()} variant="outlined">
        Pay dividend
      </Button>
      <Button onClick={() => setProductWindow(true)} variant="outlined">
        Open new product creation
      </Button>
      {productWindow ? (
        <React.Fragment>
          <Grid container justify="center" alignContent="center">
            <TextField
              id="standard-number"
              label="Product's name"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </Grid>
          <Grid container justify="center" alignContent="center">
            <TextField
              id="standard-number"
              label="Product's amount"
              value={product.amount}
              onChange={(e) => setProduct({...product, amount: !isNaN(e.target.value) || e.target.value === "" ? (e.target.value) : 0})}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </Grid>
          <Grid container justify="center" alignContent="center">
            <TextField
              id="standard-number"
              label="Product's price"
              value={product.price}
              onChange={(e) => setProduct({...product, price: !isNaN(e.target.value) || e.target.value === "" ? (e.target.value) : 0})}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </Grid>
          <Typography color="textPrimary" className={classes.centerize}>
            Estimated earnings: {<NumberFormat displayType="text" value={product.earnings || 0} thousandSeparator={true}  />}
          </Typography>
          <Typography color="textPrimary" className={classes.centerize}>
            Estimated cost: {<NumberFormat displayType="text" value={product.cost || 0} thousandSeparator={true}  />}
          </Typography>
          <Button onClick={() => createProduct()}>
              Create product
          </Button>
        </React.Fragment>
      ) : null}
    </React.Fragment>
    );
  }

  return (
      <Dialog
        open={business !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{business !== null ? business.name : ''}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {business !== null ? generateContent() : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
