import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';

const ProductReview = () => {
  return (
    <>
      <Box my={3}>
        <Typography variant='h5'>Reviews</Typography>
      </Box>
      <Paper style={{ padding: '32px 20px', margin: '24px 0' }} elevation={0}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar
              alt='Remy Sharp'
              src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Box display='flex' alignItems='center'>
              <h4
                style={{
                  margin: '0 8px 0 0',
                  textAlign: 'left',
                  display: 'inline-block',
                }}
              >
                Michel Michel
              </h4>
              <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </p>
            </Box>
            <Rating name='read-only' value={5} readOnly size='small' />
            <p style={{ textAlign: 'left', marginTop: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum.{' '}
            </p>
          </Grid>
        </Grid>
        <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar
              alt='Remy Sharp'
              src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Box display='flex' alignItems='center'>
              <h4
                style={{
                  margin: '0 8px 0 0',
                  textAlign: 'left',
                  display: 'inline-block',
                }}
              >
                Michel Michel
              </h4>
              <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </p>
            </Box>
            <Rating name='read-only' value={5} readOnly size='small' />
            <p style={{ textAlign: 'left', marginTop: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor.{' '}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProductReview;
