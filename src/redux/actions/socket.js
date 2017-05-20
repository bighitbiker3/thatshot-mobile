import {
  SOCKET_CONNECTED
} from '../constants';

export const socketConnected = (socket) => ({
  type: SOCKET_CONNECTED,
  payload: socket
})