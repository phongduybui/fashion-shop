import React, { useState } from 'react';
import logo from '../assets/images/logo_ver2.png';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cart.svg';
import { ReactComponent as WishlistIcon } from '../assets/icons/wishlist.svg';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MenuList from '@material-ui/core/MenuList';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Drawer, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    flexBasis: '40%',
    maxWidth: '40%',
    ...theme.mixins.customize.flexMixin('flex-end', 'center'),
  },
  header: {
    backgroundColor: '#fff',
    color: '#444',
    transition: 'all .2s',
    boxShadow: '0px 2px 8px -1px rgb(0 0 0 / 10%)',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  header2: {
    backgroundColor: '#fff',
    color: '#444',
    transition: 'all .2s',
    boxShadow: '0px 2px 8px -1px rgb(0 0 0 / 10%)',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: 'none',
    marginRight: theme.spacing(2),
    '@media(max-width: 740px)': {
      display: 'block',
    },
  },
  logoWrapper: {
    flexBasis: '20%',
    maxWidth: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexGrow: 1,
    maxWidth: 120,
  },
  navMenu: {
    flexBasis: '40%',
    maxWidth: '40%',
    padding: 0,
  },
  drawer: {
    width: 250,
  },
  navList: {
    display: 'flex',
  },
  navListMobile: {
    width: '250px',
    marginTop: 50,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& .navItem': {
      width: '100%',
      justifyContent: 'center',
    },
  },

  closeButton: {
    position: 'fixed',
    top: 10,
    left: 20,
  },
}));

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const onMobile = useMediaQuery('(max-width:740px)');

  const classes = useStyles({ mobile });
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
    threshold: 80,
  });

  return (
    <div className={classes.grow}>
      <AppBar
        position='fixed'
        className={!trigger ? classes.header : classes.header2}
      >
        <Toolbar>
          <Toolbar className={classes.navMenu}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              onClick={() => setMobile(!mobile)}
              color='inherit'
              aria-label='open drawer'
            >
              <MenuIcon />
            </IconButton>
            {!onMobile ? (
              <MenuList className={classes.navList} role='presentation'>
                <MenuItem component={Link} to='/' className='navItem'>
                  Home
                </MenuItem>
                <MenuItem component={Link} to='/' className='navItem'>
                  Shop
                </MenuItem>
                <MenuItem component={Link} to='/' className='navItem'>
                  About Us
                </MenuItem>
              </MenuList>
            ) : (
              <Drawer
                variant='temporary'
                anchor='left'
                className={classes.drawer}
                open={mobile}
                onClose={() => setMobile(false)}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile
                  disablePortal: true,
                }}
              >
                <MenuList className={classes.navListMobile} role='presentation'>
                  <MenuItem component={Link} to='/' className='navItem'>
                    Home
                  </MenuItem>
                  <MenuItem component={Link} to='/' className='navItem'>
                    Shop
                  </MenuItem>
                  <MenuItem component={Link} to='/' className='navItem'>
                    About Us
                  </MenuItem>
                </MenuList>
                <IconButton
                  edge='start'
                  className={classes.closeButton}
                  onClick={() => setMobile(false)}
                  color='inherit'
                  aria-label='close drawer'
                >
                  <CloseIcon />
                </IconButton>
              </Drawer>
            )}
          </Toolbar>
          <Toolbar className={classes.logoWrapper}>
            <img src={logo} alt='logo' className={classes.logo} />
          </Toolbar>
          <div className={classes.sectionDesktop}>
            <Hidden smDown>
              <IconButton color='inherit'>
                <SearchIcon height={22} width={22} />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <IconButton color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <WishlistIcon />
                </Badge>
              </IconButton>
            </Hidden>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <CartIcon />
              </Badge>
            </IconButton>
            <Hidden smDown>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-haspopup='true'
                // onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <UserIcon height={22} />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
