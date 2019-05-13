import { Modal } from 'antd';

export function success(content) {
  Modal.success({
    title: 'SUCCESS',
    content,
  });
}

export function error(content) {
  Modal.error({
    title: 'ERROR',
    content,
  });
}
