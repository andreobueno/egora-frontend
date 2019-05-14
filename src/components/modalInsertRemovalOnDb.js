import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Input, Select } from 'antd';

const { Option } = Select;

const ModalInsertRemovalOnDb = ({
  visible,
  closeModal,
  addRemoval,
  facebookLink,
  changeName,
  changeReason,
  name,
}) => (
  <Modal title="Removing Member" visible={visible} onOk={addRemoval} onCancel={closeModal}>
    <div style={{ marginBottom: 16 }}>
      Name:
      <Input value={name} onChange={changeName} />
    </div>
    <div style={{ marginBottom: 16 }}>
      Facebook:
      <Input value={facebookLink} />
    </div>
    <div>
      Reason:
      <br />
      <Select onChange={changeReason} style={{ width: 300 }} placeholder="Select a reason">
        <Option value="3 Price Strikes">3 Price Strikes</Option>
        <Option value="Outsider Selling products">Outsider Selling products</Option>
        <Option value="Outsider Posting Random Things">Outsider Posting Random Things</Option>
      </Select>
    </div>
  </Modal>
);

ModalInsertRemovalOnDb.defaultProps = {
  visible: false,
  closeModal: () => {},
  addRemoval: () => {},
  changeName: () => {},
  changeReason: () => {},
  facebookLink: '',
  name: '',
};

ModalInsertRemovalOnDb.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  addRemoval: PropTypes.func,
  changeName: PropTypes.func,
  changeReason: PropTypes.func,
  facebookLink: PropTypes.string,
  name: PropTypes.string,
};

export default ModalInsertRemovalOnDb;
