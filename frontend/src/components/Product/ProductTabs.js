import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} component='div'>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    wrapped: true,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
  },
  tab: {
    textTransform: 'capitalize',
    fontSize: '1rem',
    '@media (max-width: 400px)': {
      fontSize: '12px',
    },
  },
}));

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Tabs
          variant={matches ? 'scrollable' : 'standard'}
          value={value}
          onChange={handleChange}
          aria-label='tabs product'
          indicatorColor='secondary'
          textColor='secondary'
          className={classes.tabs}
        >
          <Tab
            className={classes.tab}
            label='Latest Arrivals'
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label='Sale Products'
            {...a11yProps(1)}
          />
          <Tab className={classes.tab} label='Best Rating' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          {Array(8)
            .fill()
            .map((x, i) => (
              <Grid item key={i + 1} xs={12} sm={4} md={3}>
                <ProductCard />
              </Grid>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={4}>
          {Array(8)
            .fill()
            .map((x, i) => (
              <Grid item key={i + 1} xs={12} sm={4} md={3}>
                <ProductCard />
              </Grid>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={4}>
          {Array(8)
            .fill()
            .map((x, i) => (
              <Grid item key={i + 1} xs={12} sm={4} md={3}>
                <ProductCard />
              </Grid>
            ))}
        </Grid>
      </TabPanel>
    </div>
  );
}
