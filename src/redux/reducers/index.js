import { combineReducers } from 'redux';
import player from './player';
import queue from './queue';
import tracks from './tracks';
import auth from './auth';
import socket from './socket';

export default combineReducers({
  player,
  queue,
  tracks,
  auth,
  socket
});
