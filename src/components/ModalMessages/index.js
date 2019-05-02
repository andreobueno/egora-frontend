import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

export function success() {
  Modal.success({
    title: 'SUCCESS',
    content: 'Data was successfully inserted!',
  });
}

export function error() {
  Modal.error({
    title: 'ERROR',
    content: 'Error inserting data.',
  });
}

export function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}
