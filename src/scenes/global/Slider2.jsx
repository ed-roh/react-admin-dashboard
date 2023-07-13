import React from 'react';
import './Range-slider.css'
import RangeSlider from '../Slider/RangeSlider';

const MyCarousel = () => {
  return (
    <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="card-wrapper container-sm d-flex  justify-content-around">
          <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card-wrapper container-sm d-flex justify-content-around">
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card-wrapper container-sm d-flex justify-content-around">
          <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
            <div className="card" style={{ width: '18rem',height:'10rem',padding:'1rem' }}>
              <RangeSlider/>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MyCarousel;
