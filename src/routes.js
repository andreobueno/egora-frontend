import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import PriceStrikes from './pages/priceStrikes';
import NotFound from './pages/notFound';
import SellingAnimals from './pages/sellingAnimals';
import NotRelatedToTheCity from './pages/notRelatedToTheCity';
import Messages from './pages/messages';

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
