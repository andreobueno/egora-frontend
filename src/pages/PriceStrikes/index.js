import React, { Component } from 'react';
import { Table } from 'antd';
import api from '../../services/api';

const { Column } = Table;

class PriceStrikes extends Component {
  state = {
    members: [],
  };

  componentDidMount() {
    this.loadMembersList();
  }

  loadMembersList = async () => {
    const response = await api.get('/members');
    this.setState({ members: response.data });
  };

  render() {
    const { members } = this.state;

    return (
      <div>
        <Table dataSource={members.map(member => ({ ...member, key: member.id }))}>
          <Column title="Date" dataIndex="created_at" key="created_at" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Facebook" dataIndex="facebook" key="facebook" />
        </Table>
        ,
      </div>
    );
  }
}

export default PriceStrikes;
