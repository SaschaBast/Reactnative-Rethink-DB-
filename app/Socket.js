import React from 'react';
import config from './config';
import './config/userAgent';

import io from 'socket.io-client/socket.io';

let socket;

export const connect = () => {
  socket = io(config.socketUrl, {jsonp: false, transports: ['websocket']});
  return socket;
};

socket = connect();

export default socket;
