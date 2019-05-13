import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './layout/header';
import Routes from './routes';

const Home = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Routes />
    </div>
  </BrowserRouter>
);

export default Home;
