import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import queryString from 'query-string';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { openSnackbar } from '../actions/snackbarActions';
import {
  listProducts,
  listTopProducts,
  listLatestProducts,
  listSaleProducts,
} from '../actions/productActions';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Button,
  Link,
  Box,
  Grid,
  Breadcrumbs,
  IconButton,
  InputBase,
  Divider,
  Slider,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  FormLabel,
} from '@material-ui/core';
import { PaginationItem, Pagination } from '@material-ui/lab';
import Meta from '../components/Meta';
import ProductCard from '../components/Product/ProductCard';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3GapFill, BsGridFill } from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
    marginBottom: 20,
    '& .MuiBreadcrumbs-ol': {
      justifyContent: 'flex-start',
    },
  },

  container: {
    marginBottom: 64,
    boxShadow: '0 10px 31px 0 rgba(0,0,0,0.05)',
  },
  search: {
    position: 'relative',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    transition: 'background .3s',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    border: '1px solid #DDDDDD',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A3A2A2',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '12px 8px 12px 0',
    paddingLeft: 20,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  divider: {
    margin: theme.spacing(5, 0),
  },
  title: {
    color: '#4D4D4D',
  },
  category: {
    ...theme.mixins.customize.flexMixin('flex-start', 'flex-start', 'column'),
    '& > span + span': {
      marginTop: theme.spacing(2),
    },
  },
  tags: {
    '& > button': {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 0,
      textTransform: 'capitalize',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    '& > button:hover': {
      backgroundColor: 'transparent',
    },
  },
  size: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    '& label': {
      color: '#2a2a2a',
      paddingRight: 12,
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 6,
      paddingBottom: 6,
      color: 'rgba(0, 0, 0, 0.54) ',
      fontSize: 16,
    },
    '& .MuiInputBase-formControl': {
      borderRadius: 0,
      marginRight: theme.spacing(6),
    },
  },
  layoutIcon: {
    ...theme.mixins.customize.centerFlex('column'),
    padding: 4,
    cursor: 'pointer',
    '& + $layoutIcon': {
      marginLeft: 8,
    },
  },
  activeLayout: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  topFilter: {
    ...theme.mixins.customize.flexMixin('space-between', 'center'),
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    padding: 21,
    marginBottom: theme.spacing(5),
  },
  pagination: {
    flexBasis: '100%',
    marginTop: 16,
    marginBottom: 16,
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    },
  },
}));

