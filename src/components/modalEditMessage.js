import React from 'react';
import { Modal, Input } from 'antd';
import PropTypes from 'prop-types';

import api from '../services/api';
import { success, error } from './modalMessages';

const { TextArea } = Input;

const modalEditMessageOnDb = async (name, description, id, closeModal, loadMessages) => {
  try {
    await api.put(`/messages/${id}`, { name, description });
    success('Message Successfully edited.');
  } catch {
    error('It was not possible to edit this message. Please, try again later.');
  }
  closeModal();
  loadMessages();
};

const ModalEditMessage = ({
  modalEditMessageVisibility,
  closeModal,
  id,
  loadMessages,
  name,
  description,
  changeName,
  changeDescription,
}) => (
  <Modal
    title="Edit Message"
    visible={modalEditMessageVisibility}
    onOk={(e) => {
      modalEditMessageOnDb(name, description, id, closeModal, loadMessages, e);
    }}
    onCancel={closeModal}
  >
    <div style={{ marginBottom: 16 }}>
      Name:
      <Input value={name} onChange={e => changeName(e.target.value)} />
    </div>
    Message:
    <TextArea rows={10} value={description} onChange={e => changeDescription(e.target.value)} />
  </Modal>
);

ModalEditMessage.defaultProps = {
  name: '',
  description: '',
  modalEditMessageVisibility: false,
  id: null,
  closeModal: () => {},
  changeName: () => {},
  changeDescription: () => {},
  loadMessages: () => {},
};

ModalEditMessage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  modalEditMessageVisibility: PropTypes.bool,
  closeModal: PropTypes.func,
  changeName: PropTypes.func,
  changeDescription: PropTypes.func,
  loadMessages: PropTypes.func,
};

export default ModalEditMessage;
