import React, { Component } from 'react';
import { Input, Button } from 'antd';

// import { Container } from './styles';

const MembersStrikeList = ({ data }) => (
  <ul>
    {data.map(member => (
      <li key={member.id}>{member.name}</li>
    ))}
  </ul>
);
export default MembersStrikeList;
