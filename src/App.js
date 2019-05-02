import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './layout/Header';
import Routes from './routes';

class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
