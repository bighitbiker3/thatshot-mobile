import {
  VIEW_CHANGE
} from '../constants';

const initialState = 'home'

export default (state = initialState, action) => {
  switch (action.type) {

  case VIEW_CHANGE: {
    return action.payload
  }

  default:
    return state;
  }
};
