import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CarsIcon from '@material-ui/icons/DirectionsCar';
import PlayIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import HouseIcon from '@material-ui/icons/Home';
import JobIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({
  root: {
    bottom: 0,
    position: 'absolute',
    overflow: 'hidden',
    left: 10,
    right: 10,
  },
  innerRoot: {
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden',
    maxWidth: '100vw',
  },
  firstIconMargin: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(10)
    },
  },
  lastIconMargin: {
    // marginRight: 20
  }
}));

export default function SimpleBottomNavigation({setPage, page, user}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
        showLabels
        className={classes.innerRoot}
      >
        <BottomNavigationAction label="Main" value={0} icon={<PlayIcon />} className={classes.firstIconMargin} />
        {user !== undefined && user.age >= 16 ? (
          <BottomNavigationAction label="Jobs" value={1} icon={<JobIcon />}/>
        ) : null}
        {user !== undefined && user.age >= 16 ? (
          <BottomNavigationAction label="Careers" value={6} icon={<JobIcon />}/>
        ) : null}
        {user !== undefined && user.age >= 16 ? (
          <BottomNavigationAction label="Houses" value={2} icon={<HouseIcon />} />
        ) : null}
        {user !== undefined && user.age >= 16 ? (
          <BottomNavigationAction label="Cars" value={3} icon={<CarsIcon />} />
        ) : null}
        <BottomNavigationAction label="Relations" value={4} icon={<PeopleIcon />} />
        {user !== undefined && user.age >= 16 ? (
        <BottomNavigationAction label="Life Settings" value={5} icon={<SettingsIcon />} className={classes.lastIconMargin}/>)
        : null}
      </BottomNavigation>
    </div>
  );
}