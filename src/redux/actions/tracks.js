import axios from 'axios';

import {
  LIKES_FETCH_SUCCESS,
  ARTIST_FETCH_SUCCESS,
  ARTIST_CLEAR_TRACKS,
  SAVANT_FETCH_SUCCESS,
  PLAYLIST_FETCH_SUCCESS
} from '../constants';

const getFetchType = (page) => {
  if (page === 'likes') return LIKES_FETCH_SUCCESS
  if (page === 'artist') return ARTIST_FETCH_SUCCESS
  if (page === 'savant') return SAVANT_FETCH_SUCCESS
  if (page === 'playlists') return PLAYLIST_FETCH_SUCCESS
}

export const fetchTracks = (endpoint, page) => {
  return (dispatch, getState) => {
    dispatch({
      type: ARTIST_CLEAR_TRACKS
    })
    axios.get(endpoint)
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: getFetchType(page),
        payload: data
      })
    })
  }
}

export const savantTracksReceied = (songs) => ({
  type: SAVANT_FETCH_SUCCESS,
  payload: songs
})