import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import RemovalFormComponent from './removalForm';

const ModalInsertRemovalOnDb = ({
  visible,
  closeModal,
  addRemoval,
  facebookLink,
  changeName,
  changeReason,
}) => (
  <Modal title="Removing Member" visible={visible} footer={false} onCancel={closeModal}>
    <RemovalFormComponent
      facebookLink={facebookLink}
      addRemoval={addRemoval}
      changeName={changeName}
      changeReason={changeReason}
    />
  </Modal>
);

ModalInsertRemovalOnDb.defaultProps = {
  visible: false,
  closeModal: () => {},
  addRemoval: () => {},
  changeName: () => {},
  changeReason: () => {},
  facebookLink: '',
};

ModalInsertRemovalOnDb.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  addRemoval: PropTypes.func,
  changeName: PropTypes.func,
  changeReason: PropTypes.func,
  facebookLink: PropTypes.string,
};

export default ModalInsertRemovalOnDb;
