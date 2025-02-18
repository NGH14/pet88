import { Button as AntdButton, message as antdMessage } from 'antd';

import React from 'react';

import './style.css';
const info = () => {
  antdMessage.info('This is a normal message', 1000);
};

export const Message = () => (
  <AntdButton type="primary" onClick={info}>
    Display normal message
  </AntdButton>
);
