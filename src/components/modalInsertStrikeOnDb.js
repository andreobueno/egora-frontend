import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Input } from 'antd';

const ModalInsertStrikeOnDb = ({
  visible,
  closeModal,
  addStrike,
  facebookLink,
  changeName,
  name,
}) => (
  <Modal title="Add new strike" visible={visible} onOk={addStrike} onCancel={closeModal}>
    <div style={{ marginBottom: 16 }}>
      Name:
      <Input value={name} onChange={changeName} />
    </div>
    Facebook:
    <Input value={facebookLink} />
  </Modal>
);

ModalInsertStrikeOnDb.defaultProps = {
  visible: false,
  closeModal: () => {},
  addStrike: () => {},
  facebookLink: '',
  changeName: () => {},
  name: '',
};

ModalInsertStrikeOnDb.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  addStrike: PropTypes.func,
  facebookLink: PropTypes.string,
  changeName: PropTypes.func,
  name: PropTypes.string,
};

export default ModalInsertStrikeOnDb;
