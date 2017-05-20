import {
  PLAY_SONG,
  PAUSE_SONG,
  SONG_ENDED
} from '../constants';

const initialState = {
  track: null,
  soundObject: null,
  ended: false,
  playing: false
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

  default:
    return state;
  }
};
