import { Modal } from 'antd';

export function success() {
  Modal.success({
    title: 'SUCCESS',
    content: 'Data was successfully inserted!',
  });
}

export function error() {
  Modal.error({
    title: 'ERROR',
    content: 'Error inserting data. Please try again later.',
  });
}
