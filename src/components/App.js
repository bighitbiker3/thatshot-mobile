import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';

import { Linking, WebView } from 'react-native';

import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import { nextSong } from '../redux/actions/player'
import { socketConnected } from '../redux/actions/socket';
const io = require('socket.io-client/dist/socket.io')

const socket = io('http://localhost:3000', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', () => {
  store.dispatch(socketConnected(socket))
});

import NavigatorWrapper from './NavigatorWrapper'


const store = configureStore()
import BackgroundTimer from 'react-native-background-timer';

const intervalId = BackgroundTimer.setInterval(() => {
  const { ended } = store.getState().player;
  if (ended) {
    console.log('next song coinnnnnnn');
    store.dispatch(nextSong())
  }

}, 1000);

window.navigator.userAgent = 'ReactNative';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor='black'
          />
          <NavigatorWrapper />
        </View>
      </Provider>
    )
  }
};


