import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

const Modal3StrikesToRemove = ({ visible, closeModal, addRemoval }) => (
  <Modal
    title="Third Strike - This member will be removed!"
    visible={visible}
    onOk={addRemoval}
    onCancel={closeModal}
    okText="Add Strike"
    cancelText="Cancel"
  >
    <p>
      If you click on Add Strike, a new strike will be added to this member and s/he will be removed
      from the group. Do you want to continue?
    </p>
  </Modal>
);

Modal3StrikesToRemove.defaultProps = {
  visible: false,
  closeModal: () => {},
  addRemoval: () => {},
};

Modal3StrikesToRemove.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  addRemoval: PropTypes.func,
};

export default Modal3StrikesToRemove;
