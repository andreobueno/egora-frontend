/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import {
  Table, Button, Input, Icon,
} from 'antd';
import moment from 'moment';
import api from '../services/api';

import ModalInsertStrikeOnDb from '../components/ModalInsertStrikeOnDb';
import { success, error } from '../components/modalMessages';
import Modal3StrikesToRemove from '../components/Modal3StrikesToRemove';
import RemovalFor3StrikesMessage from '../components/RemovalFor3StrikesMessage';
import { ActionButton } from './page_styles/priceStrike_Style';
import { prepareFacebookLink } from '../utils/utils';

const { Column } = Table;
const { Search } = Input;

class PriceStrikes extends Component {
  state = {
    priceStrikes: [],
    addStrikeVisible: false,
    threeStrikeModalvisible: false,
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

  loadPriceStrikesListAfterIncrease = async () => {
    const response = await api.get('/priceStrikes');
    this.setState({ priceStrikes: response.data, btnShowAllVisibility: true });
  };

  showAddStrikeModal = () => {
    this.setState({ addStrikeVisible: true });
  };

  show3StrikeRemoval = () => {
    this.setState({ threeStrikeModalvisible: true });
  };

  hideAddStrikeModal = () => {
    this.setState({ addStrikeVisible: false });
  };

  hide3StrikeRemoval = () => {
    this.setState({ threeStrikeModalvisible: false });
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
    this.setState({ addStrikeVisible: false });
    this.loadPriceStrikesList();
  };

  addRemoval = async () => {
    const returnDate = moment()
      .add(6, 'months')
      .format('YYYY-MM-DD');
    const { name, facebookLink } = this.state;
    const reason = '3 Price Strikes';
    try {
      await api.post('/priceStrikes', { name, facebook: facebookLink });
      await api.post('/removedMembers', {
        name,
        facebook: facebookLink,
        reason,
        return_at: returnDate,
      });
      success(<RemovalFor3StrikesMessage state={this.state} returnDate={returnDate} />);
    } catch {
      error(`It was not possible to add a new strike for ${name}. Please, try again later.`);
    }
    this.setState({ threeStrikeModalvisible: false });
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
        this.showAddStrikeModal();
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
      this.setState({ name, facebookLink: facebook });
      const strikeNumber = response.data[1];

      if (Number(strikeNumber) < 2) {
        try {
          await api.post('/priceStrikes', { name, facebook });
          success('One strike was added to the member.');
        } catch {
          error('It was not possible to add the strike to this member. Please, try again later.');
        }
      } else {
        this.show3StrikeRemoval();
      }
    } catch {
      error('It was not possible to find the strikes for this member. Please, try again later.');
    }

    this.loadPriceStrikesListAfterIncrease();
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
      priceStrikes,
      addStrikeVisible,
      threeStrikeModalvisible,
      facebookLink,
      name,
      btnShowAllVisibility,
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
          visible={addStrikeVisible}
          addStrike={this.addStrike}
          closeModal={this.hideAddStrikeModal}
          facebookLink={facebookLink}
          changeName={this.changeName}
          name={name}
        />
        <Modal3StrikesToRemove
          visible={threeStrikeModalvisible}
          addRemoval={this.addRemoval}
          closeModal={this.hide3StrikeRemoval}
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
