import {
  SOCKET_CONNECTED
} from '../constants';

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {

  case SOCKET_CONNECTED: {
    return action.payload
  }

  default:
    return state;
  }
};
