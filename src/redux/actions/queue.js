import {
  QUEUE_ADD,
  SHIFT_QUEUE,
} from '../constants';

import { playTrack } from './player';

export const addToQueue = (song) => {
  return (dispatch, getState) => {
    const { track, soundObject } = getState().player;
    if(!track && !soundObject) { 
      dispatch(playTrack(song))
    }
    return dispatch(putInQueue(song))
  }
}

const putInQueue = (track) => ({
    type: QUEUE_ADD,
    payload: { track }
});

export const shiftQueue = () => ({
  type: SHIFT_QUEUE
})