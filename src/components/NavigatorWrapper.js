import React, { Component } from 'react';
import { Navigator, View, TouchableOpacity } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../lib/colors'

import Home from './Home';
import Likes from './Likes'
import Playlists from './Playlists'
import Queue from './Queue'
import ArtistPage from './ArtistPage'
import Player from './Player';


// Router Stack
const makeStack = (Screen, name) => StackNavigator({
  [name]: {
    screen: Screen,
    navigationOptions: ({navigation}) => ({
      title: name,
    })
  },
  Artist: {
    path: 'artist/:name',
    screen: ArtistPage,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
    })
  }
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: 'black',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
    }
  }
});

const TabNav = TabNavigator({
  Home: {
    screen: makeStack(Home, 'So Hot'),
    path: '/',
    navigationOptions: {
      tabBarLabel: 'So Hot',
      tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'md-flame'}
            size={26}
            style={{ color: tintColor }}
          />
        )
    }
  },
  Likes: {
    screen: makeStack(Likes, 'Likes'),
    path: '/likes',
    navigationOptions: {
    tabBarLabel: 'Likes',
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={'md-heart'}
          size={26}
          style={{ color: tintColor }}
        />
      )
  }
  },
  Playlists: {
    screen: makeStack(Playlists, 'Playlists'),
    path: '/playlists',
    navigationOptions: {
    tabBarLabel: 'Playlists',
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={'md-heart'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Queue: {
    screen: makeStack(Queue, 'Queue'),
    path: '/queue',
    navigationOptions: {
    tabBarLabel: 'Queue',
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={'md-albums'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: 'black',
    },
    activeTintColor: colors.main,
    inactiveTintColor: 'white'
  }
})


class NavigatorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayer: false
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabNav />
        <Player />
      </View>
    );
  }
}

export default NavigatorWrapper;
