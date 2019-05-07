import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import api from '../../services/api';

import ModalInsertStrikeOnDb from '../../components/ModalInsertStrikeOnDb';
import { success, error } from '../../components/ModalMessages';

const { Column } = Table;
const { Search } = Input;

class PriceStrikes extends Component {
  state = {
    priceStrikes: [],
    visible: false,
    facebookLink: '',
  };

  componentDidMount() {
    this.loadPriceStrikesList();
  }

  //  loadMembersList = async () => {
  //    const response = await api.get('/members');
  //    this.setState({ members: response.data });
  //  };

  loadPriceStrikesList = async () => {
    const response = await api.get('/priceStrikes');
    this.setState({ priceStrikes: response.data });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  modalOnCancel = () => {
    this.setState({ visible: false });
  };

  modalInsertOnDbInsertion = async (name) => {
    const { facebookLink } = this.state;
    try {
      await api.post('/priceStrikes', { name, facebookLink });
      success();
    } catch {
      error();
    }

    // if (this.searchForFacebook()) {
    //   console.log('TRUE!!!');
    //   success();
    // } else error();
    this.setState({ visible: false });
    this.loadPriceStrikesList();
  };

  setFacebookLink = (e) => {
    this.setState({ facebookLink: e.target.value });
  };

  searchForFacebook = async (link) => {
    const response = await api.get(`/priceStrikes/${link}`);
    this.setState({ priceStrikeSearchResult: response.data });
    if (response.data.length > 0) {
      console.log('I FOUND IT!!!');
      return true;
    }
    console.log('THERE IS NO ONE!!!');
    return false;
  };

  render() {
    const { priceStrikes, visible, facebookLink } = this.state;

    return (
      <div>
        <Search
          placeholder="Type the Facebook link in here"
          enterButton
          onSearch={value => this.searchForFacebook(value)}
          onKeyUp={e => this.setFacebookLink(e)}
        />
        <br />
        <br />
        <Button type="primary" onClick={this.showModal}>
          Add Strike
        </Button>
        <ModalInsertStrikeOnDb
          visible={visible}
          insertData={this.modalInsertOnDbInsertion}
          closeModal={this.modalOnCancel}
          facebookLink={facebookLink}
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

export default PriceStrikes;
