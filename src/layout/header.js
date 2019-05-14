import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
      <li>
        <NavLink exact to="/" activeStyle={{ background: 'tomato' }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/messages">Messages</NavLink>
      </li>
      <li>
        <NavLink to="/priceStrikes">Price Strikes</NavLink>
      </li>
      <li>
        <NavLink to="/sellingAnimals">Selling Animals</NavLink>
      </li>
      <li>
        <NavLink to="/notRelatedTotheCity">Not Related to the City</NavLink>
      </li>
      <li>
        <NavLink to="/removedMembers">Removed Members</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
