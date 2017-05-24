import {
  PLAY_SONG,
  PAUSE_SONG,
  SONG_ENDED,
  QUEUE_EMPTY,
  UPDATE_CURRENT_TIME,
  SET_TRACK_DURATION
} from '../constants';

const initialState = {
  track: null,
  soundObject: null,
  ended: false,
  playing: false,
  currentTime: null,
  duration: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PLAY_SONG: {
    if (action.payload) {
      const { track, soundObject } = action.payload
      return {
        ...state,
        track,
        soundObject,
        ended: false,
        playing: true
      }
    }
    return {
      ...state,
      playing: true
    }

  }
  case PAUSE_SONG: {
    return {
      ...state,
      playing: false
    }
  }

  case SONG_ENDED: {
    return {
      ...state,
      ended: true
    }
  }

  case QUEUE_EMPTY: {
    return initialState
  }

  case UPDATE_CURRENT_TIME: {
    return {
      ...state,
      currentTime: action.payload
    }
  }

  case SET_TRACK_DURATION: {
    return {
      ...state,
      duration: action.payload
    }
  }

  default:
    return state;
  }
};
