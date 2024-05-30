import React from 'react';
import { GridLoader } from 'react-spinners';
import '../styles.css';

const SplashScreen = () => (
  <div className="splash-screen">
    <GridLoader color="#007bff" />
    <h1>Loading...</h1>
  </div>
);

export default SplashScreen;


