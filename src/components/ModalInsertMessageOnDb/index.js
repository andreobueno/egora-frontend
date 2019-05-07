import React, { Component } from 'react';
import { Modal, Input } from 'antd';

import api from '../../services/api';
import { success, error } from '../ModalMessages';

const { TextArea } = Input;

class ModalInsertMessageOnDb extends Component {
  state = {
    confirmLoading: false,
    name: '',
    description: '',
  };

  modalInsertMessageOnDb = async (closeModal, loadMessages) => {
    console.log('IM HERE');
    const { name, description } = this.state;
    try {
      await api.post('/messages', { name, description });
      success();
    } catch {
      error();
    }
    closeModal();
    loadMessages();
  };

  render() {
    const { confirmLoading, name, description } = this.state;
    const { visible, closeModal, loadMessages } = this.props;

    return (
      <Modal
        title="Add new Message"
        visible={visible}
        onOk={(e) => {
          this.modalInsertMessageOnDb(closeModal, loadMessages, e);
        }}
        confirmLoading={confirmLoading}
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

export default ModalInsertMessageOnDb;