const ShopScreen = ({ location, history }) => {
  const [price, setPrice] = useState([100, 500]);
  const [activeLayout, setActiveLayout] = useState(4);
  const [data, setData] = useState({ products: [], page: 1, pages: 1 });

  let { sortBy = 'default', pageNumber = 1 } = queryString.parse(
    location.search
  );

  const productList = useSelector((state) => state.productList);
  const { products: allProducts, page: allPage, pages: allPages } = productList;

  const productTopRated = useSelector((state) => state.productTopRated);
  const {
    products: topRatedProducts,
    page: topRatedPage,
    pages: topRatedPages,
  } = productTopRated;

  const productLatest = useSelector((state) => state.productLatest);
  const {
    products: latestProducts,
    page: latestPage,
    pages: latestPages,
  } = productLatest;

  const productSale = useSelector((state) => state.productSale);
  const {
    products: saleProducts,
    page: salePage,
    pages: salePages,
  } = productSale;

  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };

  useEffect(() => {
    switch (sortBy) {
      case 'default':
        dispatch(listProducts('', pageNumber));
        break;
      case 'rating':
        dispatch(listTopProducts(pageNumber));
        break;
      case 'sale':
        dispatch(listSaleProducts(pageNumber));
        break;
      case 'latest':
        dispatch(listLatestProducts(pageNumber));
        break;
      // case 'priceAsc':
      //   dispatch(listProducts());
      //   break;
      // case 'priceDesc':
      //   dispatch(listProducts());
      //   break;
      default:
        return;
    }
  }, [dispatch, sortBy, pageNumber, history]);

  useEffect(() => {
    switch (sortBy) {
      case 'default':
        if (allProducts.length > 0) {
          setData({ products: allProducts, page: allPage, pages: allPages });
        }
        break;
      case 'rating':
        if (topRatedProducts.length > 0) {
          setData({
            products: topRatedProducts,
            page: topRatedPage,
            pages: topRatedPages,
          });
        }
        break;
      case 'sale':
        if (saleProducts.length > 0) {
          setData({ products: saleProducts, page: salePage, pages: salePages });
        }
        break;
      case 'latest':
        if (latestProducts.length > 0) {
          setData({
            products: latestProducts,
            page: latestPage,
            pages: latestPages,
          });
        }
        break;
      // case 'priceAsc':
      //   dispatch(listProducts());
      //   break;
      // case 'priceDesc':
      //   dispatch(listProducts());
      //   break;
      default:
        return;
    }
  }, [
    history,
    sortBy,
    allPage,
    allPages,
    allProducts,
    latestPage,
    latestPages,
    latestProducts,
    salePage,
    salePages,
    saleProducts,
    topRatedPage,
    topRatedPages,
    topRatedProducts,
  ]);

  return (
    <Container style={{ marginBottom: 140, maxWidth: '100%' }}>
      <Meta title='Shop' />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            style={{ marginBottom: 24 }}
          >
            <Link color='inherit' component={RouterLink} to='/'>
              Home
            </Link>
            <Link color='textPrimary' component={RouterLink} to='/shop'>
              Shop
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ backgroundColor: '#fff' }}>
        <Grid item md={3}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Product Search
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton className={classes.searchIcon}>
              <IoSearchOutline fontSize={20} />
            </IconButton>
          </div>
          <Divider className={classes.divider} />
          <Typography variant='h6' gutterBottom className={classes.title}>
            Filter By Pricing
          </Typography>
          <Slider
            value={price}
            onChange={handlePriceChange}
            max={1000}
            color='secondary'
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
          />
          <Box
            display='flex'
            justifyContent='space-between'
            color='text.secondary'
          >
            <span>Filter</span>
            <span>{`Pricing $${price[0]} - $${price[1]}`}</span>
          </Box>
          <Divider className={classes.divider} />
          <Typography variant='h6' gutterBottom className={classes.title}>
            Categories
          </Typography>
          <Box className={classes.category} color='text.secondary'>
            <span>Clothes (20)</span>
            <span>Clothes (20)</span>
            <span>Clothes (20)</span>
            <span>Clothes (20)</span>
            <span>Clothes (20)</span>
          </Box>
          <Divider className={classes.divider} />
          <Typography variant='h6' gutterBottom className={classes.title}>
            Size
          </Typography>
          <FormControl fullWidth component='fieldset'>
            <RadioGroup className={classes.size}>
              {['s', 'm', 'l', 'xl'].map((value) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={value.toUpperCase()}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Divider className={classes.divider} />
          <Typography variant='h6' gutterBottom className={classes.title}>
            Tags
          </Typography>
          <Box className={classes.tags} color='text.secondary'>
            <Button disableElevation disableFocusRipple disableRipple>
              Shirt
              <span style={{ margin: '0 8px' }}>/</span>
            </Button>
            <Button disableElevation disableFocusRipple disableRipple>
              Shirt
              <span style={{ margin: '0 8px' }}>/</span>
            </Button>
            <Button disableElevation disableFocusRipple disableRipple>
              Shirt
            </Button>
          </Box>
        </Grid>
        <Grid item md={9}>
          <Box className={classes.topFilter}>
            <div>
              <FormControl variant='outlined' className={classes.selectBox}>
                <FormLabel>Sort by</FormLabel>
                <Select
                  onChange={(e) =>
                    history.push(`/shop?sortBy=${e.target.value}`)
                  }
                  defaultValue='default'
                >
                  <MenuItem value='default'>Default Sorting</MenuItem>
                  <MenuItem value='latest'>Lastest</MenuItem>
                  <MenuItem value='rating'>Rating</MenuItem>
                  <MenuItem value='sale'>Sale</MenuItem>
                  <MenuItem value='priceAsc'>Price: Low to High</MenuItem>
                  <MenuItem value='priceDesc'>Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex' }}>
              <span
                className={clsx(
                  classes.layoutIcon,
                  activeLayout === 3 && classes.activeLayout
                )}
                onClick={() => setActiveLayout(3)}
              >
                <BsGridFill fontSize={16} />
              </span>
              <span
                className={clsx(
                  classes.layoutIcon,
                  activeLayout === 4 && classes.activeLayout
                )}
                onClick={() => setActiveLayout(4)}
              >
                <BsGrid3X3GapFill fontSize={16} />
              </span>
            </div>
          </Box>
          <Grid container spacing={2}>
            {data.products.map((product) => (
              <Grid
                item
                sm={6}
                md={4}
                lg={activeLayout === 3 ? 4 : 3}
                key={product._id}
              >
                <ProductCard {...product} />
              </Grid>
            ))}
            <Pagination
              className={classes.pagination}
              page={data.page}
              count={data.pages}
              renderItem={(item) => {
                console.log('item', item);
                return (
                  <PaginationItem
                    component={RouterLink}
                    to={`/shop${
                      item.page === 1
                        ? ''
                        : `?sortBy=${sortBy}&pageNumber=${item.page}`
                    }`}
                    {...item}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopScreen;
