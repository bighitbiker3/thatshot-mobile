import {
  LIKES_FETCH_SUCCESS,
  ARTIST_FETCH_SUCCESS,
  ARTIST_CLEAR_TRACKS,
  SAVANT_FETCH_SUCCESS
} from '../constants';

const initialState = {
  likes: {
    tracks: [],
    next_href: null
  },
  artist: {
    tracks: [],
    next_href: null
  },
  savant: {
    tracks: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {

  case LIKES_FETCH_SUCCESS: {
    return {
      ...state,
      likes: {
        tracks: action.payload.collection,
        next_href: action.payload.next_href
      }
    }
  }

  case ARTIST_FETCH_SUCCESS: {
    return {
      ...state,
      artist: {
        tracks: action.payload.collection,
        next_href: action.payload.next_href
      }
    }
  }

  case ARTIST_CLEAR_TRACKS: {
    return { 
      ...state,
      artist: initialState.artist
    }
  }

  case SAVANT_FETCH_SUCCESS: {
    return {
      ...state,
      savant: {
        tracks: action.payload
      }
    }
  }

  default:
    return state;
  }
};
