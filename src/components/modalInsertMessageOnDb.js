import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import PropTypes from 'prop-types';

import api from '../services/api';
import { success, error } from './modalMessages';

const { TextArea } = Input;

class ModalInsertMessageOnDb extends Component {
  static defaultProps = {
    modalAddMessageVisibility: false,
    closeModal: () => {},
    loadMessages: () => {},
  };

  state = {
    name: '',
    description: '',
  };

  modalInsertMessageOnDb = async (closeModal, loadMessages) => {
    const { name, description } = this.state;
    try {
      await api.post('/messages', { name, description });
      success('Message Successfully inserted on DB');
    } catch {
      error('It was not possible to add this message. Please, try again later.');
    }
    closeModal();
    loadMessages();
  };

  render() {
    const { name, description } = this.state;
    const { modalAddMessageVisibility, closeModal, loadMessages } = this.props;

    return (
      <Modal
        title="Add new Message"
        visible={modalAddMessageVisibility}
        onOk={(e) => {
          this.modalInsertMessageOnDb(closeModal, loadMessages, e);
        }}
        onCancel={closeModal}
      >
        <div style={{ marginBottom: 16 }}>
          Name:
          <Input value={name} onChange={e => this.setState({ name: e.target.value })} />
        </div>
        Message:
        <TextArea
          rows={10}
          value={description}
          onChange={e => this.setState({ description: e.target.value })}
        />
      </Modal>
    );
  }
}

ModalInsertMessageOnDb.propTypes = {
  modalAddMessageVisibility: PropTypes.bool,
  closeModal: PropTypes.func,
  loadMessages: PropTypes.func,
};

export default ModalInsertMessageOnDb;
