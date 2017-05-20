import {
  PLAY_SONG,
  SONG_ENDED,
  PAUSE_SONG
} from '../constants';
import { DeviceEventEmitter } from 'react-native'
import RNAudioStreamer from 'react-native-audio-streamer';
import MusicControl from 'react-native-music-control';

import { shiftQueue} from './queue'

const musicControlSetup = (track, dispatch) => {
  MusicControl.enableBackgroundMode(true);
  MusicControl.setNowPlaying({
    title: track.title,
    artwork: track.artwork_url || 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
    artist: track.user.username,
    genre: track.genre || 'idk',
    duration: track.duration / 1000, // (Seconds)
    color: 0xFFFFFF, // Notification Color - Android Only
  })
  MusicControl.enableControl('nextTrack', true)
  MusicControl.enableControl('previousTrack', false)
  MusicControl.on('pause', () => dispatch(pauseTrack()))
  MusicControl.on('play', () =>  dispatch(playTrack()))
  MusicControl.on('nextTrack', () => dispatch(songEnded()))
  setPlayPause(true)
}

const checkEnded = (status, dispatch) => {
  if(status === 'FINISHED') dispatch(songEnded())
}

const setPlayPause = (playing) => {
  MusicControl.enableControl('play', !playing)
  MusicControl.enableControl('pause', playing)
}

export const pauseTrack = () => {
  return (dispatch, getState) => {
    const { soundObject, playing } = getState().player;
    if (soundObject && playing) {
      soundObject.pause()
      dispatch({ type: PAUSE_SONG })
    } else {
      console.warn('trying to pause with ', { playing, soundObject })
    }
    setPlayPause(false)
  }
}

export const playTrack = (track) => {
  return (dispatch, getState) => {
    if (track) {
      RNAudioStreamer.setUrl(`${track.stream_url}?client_id=622c5a5338becb1365fb57b6bdc97f09`)
      DeviceEventEmitter.addListener('RNAudioStreamerStatusChanged', (status) => checkEnded(status, dispatch))
      musicControlSetup(track, dispatch)
      dispatch({
        type: PLAY_SONG,
        payload: {
          track,
          soundObject: RNAudioStreamer
        }
      })
    } else {
      const { soundObject, playing } = getState().player;
      if (soundObject && !playing) {
        soundObject.pause()
        dispatch({ type: PLAY_SONG })
      } else {
        console.warn('trying to play with ', { playing, soundObject })
      }
      setPlayPause(true)
    }
    RNAudioStreamer.play()
  }
}

const songEnded = () => ({
  type: SONG_ENDED
})

export const nextSong = () => {
  return (dispatch, getState) => {
    dispatch(shiftQueue())
    const { queue } = getState();
    dispatch(playTrack(queue[0]))
  }
}