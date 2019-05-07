import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import PriceStrikes from './pages/PriceStrikes';
import NotFound from './pages/NotFound';
import SellingAnimals from './pages/SellingAnimals';
import NotRelatedToTheCity from './pages/NotRelatedToTheCity';
import Messages from './pages/Messages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/messages" component={Messages} />
    <Route exact path="/priceStrikes" component={PriceStrikes} />
    <Route exact path="/sellingAnimals" component={SellingAnimals} />
    <Route exact path="/notRelatedToTheCity" component={NotRelatedToTheCity} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
