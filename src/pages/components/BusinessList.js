import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { ListSubheader } from '@material-ui/core';

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

export default function BusinessList({ selectedBusiness, setSelectedBusiness, businesses }) {
  const classes = useStyles();

  const businessList = items => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list" style={{width: '100%', height: '100%'}} subheader={
        <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
          Your businesses
        </ListSubheader>
      }>
        {businesses.map(business => {
          const labelId = `transfer-list-item-${business.name}${business.brand.name}-label`;

          return (
            <ListItem key={business.name} role="listitem" button onClick={() => setSelectedBusiness(business)}>
              <ListItemIcon>
                <Checkbox
                  checked={selectedBusiness === business}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${business.name}`} secondary={`Brand: ${business.brand.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      {businessList()}
    </Grid>
  );
}