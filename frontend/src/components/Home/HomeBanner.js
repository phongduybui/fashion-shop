import { Button } from '@material-ui/core';
import React from 'react';

const HomeBanner = () => {
  return (
    <div className='banner'>
      <div className='banner__inner'>
        <img
          src='https://image.freepik.com/free-photo/lovely-fashionable-girl-with-long-hairs-stylish-autumn-dress-posing_273443-4024.jpg'
          alt='banner img'
          className='banner__image' 
        ></img>
        <div className='banner__content'>
          <div className='content__wrapper'>
            <div className='content__subtitle'>Final Education</div>
            <h2 className='content__title'>
              Sandals &<br /> Flip Flops
            </h2>
            <div className='content__sale'>UP TO 70% OFF</div>
            <Button
              variant='outlined'
              color='secondary'
              className='content__button'
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>
      <div className='banner__inner'>
        <img
          src='https://image.freepik.com/free-photo/surprised-happy-girl-pointing-left-recommend-product-advertisement-make-okay-gesture_176420-20191.jpg'
          alt='banner img'
          className='banner__image'
        ></img>
        <div className='banner__content'>
          <div className='content__wrapper'>
            <span className='content__subtitle'>Final Education</span>
            <h2 className='content__title'>
              Denim &<br /> Mashmallow
            </h2>
            <span className='content__sale'>UP TO 55% OFF</span>
            <Button
              variant='outlined'
              color='secondary'
              className='content__button'
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
