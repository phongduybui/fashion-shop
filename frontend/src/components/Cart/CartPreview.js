import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: '100%',
    padding: 20,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    ...theme.mixins.customize.flexMixin('space-between', 'center'),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(15),
  },
  listProduct: {
    overflowY: 'auto',
    maxHeight: '60%',
    marginTop: 10,
    marginBottom: 10,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiListItem-container:last-child > .MuiListItem-divider': {
      borderBottom: 'none',
    },
  },
  priceTotal: {
    ...theme.mixins.customize.flexMixin('space-between', 'center'),
    padding: '10px 0',
  },
  button: {
    margin: '10px 0',
    '& + $button': {
      marginTop: 2,
    },
  },
}));

const CartPreview = ({ openCart, setOpenCart }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor='right'
      open={openCart}
      onClose={() => setOpenCart(false)}
      onOpen={() => setOpenCart(true)}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant='h5' component='h2' gutterBottom>
            Cart (5)
          </Typography>
          <IconButton color='secondary' onClick={() => setOpenCart(false)}>
            <ClearIcon />
          </IconButton>
        </div>
        <Divider variant='fullWidth' />
        <List className={classes.listProduct}>
          {Array(10)
            .fill()
            .map((item, index) => (
              <ListItem divider disableGutters key={index}>
                <ListItemAvatar>
                  <Avatar
                    variant='square'
                    src='https://res.cloudinary.com/phongbuiduy/image/upload/v1622644320/cybershop/products/1-4_fbwpjf.jpg'
                    alt='product image'
                    className={classes.large}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Single-line item'
                  secondary='1 x $25'
                  style={{ marginLeft: 10 }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Divider variant='fullWidth' />
        <div className={classes.priceTotal}>
          <Typography variant='subtitle1' component='span'>
            Subtotal:
          </Typography>
          <Typography
            variant='subtitle1'
            component='span'
            color='secondary'
            style={{ fontWeight: 600, fontSize: 18 }}
          >
            $185
          </Typography>
        </div>
        <Divider variant='fullWidth' />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          className={classes.button}
        >
          View Shopping Cart
        </Button>
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          className={classes.button}
        >
          Checkout
        </Button>
      </div>
    </SwipeableDrawer>
  );
};

export default CartPreview;
