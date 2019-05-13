import React, { Component, Fragment } from 'react';
import { Table, Button, Icon } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import api from '../services/api';

import ModalInsertMessageOnDb from '../components/modalInsertMessageOnDb';
import { success, error } from '../components/modalMessages';
import ModalEditMessage from '../components/modalEditMessage';
import { ActionButton } from './page_styles/messages_Style';

const { Column } = Table;

class Messages extends Component {
  state = {
    messages: [],
    modalAddMessageVisibility: false,
    modalEditMessageVisibility: false,
    name: '',
    description: '',
    id: null,
  };

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = async () => {
    const response = await api.get('/messages');
    this.setState({ messages: response.data });
  };

  showAddModal = () => {
    this.setState({ modalAddMessageVisibility: true });
  };

  onCloseAddModal = () => {
    this.setState({ modalAddMessageVisibility: false });
  };

  showEditModal = () => {
    this.setState({ modalEditMessageVisibility: true });
  };

  onCloseEditModal = () => {
    this.setState({ modalEditMessageVisibility: false });
  };

  changeName = (name) => {
    this.setState({ name });
  };

  changeDescription = (description) => {
    this.setState({ description });
  };

  deleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      success('Message successfully deleted from DB');
    } catch {
      error('It was not possible to delete this message. Please, try again later.');
    }
    this.loadMessages();
  };

  editMessage = (name, description, id) => {
    this.setState({ name, description, id });
    this.showEditModal();
  };

  render() {
    const {
      messages,
      modalAddMessageVisibility,
      modalEditMessageVisibility,
      name,
      description,
      id,
    } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showAddModal}>
          Add Message
        </Button>
        <ModalInsertMessageOnDb
          modalAddMessageVisibility={modalAddMessageVisibility}
          closeModal={this.onCloseAddModal}
          loadMessages={this.loadMessages}
        />
        <ModalEditMessage
          modalEditMessageVisibility={modalEditMessageVisibility}
          closeModal={this.onCloseEditModal}
          loadMessages={this.loadMessages}
          name={name}
          description={description}
          id={id}
          changeName={this.changeName}
          changeDescription={this.changeDescription}
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
            render={message => (
              <Fragment>
                <div>
                  <CopyToClipboard text={message.description}>
                    <Button>
                      <Icon type="copy" style={{ color: '#1890ff' }} />
                    </Button>
                  </CopyToClipboard>
                </div>
                <ActionButton>
                  <Button
                    onClick={e => this.editMessage(message.name, message.description, message.key, e)
                    }
                  >
                    <Icon type="edit" />
                  </Button>
                </ActionButton>
                <ActionButton>
                  <Button onClick={e => this.deleteMessage(message.key, e)}>
                    <Icon type="delete" style={{ color: 'red' }} />
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

export default Messages;
