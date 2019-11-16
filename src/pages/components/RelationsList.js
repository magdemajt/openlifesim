import React from 'react';
import { map, filter } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PlusIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  marginRight: {
    marginRight: theme.spacing(2)
  }
}));

export default function RelationsList({ user, setModalPerson, setModalOptions }) {
  const classes = useStyles();

  const setModal = (person, options) => {
    setModalPerson(person);
    setModalOptions(options);
  }

  const generateListItems = (list, listHeader, options) => {
    return map(list, (p) => {
      return (
        <ListItem alignItems="flex-start" key={listHeader(p) + p.name + p.surename}>
        <ListItemAvatar className={classes.marginRight}>
          <ListItemText secondary={listHeader(p)} />
        </ListItemAvatar>
        <ListItemText
          primary={p.name + ' ' + p.surename}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                
              </Typography>
              {!p.deceased ? ` Age: ${p.age}` : ` Died at age: ${p.age}`}
            </React.Fragment>
          }
        />
        <IconButton color="inherit" onClick={() => setModal(p, options)}>
          <PlusIcon />
        </IconButton>
      </ListItem>
      );
    });
  }

  const generateParents = () => {
    return generateListItems(user.parents, (p) => p.gender === 1 ? 'Father' : 'Mother', { showMoneyOptions: true });
  };
  const generateSiblings = () => {
    return generateListItems(user.siblings, (p) => p.gender === 1 ? 'Brother' : 'Sister', { showMoneyOptions: true });
  };
  const generateMates = () => {
    return generateListItems(user.job.jobMates, (p) => 'Workmate', { showFriendsOptions: true, updateLoveList: (userLoc, personLoc) => {
      userLoc.job.jobMates = filter(userLoc.job.jobMates, (p) => p.uuid !== personLoc.uuid);
      userLoc.partners = userLoc.partners.concat(personLoc);
    } });
  };
  const generatePartners = () => {
    return generateListItems(user.partners, (p) => 'Partner', { showMoneyOptions: true, showLoveOptions: true, updateLoveList: (userLoc, personLoc) => {
      userLoc.partners = filter(userLoc.partners, (p) => p.uuid !== personLoc.uuid);
      userLoc.fiancees = userLoc.fiancees.concat(personLoc);
    } });
  };
  const generateFiancees = () => {
    return generateListItems(user.fiancees, (p) => p.gender === 1 ? 'Fiancé' : 'Fiancée', { showMoneyOptions: true, showLoveOptions: true, fiance: true, updateLoveList: (userLoc, personLoc) => {
      userLoc.partners = filter(userLoc.partners, (p) => p.uuid !== personLoc.uuid);
      userLoc.fiancees = userLoc.fiancees.concat(personLoc);
    } });
  }
  const generateChildren = () => {
    return generateListItems(user.children, (p) => p.gender === 1 ? 'Son' : 'Daughter', { showMoneyOptions: true, showFriendsOptions: true});
  };

  return (
    <List className={classes.root}>
      {generateChildren()}
      {generateFiancees()}
      {generatePartners()}
      <Divider variant="inset" component="li" />
      {generateParents()}
      <Divider variant="inset" component="li" />
      {generateSiblings()}
      <Divider variant="inset" component="li" />
      {generateMates()}
    </List>
  );
}