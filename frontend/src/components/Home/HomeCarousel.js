import React from 'react';
import Link from '@material-ui/core/Link';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {
  return (
    <div>
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        emulateTouch
        showThumbs={false}
        showIndicators
        showStatus={false}
        showArrows
        animationHandler='fade'
      >
        <div className='carousel__slide'>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/monigote.jpg'
            alt='a'
            className='carousel__img'
          />
          <div className='carousel__banner carousel__banner--left'>
            <div className='banner__subtitle'>SUMMER '21</div>
            <h2 className='banner__title'>Night Summer Dresses</h2>
            <Link href='#' className='banner__link'>
              Shop Now
            </Link>
          </div>
        </div>

        <div className='carousel__slide'>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/curly_hair_white-1.jpg'
            alt='a'
            className='carousel__img'
          />
          <div className='carousel__banner carousel__banner--right'>
            <div className='banner__subtitle'>SUMMER '21</div>
            <h2 className='banner__title'>Night Summer Dresses</h2>
            <Link href='#' className='banner__link'>
              Shop Now
            </Link>
          </div>
        </div>

        <div className='carousel__slide'>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/curly_hair_girl-1.jpg'
            alt='a'
            className='carousel__img'
          />
          <div className='carousel__banner carousel__banner--left'>
            <div className='banner__subtitle'>SUMMER '21</div>
            <h2 className='banner__title'>Night Summer Dresses</h2>
            <Link href='#' className='banner__link'>
              Shop Now
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
