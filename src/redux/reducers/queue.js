import {
  QUEUE_ADD,
  QUEUE_DELETE,
  QUEUE_MOVE,
  SHIFT_QUEUE
} from '../constants';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {

  case QUEUE_ADD: {
    const { track } = action.payload
    const newArray = state.slice();
    newArray.push(track);
    
    return newArray;
  }

  case SHIFT_QUEUE: {
    const newArray = state.slice()
    newArray.shift()
    return newArray;
  }

  default:
    return state;
  }
};
