import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import api from '../services/api';

import ModalInsertStrikeOnDb from '../components/modalInsertStrikeOnDb';
import { success, error } from '../components/modalMessages';

const { Column } = Table;
const { Search } = Input;

class SellingAnimals extends Component {
  state = {
    priceStrikes: [],
    visible: false,
    facebookLink: '',
    name: '',
  };

  componentDidMount() {
    this.loadPriceStrikesList();
  }

  loadPriceStrikesList = async () => {
    const response = await api.get('/priceStrikes');
    this.setState({ priceStrikes: response.data });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  onCloseModal = () => {
    this.setState({ visible: false });
  };

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  addStrike = async () => {
    const { facebookLink, name } = this.state;
    try {
      await api.post('/priceStrikes', { name, facebookLink });
      success();
    } catch {
      error();
    }
    this.setState({ visible: false });
    this.loadPriceStrikesList();
  };

  searchForFacebook = async (e) => {
    const facebookLink = e.target.value;
    if (facebookLink !== '') {
      const response = await api.get(`/priceStrikes/${facebookLink}`);
      if (response.data !== null) {
        this.setState({ priceStrikes: response.data });
        this.loadPriceStrikesList();
      }
    }

    // this.setState({ facebookLink: e.target.value });
  };

  render() {
    const {
      priceStrikes, visible, facebookLink, name,
    } = this.state;

    return (
      <div>
        <Search
          placeholder="Type the Facebook link in here"
          enterButton
          onChange={this.searchForFacebook}
        />
        <br />
        <br />
        <Button type="primary" onClick={this.showModal}>
          Add Strike
        </Button>
        <ModalInsertStrikeOnDb
          visible={visible}
          addStrike={this.addStrike}
          closeModal={this.onCloseModal}
          facebookLink={facebookLink}
          changeName={this.changeName}
          name={name}
        />
        <hr />
        <Table
          dataSource={priceStrikes.map(priceStrike => ({
            ...priceStrikes,
            key: priceStrike.id,
            name: priceStrike.member.name,
            facebook: `http://facebook.com/${priceStrike.member.facebook}`,
            created_at: priceStrike.created_at,
            strike_number: priceStrike.strike_number,
          }))}
        >
          <Column title="Date" dataIndex="created_at" key="created_at" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Facebook" dataIndex="facebook" key="facebook" />
          <Column title="Strike Number" dataIndex="strike_number" key="strike_number" />
        </Table>
      </div>
    );
  }
}

export default SellingAnimals;
