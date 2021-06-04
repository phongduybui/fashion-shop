import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ProductModalView from './ProductModalView';
import Product from '../Product';
import { Button, Hidden, IconButton } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `0px 0px 0px 0px rgb(0 0 0 / 0%), 
                0px 1px 1px 0px rgb(0 0 0 / 0%), 
                0px 1px 0px 1px rgb(0 0 0 / 4%)`,
    '&:hover $mediaFront': {
      opacity: 0,
    },
    '&:hover $groupAction': {
      transform: 'translate(0, -50%)',
    },
    '&:hover $wishlist': {
      opacity: 1,
    },
  },
  mediaWrapper: {
    position: 'relative',
    paddingTop: '133.33333%', // 3:4 aspect ratio (4/3=133.33)
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  mediaFront: {
    transition: 'opacity .4s',
  },
  wishlist: {
    position: 'absolute',
    top: 10,
    right: 4,
    padding: 10,
    opacity: 0,
    zIndex: 1,
    transition: 'opacity .3s',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      color: '#999',
    },
    '&:hover svg': {
      color: '#fb5d5d',
    },
  },
  groupAction: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(100%, -50%)',
    width: 50,
    padding: '0 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'all .3s ease-in-out',
    zIndex: 1,
    '& a + a': {
      paddingTop: '10px',
    },
    '& svg': {
      color: '#999',
    },
    '& a:hover svg': {
      color: '#fb5d5d',
    },
    '& > button': {
      padding: '12px 0',
      minWidth: 50,
    },
  },
  sale: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: '0px 6px',
    color: '#fff',
    fontSize: 12,
    fontWeight: 400,
    textTransform: 'uppercase',
    lineHeight: 1.5,
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
  },
  mediaMobile: {
    ...theme.mixins.customize.flexMixin(
      'space-between',
      'center',
      'row',
      'wrap'
    ),
  },
}));

const ProductCard = ({ _id, name, images, price, sale }) => {
  const [addedWishList, setAddedWishList] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.mediaWrapper}>
          {sale > 0 && <div className={classes.sale}>{`- ${sale}% `}</div>}
          <Tooltip title='Add to wishlist' placement='top' arrow>
            <IconButton
              disableRipple
              disableFocusRipple
              disableElevation
              onClick={() => setAddedWishList(true)}
              className={classes.wishlist}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Hidden smDown>
            <div className={classes.groupAction}>
              <Tooltip title='Quick views' placement='right-start' arrow>
                <Button onClick={() => setOpenModal(true)}>
                  <VisibilityOutlinedIcon />
                </Button>
              </Tooltip>
              <Tooltip title='Add to wishlist' placement='right' arrow>
                <Button>
                  <FavoriteBorderOutlinedIcon />
                </Button>
              </Tooltip>
              <Tooltip title='Add to cart' placement='right' arrow>
                <Button>
                  <AddShoppingCartOutlinedIcon />
                </Button>
              </Tooltip>
            </div>
          </Hidden>

          <CardMedia
            className={classes.media}
            component={'img'}
            src={images ? images[1] : ''}
          />
          <CardMedia
            className={clsx(classes.media, classes.mediaFront)}
            component={'img'}
            src={images ? images[0] : ''}
          />
        </div>
        <CardContent component='div' style={{ paddingBottom: 10 }}>
          <Tooltip title={name || ''}>
            <Typography gutterBottom variant='subtitle1' component='div' noWrap>
              {name}
            </Typography>
          </Tooltip>
          <div className={classes.mediaMobile}>
            <Typography variant='subtitle2' color='textPrimary' component='div'>
              ${price}
            </Typography>
            <Hidden mdUp>
              <Tooltip title='Add to cart' placement='bottom' arrow>
                <Button
                  color='secondary'
                  className={classes.cartMobile}
                  startIcon={<RiShoppingBag3Fill />}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Add to Cart
                </Button>
              </Tooltip>
            </Hidden>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={addedWishList}
        autoHideDuration={2000}
        onClose={() => setAddedWishList(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setAddedWishList(false)} severity='success'>
          Succesful! Product has added to your wishlist.
        </Alert>
      </Snackbar>
      <ProductModalView
        id={_id}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default ProductCard;
