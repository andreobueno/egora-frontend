/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import {
  Table, Button, Input, Icon,
} from 'antd';
import moment from 'moment';
import api from '../services/api';

import ModalInsertStrikeOnDb from '../components/modalInsertStrikeOnDb';
import { success, error } from '../components/modalMessages';
import { ActionButton } from './page_styles/priceStrike_Style';
import { prepareFacebookLink } from '../utils/utils';

const { Column } = Table;
const { Search } = Input;

class PriceStrikes extends Component {
  state = {
    priceStrikes: [],
    visible: false,
    facebookLink: '',
    name: '',
    btnShowAllVisibility: true,
  };

  componentDidMount() {
    this.loadPriceStrikesList();
  }

  loadPriceStrikesList = async () => {
    const response = await api.get('/priceStrikes');
    this.setState({ priceStrikes: response.data, btnShowAllVisibility: true, facebookLink: '' });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  addStrike = async () => {
    const { name } = this.state;
    const { facebookLink: facebook } = this.state;
    try {
      await api.post('/priceStrikes', { name, facebook });
      success();
    } catch {
      error();
    }
    this.setState({ visible: false });
    this.loadPriceStrikesList();
  };

  updateFacebookLink = (e) => {
    this.setState({ facebookLink: e.target.value });
  };

  searchForFacebook = async () => {
    const { facebookLink } = this.state;
    if (facebookLink !== '') {
      const linkReadyToGo = prepareFacebookLink(facebookLink);
      try {
        const response = await api.get(`/priceStrikes/${linkReadyToGo}`);
        if (response.data[0] !== null) {
          this.setState({ priceStrikes: response.data[0] });
          this.setState({ btnShowAllVisibility: false });
          return true;
        }
        this.setState({ facebookLink: linkReadyToGo });
        this.showModal();
        return false;
      } catch {
        error(
          'It was not possible search for the strikes at this moment. Please, try again later.',
        );
      }
    }
    return false;
  };

  increaseStrike = async (link) => {
    const linkCut = link.slice(25);
    try {
      const response = await api.get(`/priceStrikes/${linkCut}`);
      const { name, facebook } = response.data[0][0].member;
      const strikeNumber = response.data[1];

      if (Number(strikeNumber) < 2) {
        try {
          await api.post('/priceStrikes', { name, facebook });
          success('One strike was added to the member.');
        } catch {
          error('It was not possible to add the strike to this member. Please, try again later.');
        }
      } else {
        console.log('3 STRIKES - REMOVE THIS MEMBER!!!');
      }
    } catch {
      error('It was not possible to find the strikes for this member. Please, try again later.');
    }

    this.loadPriceStrikesList();
  };

  decreaseStrike = async (id) => {
    try {
      await api.delete(`/priceStrikes/${id}`);
      success('This strike was sucessfully removed.');
      this.loadPriceStrikesList();
    } catch {
      error('It was not possible to remove the strike to this member. Please, try again later.');
    }
  };

  render() {
    const {
      priceStrikes, visible, facebookLink, name, btnShowAllVisibility,
    } = this.state;

    return (
      <div>
        <Search
          placeholder="Type the Facebook link in here"
          onChange={this.updateFacebookLink}
          onSearch={this.searchForFacebook}
          value={facebookLink}
          enterButton
        />
        <br />
        <br />
        <Button type="primary" onClick={this.loadPriceStrikesList} disabled={btnShowAllVisibility}>
          Show All Strikes
        </Button>
        <ModalInsertStrikeOnDb
          visible={visible}
          addStrike={this.addStrike}
          closeModal={this.hideModal}
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
            facebook: `https://www.facebook.com/${priceStrike.member.facebook}`,
            created_at: moment(priceStrike.created_at).format('MM/DD/YYYY'),
          }))}
        >
          <Column title="Date" dataIndex="created_at" key="created_at" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Facebook"
            dataIndex="facebook"
            key="facebook"
            render={facebook => (
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                {facebook}
              </a>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={message => (
              <Fragment>
                <ActionButton>
                  <Button onClick={e => this.increaseStrike(message.facebook, e)}>
                    <Icon type="plus-circle" style={{ color: 'blue' }} />
                  </Button>
                </ActionButton>
                <ActionButton>
                  <Button onClick={e => this.decreaseStrike(message.key, e)}>
                    <Icon type="minus-circle" style={{ color: 'red' }} />
                  </Button>
                </ActionButton>
              </Fragment>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default PriceStrikes;
