import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Grid, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessDialog from './components/BusinessDialog';
import BusinessCreateDialog from './components/BusinessCreateDialog';
import BusinessList from './components/BusinessList';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: 'calc(100vh - 160px)',
    marginTop: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paper: {
    width: theme.spacing(40),
    height: theme.spacing(60),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    width: '50%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(10),
    },
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      height: 300,
    },
    [theme.breakpoints.up('md')]: {
      height: 350,
    },
    [theme.breakpoints.up('lg')]: {
      height: 500,
    },
    [theme.breakpoints.down('sm')]: {
      height: 250,
      marginTop: theme.spacing(2),
    },
    overflowY: 'auto',
  },
}));

function BusinessPage({
  user, setUser, setPage, setColor, setInfo,
}) {
  const [business, setBusiness] = useState(null);
  const [opened, setOpened] = useState(false);

  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid item xs={12} className={classes.container}>
        <BusinessList
          selectedBusiness={business}
          setSelectedBusiness={setBusiness}
          businesses={user?.businesses || []}
        />
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpened(true)}
      >
        Create new business
      </Button>
      <BusinessCreateDialog
        opened={opened}
        setOpened={setOpened}
        user={user}
        setUser={setUser}
        setColor={setColor}
        setInfo={setInfo}
        setPage={setPage}
      />
      <BusinessDialog
        business={business}
        setBusiness={setBusiness}
        user={user}
        setUser={setUser}
        setColor={setColor}
        setInfo={setInfo}
        setPage={setPage}
      />
    </Grid>
  );
}

export default BusinessPage;
