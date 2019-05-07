import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import api from '../../services/api';

import ModalInsertMessageOnDb from '../../components/ModalInsertMessageOnDb';

const { Column } = Table;

class Messages extends Component {
  state = {
    messages: [],
    visible: false,
  };

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = async () => {
    const response = await api.get('/messages');
    this.setState({ messages: response.data });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  modalOnCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { messages, visible } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Message
        </Button>
        <ModalInsertMessageOnDb
          visible={visible}
          closeModal={this.modalOnCancel}
          loadMessages={this.loadMessages}
        />
        <hr />
        <Table
          dataSource={messages.map(message => ({
            ...messages,
            key: message.id,
            name: message.name,
            description: message.description,
          }))}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Description" dataIndex="description" key="description" />
          <Column
            title="Action"
            key="action"
            render={text => (
              <CopyToClipboard text={text.description}>
                <Button>
                  <Icon type="copy" />
                </Button>
              </CopyToClipboard>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default Messages;
