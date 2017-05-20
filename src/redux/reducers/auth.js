import {
  USER_FETCH_SUCCESS
} from '../constants';

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {

  case USER_FETCH_SUCCESS: {
    return {
      ...state,
      user: action.payload
    }
  }

  default:
    return state;
  }
};
