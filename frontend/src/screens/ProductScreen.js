import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  createProductReview,
} from '../actions/productActions.js';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Meta from '../components/Meta';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import QuantityInput from '../components/QuantityInput.js';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { FaTags } from 'react-icons/fa';
import { FaShareAlt } from 'react-icons/fa';
import ProductReview from '../components/Product/ProductReview.js';
import ProductRelated from '../components/Product/ProductRelated.js';
import ShareButtons from '../components/ShareButtons.js';

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  productInfo: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0 !important',
    },
  },
  price: {
    fontSize: '1.6rem',
    fontWeight: 600,
    color: (props) => props.sale > 0 && '#f50057',
  },
  rootPrice: {
    fontSize: '1.3rem',
    textDecoration: 'line-through',
  },
  description: {
    whiteSpace: 'pre-wrap',
    fontSize: 15,
    color: theme.palette.grey[700],
  },
  sizeFormControl: {
    margin: '25px 0 25px',
  },
  sizeFormGroup: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
    color: '#2a2a2a',
  },
  button: {
    marginTop: 30,
    height: 48,
    width: 250,
    marginRight: 15,
  },
  socialGroup: {
    ...theme.mixins.customize.flexMixin('center', 'center'),
  },
  socialIcon: {
    fontSize: 18,
    margin: '0 10px',
    color: '#929292',
    transition: 'transform .3s',
    '&:hover': {
      transform: 'translateY(-1px)',
      color: theme.palette.secondary.main,
    },
  },
  sale: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: '2px 8px',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'uppercase',
    lineHeight: 1.5,
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

const ProductScreen = ({ history, match }) => {
  const [size, setSize] = useState('m');

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const classes = useStyles(product);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Container maxWidth='xl' className={classes.wrapper}>
        {loading ? (
          <CircularProgress color='secondary' />
        ) : error ? (
          <Alert severity='error'>{error}</Alert>
        ) : (
          <>
            <Meta title={product.name} />
            <Grid container className={classes.breadcrumbsContainer}>
              <Grid item>
                <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
                  <Link color='inherit' component={RouterLink} to='/'>
                    Home
                  </Link>
                  <Link color='inherit' component={RouterLink} to='/'>
                    Product
                  </Link>
                  <Link
                    color='textPrimary'
                    component={RouterLink}
                    to={`/product/${product._id}`}
                  >
                    {product?.name || 'Not found product'}
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} md={5}>
                <Carousel
                  showIndicators
                  showArrows
                  showThumbs
                  swipeable={false}
                  showStatus={false}
                  animationHandler='fade'
                >
                  {product.images?.map((image, i) => (
                    <div className='slide-product-image' key={i}>
                      {product.sale > 0 && (
                        <div
                          className={classes.sale}
                        >{`- ${product.sale}% `}</div>
                      )}
                      <img src={image} alt='' />
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={7} className={classes.productInfo}>
                <Typography variant='h4' component='h1' gutterBottom>
                  {product.name}
                </Typography>
                <Box display='flex' alignItems='center' mb={1}>
                  <Rating name='read-only' value={product.rating} readOnly />
                  <Typography component='span' style={{ marginLeft: 5 }}>
                    {`(${product.numReviews} reviews) | `}
                  </Typography>
                  <Typography
                    component='span'
                    style={{ marginLeft: 5 }}
                    color='secondary'
                  >
                    {`Status: ${
                      product.countInStock > 0 ? 'In Stock' : 'Out of Stock'
                    }`}
                  </Typography>
                </Box>
                <Typography
                  variant='h6'
                  color='textPrimary'
                  component='div'
                  className={classes.price}
                  gutterBottom
                >
                  {product.sale ? (
                    <Typography
                      variant='subtitle2'
                      color='textSecondary'
                      component='span'
                      className={classes.rootPrice}
                    >
                      ${product.price}
                    </Typography>
                  ) : null}
                  {'  '}$
                  {product.sale
                    ? product.price * (1 - product.sale / 100)
                    : product.price}
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  className={classes.description}
                >
                  {product.description}
                </Typography>
                <FormControl
                  fullWidth
                  component='fieldset'
                  classes={{ root: classes.sizeFormControl }}
                >
                  <FormLabel
                    component='legend'
                    color='secondary'
                    className={classes.label}
                  >
                    Size: {size.toUpperCase()}
                  </FormLabel>
                  <RadioGroup
                    classes={{ root: classes.sizeFormGroup }}
                    aria-label='size'
                    name='size'
                    value={size}
                    onChange={handleSizeChange}
                  >
                    {['s', 'm', 'l', 'xl'].map((currSize) => (
                      <FormControlLabel
                        value={currSize}
                        control={<Radio />}
                        label={currSize.toUpperCase()}
                        key={currSize}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel
                    component='legend'
                    color='secondary'
                    className={classes.label}
                    style={{ marginBottom: 15 }}
                  >
                    Quantity:
                  </FormLabel>
                  <QuantityInput />
                </FormControl>
                <Button
                  variant='contained'
                  color='secondary'
                  startIcon={<FiShoppingBag />}
                  className={classes.button}
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<FiHeart />}
                  className={classes.button}
                  disabled={product.countInStock === 0}
                >
                  Add to Wishlist
                </Button>
                <Divider style={{ marginTop: 30 }} />
                <Box display='flex' alignItems='center' my={2}>
                  <Box
                    mr={1}
                    color='text.secondary'
                    display='flex'
                    alignItems='center'
                  >
                    <FaTags />
                  </Box>
                  <Typography className={classes.label}>Categories:</Typography>
                  <Box ml={2}>
                    <Chip size='small' label={product.category} />
                  </Box>
                </Box>
                <Divider />
                <Box display='flex' alignItems='center' my={2}>
                  <Box
                    mr={1}
                    color='text.secondary'
                    display='flex'
                    alignItems='center'
                  >
                    <FaShareAlt />
                  </Box>
                  <Typography className={classes.label}>Share:</Typography>
                  <Box ml={1}>
                    <div className={classes.socialGroup}>
                      <ShareButtons url='https://cybershop-v1.herokuapp.com/product/60b7a25e04e1647ea01d5eaf' />
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductReview />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductRelated category={product.category} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
