import axios from 'axios';

import {
  USER_FETCH_SUCCESS
} from '../constants'

import { savantTracksReceived } from './tracks'

export const getSession = () => {
  return function (dispatch, getState) {
    console.log('getting sessionnnn');
    axios.get('https://thatshot.audio/session')
    .then(res => res.data)
    .then(data => {
      console.log('dataaaaaa', data);
      // if (data.created) dispatch(openHeader())
      if (data.user) {
        data.user.created = data.created
        console.log('gonna fire user fetch success');
        dispatch(userFetchSuccess(data.user))
      }
      return data
    })
    .catch(err => {
      console.log(err.status, 'errr getting session');
    })
  }
}

export const startOnboarding = (id, soundcloud_id) => {
  return (dispatch, getState) => {
    const { socket } = getState()
    if(!socket) return console.log('NO SOKCET CONN????');
    console.log('hitting onboarding');

    axios.post(`https://thatshot.audio/api/users/${soundcloud_id}/savants`) // eslint-disable-line camelcase
    
    socket.on('doneGettingSavants', () => {
      console.log('done getting savants', id, soundcloud_id)
      return axios.post(`https://thatshot.audio/api/songs/${id}/savantTracks`)
    })

    socket.on('doneCreateSavantTracks', () => {
      axios.get(`https://thatshot.audio/api/songs/${id}/savantTracks`)
      .then(res => res.data)
      .then(songs => {
        dispatch(savantTracksReceived(songs))
      })
    })
    socket.on('error', (err) => {
      console.log('THERE WAS AN ERRPR', err);
    })
  }
}

export const userFetchSuccess = (user) => ({
  type: USER_FETCH_SUCCESS,
  payload: user
})