import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-wrapper">
      {[...Array(10)].map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="animated-banner">
        <div className="animated-content">
          {/* <h2><b>BankerSync</b></h2> */}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;