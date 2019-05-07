import React, { Component } from 'react';

import { Modal, Input } from 'antd';

class ModalInsertStrikeOnDb extends Component {
  state = {
    confirmLoading: false,
    name: '',
  };

  render() {
    const { confirmLoading, name } = this.state;
    const {
      visible, closeModal, insertData, facebookLink,
    } = this.props;

    return (
      <Modal
        title="Add new strike"
        visible={visible}
        onOk={() => {
          insertData(name);
        }}
        confirmLoading={confirmLoading}
        onCancel={closeModal}
      >
        <div style={{ marginBottom: 16 }}>
          Name:
          <Input value={name} onChange={e => this.setState({ name: e.target.value })} />
        </div>
        Facebook:
        <Input value={facebookLink} />
      </Modal>
    );
  }
}

export default ModalInsertStrikeOnDb;
