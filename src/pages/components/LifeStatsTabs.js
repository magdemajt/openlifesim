import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FoodIcon from '@material-ui/icons/Fastfood';
import TvIcon from '@material-ui/icons/Tv';
import WorkIcon from '@material-ui/icons/WorkOutline';
import FoodPanel from './FoodPanel';
import EntertainmentPanel from './EntertainmentPanel';
import { Grid } from '@material-ui/core';
import ExtraWorkPanel from './ExtraWorkPanel';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    
  },
  box: {
    justifyContent: 'center',
    overflowY: 'auto',
    alignItems: 'center',
    display: 'flex'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box className={classes.box} p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function LifeStatsTabs({ user, setUser, setColor, setInfo }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(2);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {user.age >= 16 ? (
            <Tab label="Food Settings" icon={<FoodIcon />} {...a11yProps(0)} />
          ) : null}
          {user.age >= 16 ? (
            <Tab label="Entertainment Settings" icon={<TvIcon />} {...a11yProps(1)} />
          ) : null}
          {user.age >= 16 ? (
            <Tab label="Extra Work Settings" icon={<WorkIcon />} {...a11yProps(2)} />
          ) : null}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {user.age >= 16 ? (    
          <TabPanel value={value} index={0} dir={theme.direction}>
            <FoodPanel user={user} setUser={setUser} />
          </TabPanel>
        ) : null}
        {user.age >= 16 ? (
          <TabPanel value={value} index={1} dir={theme.direction}>
            <EntertainmentPanel user={user} setUser={setUser} />
          </TabPanel>
        ) : null}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ExtraWorkPanel setColor={setColor} setInfo={setInfo} user={user} setUser={setUser} />
        </TabPanel>
      </SwipeableViews>
    </React.Fragment>
  );
}
