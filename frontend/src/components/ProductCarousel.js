import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductCarousel = () => {
  const styles = {
    height: '100vh',
    width: '100%',
    marginBottom: 80,
  };

  const imgStyles = {
    maxHeight: '100vh',
    width: '100%',
    objectFit: 'cover !important',
  };
  return (
    <div>
      <Carousel
        centerMode
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        showArrows={true}
        style={styles}
      >
        <div>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/monigote.jpg'
            alt='a'
            style={imgStyles}
          />
        </div>

        <div>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/curly_hair_white-1.jpg'
            alt='a'
            style={imgStyles}
          />
        </div>

        <div>
          <img
            src='https://goyacdn.everthemes.com/demo-fashion/wp-content/uploads/sites/3/2020/02/curly_hair_girl-1.jpg'
            alt='a'
            style={imgStyles}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
