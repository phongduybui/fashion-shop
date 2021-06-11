import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '@material-ui/icons/Delete';
import QuantityInput from '../components/QuantityInput';

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  largeImage: {
    width: theme.spacing(12),
    height: theme.spacing(15),
  },
  cartTotalWrapper: {
    padding: 20,
    fontSize: 16,
    backgroundColor: '#F4F4F4',
  },
  cartTotal: {
    fontSize: 18,
    marginBottom: 8,
    '&:nth-child(2)': {
      color: theme.palette.secondary.main,
    },
  },
}));

const CartScreen = ({ history, match, location }) => {
  const classes = useStyles();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      item.sale > 0
        ? acc + item.qty * (item.price * (1 - item.sale / 100))
        : acc + item.qty * item.price,
    0
  );

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, qty, productId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateCartHandler = (id, qty, size) => {
    dispatch(addToCart(id, qty, size));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Container maxWidth='xl' style={{ marginBottom: 48 }}>
      <Meta title='Shopping Cart | FashionShop' />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
            <Link color='inherit' component={RouterLink} to='/'>
              Home
            </Link>
            <Link color='textPrimary' component={RouterLink} to='/cart'>
              Shopping Cart
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {cartItems.length > 0 ? (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Products</TableCell>
                      <Hidden smDown>
                        <TableCell align='right'>Price</TableCell>
                        <TableCell align='right'>Size</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='right'>Action</TableCell>
                      </Hidden>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell component='th' scope='item'>
                          <ListItem disableGutters>
                            <ListItemAvatar>
                              <Avatar
                                variant='square'
                                src={item.images && item.images[0]}
                                alt='product image'
                                className={classes.largeImage}
                              ></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.name}
                              style={{ marginLeft: 16 }}
                            />
                          </ListItem>
                          <Hidden mdUp>
                            <Divider variant='fullWidth' />
                            <Box
                              display='flex'
                              justifyContent='space-between'
                              alignItems='center'
                              mt={2}
                            >
                              <Box textAlign='center'>
                                $
                                {item.sale > 0
                                  ? item.price * (1 - item.sale / 100)
                                  : item.price}
                              </Box>
                              <Box textAlign='center'>
                                <FormControl variant='outlined' size='small'>
                                  <InputLabel shrink id='size-select-label'>
                                    Size
                                  </InputLabel>
                                  <Select
                                    labelId='size-select-label'
                                    id='size-select'
                                    // value={size}
                                    // onChange={handleSizeChange}
                                    defaultValue={item.sizeSelected}
                                    label='Size'
                                    autoWidth
                                  >
                                    {Object.keys(item.size).map((value) =>
                                      item.size[value] > 0 ? (
                                        <MenuItem value={value}>
                                          {value.toUpperCase()}
                                        </MenuItem>
                                      ) : null
                                    )}
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box textAlign='center'>
                                <QuantityInput
                                  value={item.qty}
                                  width={30}
                                  height={30}
                                />
                              </Box>
                              <Box textAlign='center'>
                                <IconButton
                                  edge='end'
                                  onClick={() =>
                                    removeFromCartHandler(item.product)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </Hidden>
                        </TableCell>
                        <Hidden smDown>
                          <TableCell align='right'>
                            $
                            {item.sale > 0
                              ? item.price * (1 - item.sale / 100)
                              : item.price}
                          </TableCell>
                          <TableCell align='right'>
                            <FormControl
                              variant='outlined'
                              className={classes.formControl}
                              size='small'
                            >
                              <InputLabel shrink id='size-select'>
                                Size
                              </InputLabel>
                              <Select
                                labelId='size-select-label'
                                id='size-select'
                                // value={size}
                                onChange={updateCartHandler}
                                defaultValue={item.sizeSelected}
                                label='Size'
                                autoWidth
                              >
                                {Object.keys(item.size).map((value) =>
                                  item.size[value] > 0 ? (
                                    <MenuItem value={value}>
                                      {value.toUpperCase()}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align='right'>
                            <QuantityInput
                              value={item.qty}
                              width={30}
                              height={30}
                              justifyContent='flex-end'
                              // onChange={() =>
                              //   updateCartHandler(
                              //     item.product,
                              //     item.sizeSelected,
                              //     item.qty
                              //   )
                              // }
                            />
                          </TableCell>
                          <TableCell align='right'>
                            <IconButton
                              edge='end'
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </Hidden>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className={classes.empty}>
              <Typography variant='subtitle1' color='secondary'>
                Your cart is empty.{' '}
                <Link to='/' component={RouterLink} color='primary'>
                  Shopping now!
                </Link>
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} className={classes.cartTotalWrapper}>
            <Typography variant='h4' style={{ fontSize: 23 }}>
              Cart Totals
            </Typography>
            <Divider style={{ margin: '8px 0' }} />
            <Grid container alignItems='center'>
              <Grid item xs={4} className={classes.cartTotal}>
                Total:
              </Grid>
              <Grid item xs={8} className={classes.cartTotal}>
                ${totalPrice}
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={4} className={classes.cartTotal}>
                Items:
              </Grid>
              <Grid item xs={8} className={classes.cartTotal}>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Grid>
            </Grid>
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              style={{ marginTop: 8 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartScreen;
