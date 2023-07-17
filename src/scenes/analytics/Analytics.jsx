import React from 'react';
import './Analytics.css'; // Import the custom CSS file for styling
import Tsc from '../scorecard/Tsc';
import Asc from '../scorecard/Asc';
import Psc from '../scorecard/Psc';

const Analytics = () => {
  return (
    <>
        <h4>this is the commit</h4>
        <Tsc/>
        <Asc/>
        <Psc/>
      
    </>
  );
};

export default Analytics;
