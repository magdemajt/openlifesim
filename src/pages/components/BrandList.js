import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { generateHouses, brands } from '../../backend/database';
import { ListItemSecondaryAction, IconButton, Switch, ListSubheader } from '@material-ui/core';

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

export default function BrandList({ selectedBrand, setSelectedBrand }) {
  const classes = useStyles();
  const generateBrandSize = (brand) => {
    return brand.size === 0 ? 'small' : (brand.size === 1 ? 'medium' : (brand.size === 2 ? 'big' : brand.size === 3 ? 'GIANT' : 'Strange'))
  } 

  const brandList = items => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list" style={{width: '100%', height: '100%'}} subheader={
        <ListSubheader component="div" disableSticky id="user-houses-list-subheader">
          Available brands
        </ListSubheader>
      }>
        {brands.map(brand => {
          const labelId = `transfer-list-item-${brand.name}-label`;

          return (
            <ListItem key={brand.name} role="listitem" button onClick={() => setSelectedBrand(brand)}>
              <ListItemIcon>
                <Checkbox
                  checked={selectedBrand === brand}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${brand.name}`} secondary={`Size: ${generateBrandSize(brand)}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      {brandList()}
    </Grid>
  );
}