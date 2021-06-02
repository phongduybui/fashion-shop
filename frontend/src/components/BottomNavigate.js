import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: theme.palette.grey[200],
    zIndex: 9999,
  },
  botNavigateButton: {
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}));

const BottomNavigate = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const onMobile = useMediaQuery('(max-width: 600px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {onMobile ? (
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.botNavigateButton}
            label='Home'
            value='home'
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            className={classes.botNavigateButton}
            label='Wishlists'
            value='wishlists'
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            className={classes.botNavigateButton}
            label='My Cart'
            value='cart'
            icon={<LocalMallIcon />}
          />
        </BottomNavigation>
      ) : null}
    </>
  );
};

export default BottomNavigate;
