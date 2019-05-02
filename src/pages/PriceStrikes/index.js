import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import api from '../../services/api';

import ModalInsertOnDb from '../../components/ModalInsertOnDb';
import { error, success } from '../../components/ModalMessages';

const { Column } = Table;
const { Search } = Input;

class PriceStrikes extends Component {
  state = {
    members: [],
    priceStrikes: [],
    visible: false,
    sapato: false,
    facebookLink: '',
    priceStrikeSearchResult: [],
  };

  componentDidMount() {
    //    this.loadMembersList();
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

  modalInsertOnDbCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({ visible: false });
  };

  insertPriceStrikeOnDb = async () => {
    //  const data =
    const response = await api.get('/priceStrikes');
    this.setState({ priceStrikes: response.data });
  };

  modalInsertOnDbInsertion = () => {
    if (this.state.sapato) success();
    else error();
    this.setState({ visible: false });
  };

  setFacebookLink = (e) => {
    this.setState({ facebookLink: e.target.value });
  };

  searchForFacebook = async (link) => {
    const response = await api.get(`/priceStrikes/${link}`);
    this.setState({ priceStrikeSearchResult: response.data });
    if (response.data.length > 0) console.log('I FOUND IT!!!');
    else console.log('THERE IS NO ONE!!!');
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
        <ModalInsertOnDb
          visible={visible}
          insertData={this.modalInsertOnDbInsertion}
          closeModal={this.modalInsertOnDbCancel}
          facebookLink={facebookLink}
        />
        <hr />
        <Table
          dataSource={priceStrikes.map(priceStrike => ({
            ...priceStrikes,
            key: priceStrike.id,
            name: priceStrike.member.name,
            facebook: priceStrike.member.facebook,
            created_at: priceStrike.created_at,
            strikeNumber: priceStrike.strike_number,
          }))}
        >
          <Column title="Date" dataIndex="created_at" key="created_at" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Facebook" dataIndex="facebook" key="facebook" />
          <Column title="Strike Number" dataIndex="strikeNumber" key="strikeNumber" />
        </Table>
      </div>
    );
  }
}

export default PriceStrikes;
