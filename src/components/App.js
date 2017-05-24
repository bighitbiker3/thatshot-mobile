import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';

import { Linking, WebView } from 'react-native';
import { Provider } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

const io = require('socket.io-client/dist/socket.io')

import colors from '../lib/colors'

import configureStore from '../redux/store/configureStore';
import { nextSong } from '../redux/actions/player'
import { socketConnected } from '../redux/actions/socket';

const socket = io('https://thatshot.audio', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', () => {
  store.dispatch(socketConnected(socket))
});

import NavigatorWrapper from './NavigatorWrapper'


const store = configureStore()

const intervalId = BackgroundTimer.setInterval(() => {
  const { ended } = store.getState().player;
  if (ended) {
    store.dispatch(nextSong())
  }

}, 1000);
// For Socket.io?
window.navigator.userAgent = 'ReactNative';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.lightDark}
          />
          <NavigatorWrapper />
          
        </View>
      </Provider>
    )
  }
};


