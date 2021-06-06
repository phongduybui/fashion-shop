import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import HomeCarousel from '../components/Home/HomeCarousel';
import Container from '@material-ui/core/Container';
import HomeBanner from '../components/Home/HomeBanner';
import ProductCard from '../components/Product/ProductCard';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import ProductTabs from '../components/Product/ProductTabs';
import HomeService from '../components/Home/HomeService';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
}));

const HomeScreen = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = queryString.parse(location.search);
  const productTopRated = useSelector((state) => state.productTopRated);

  const {
    loading: loadingProductTop,
    errorProductTop,
    products: productTop,
  } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <HomeCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Container maxWidth='xl'>
        <Typography
          variant='h4'
          component='h2'
          align='center'
          style={{ margin: '60px 0 30px' }}
        >
          Top Products
        </Typography>
        {loadingProductTop ? (
          <div className={classes.loading}>
            <CircularProgress color='secondary' />
          </div>
        ) : errorProductTop ? (
          <Alert severity='error'>{errorProductTop}</Alert>
        ) : (
          <>
            <Grid container spacing={3} className={classes.topProducts}>
              {productTop.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
            <HomeBanner />
            <ProductTabs />
          </>
        )}
      </Container>
      <HomeService />
    </>
  );
};

export default HomeScreen;
