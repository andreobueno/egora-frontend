import React, { Component } from 'react';

import { Modal, Input } from 'antd';

class ModalInsertOnDb extends Component {
  state = {
    confirmLoading: false,
  };

  render() {
    const { confirmLoading } = this.state;
    const {
      visible, closeModal, insertData, facebookLink,
    } = this.props;

    return (
      <Modal
        title="Add new strike"
        visible={visible}
        onOk={insertData}
        confirmLoading={confirmLoading}
        onCancel={closeModal}
      >
        <div style={{ marginBottom: 16 }}>
          Name:
          <Input />
        </div>
        Facebook:
        <Input value={facebookLink} />
      </Modal>
    );
  }
}

export default ModalInsertOnDb;
