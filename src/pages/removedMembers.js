/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Table, Button, Input, Icon,
} from 'antd';
import moment from 'moment';
import api from '../services/api';

import ModalInsertRemovalOnDb from '../components/modalInsertRemovalOnDb';
import { success, error } from '../components/modalMessages';
import { ActionButton } from './page_styles/removedMembers_Style';
import { prepareFacebookLink } from '../utils/utils';

const { Column } = Table;
const { Search } = Input;

class RemovedMembers extends Component {
  state = {
    removedMembers: [],
    visible: false,
    facebookLink: '',
    name: '',
    reason: '',
    btnShowAllVisibility: true,
  };

  componentDidMount() {
    this.loadRemovedMembersList();
  }

  loadRemovedMembersList = async () => {
    const response = await api.get('/removedMembers');
    this.setState({ removedMembers: response.data, btnShowAllVisibility: true, facebookLink: '' });
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

  changeReason = (value) => {
    this.setState({ reason: value });
  };

  addRemovedMember = async () => {
    const returnDate = moment()
      .add(6, 'months')
      .format('YYYY-MM-DD');
    const { name, reason, facebookLink: facebook } = this.state;

    try {
      await api.post('/removedMembers', {
        name,
        facebook,
        reason,
        returnDate,
      });
      success();
    } catch {
      error();
    }
    this.setState({ visible: false });
    this.loadRemovedMembersList();
  };

  updateFacebookLink = (e) => {
    this.setState({ facebookLink: e.target.value });
  };

  searchForFacebook = async () => {
    const { facebookLink } = this.state;
    if (facebookLink !== '') {
      const linkReadyToGo = prepareFacebookLink(facebookLink);
      try {
        const response = await api.get(`/removedMembers/${linkReadyToGo}`);
        if (response.data !== '') {
          this.setState({ removedMembers: response.data });
          this.setState({ btnShowAllVisibility: false });
        } else {
          this.setState({ facebookLink: linkReadyToGo });
          this.showModal();
        }
      } catch {
        error(
          'It was not possible search for the strikes at this moment. Please, try again later.',
        );
      }
    }
    return false;
  };

  removeRemoval = async (id) => {
    try {
      await api.delete(`/removedMembers/${id}`);
      success('This removal was sucessfully removed.');
      this.loadRemovedMembersList();
    } catch {
      error('It was not possible to remove this removal. Please, try again later.');
    }
  };

  render() {
    const {
      removedMembers, visible, facebookLink, name, btnShowAllVisibility,
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
        <Button
          type="primary"
          onClick={this.loadRemovedMembersList}
          disabled={btnShowAllVisibility}
        >
          Show All Removed Members
        </Button>
        <ModalInsertRemovalOnDb
          visible={visible}
          addRemoval={this.addRemovedMember}
          closeModal={this.hideModal}
          facebookLink={facebookLink}
          changeName={this.changeName}
          changeReason={this.changeReason}
          name={name}
        />
        <hr />
        <Table
          dataSource={removedMembers.map(removedMember => ({
            ...removedMembers,
            key: removedMember.id,
            name: removedMember.member.name,
            facebook: `https://www.facebook.com/${removedMember.member.facebook}`,
            created_at: moment(removedMember.created_at).format('MM/DD/YYYY'),
            reason: removedMember.reason,
            return_at: moment(removedMember.return_at).format('MM/DD/YYYY'),
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
          <Column title="Reason" dataIndex="reason" key="reason" />
          <Column title="End of Banishment" dataIndex="return_at" key="return_at" />
          <Column
            title="Action"
            key="action"
            render={message => (
              <ActionButton>
                <Button onClick={e => this.removeRemoval(message.key, e)}>
                  <Icon type="minus-circle" style={{ color: 'red' }} />
                </Button>
              </ActionButton>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default RemovedMembers;
