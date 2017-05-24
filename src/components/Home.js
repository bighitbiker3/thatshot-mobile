import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, WebView, Linking, Text, StyleSheet } from 'react-native'
import DeepLinking from 'react-native-deep-linking';
import axios from 'axios';

import Likes from './Likes'
import Playlists from './Playlists'
import Savant from './Savant'
import Queue from './Queue'
import OnBoarding from './OnBoarding'
import Loader from './Loader'

import colors from '../lib/colors'

import { getSession } from '../redux/actions/auth'
import { getUser, getView } from '../redux/selectors'

const handleUrl = ({ url }) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      DeepLinking.evaluateUrl(url);
    }
  });
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentDidMount() {
    this.props.getSession()
    DeepLinking.addScheme('thatshot://');
    Linking.addEventListener('url', handleUrl);
    DeepLinking.addRoute('/success', (response) => {
      this.setState({ auth: true })
      this.props.getSession()
    });
  }

  render() {
    const { user, view, navigation } = this.props;
    const { auth } = this.state;
    if(!user) {
      if(!auth) {
        return (
          <WebView
            source={{uri: 'https://thatshot.audio/login/soundcloud'}}
            style={{marginTop: 20}}
            mixedContentMode='always'
          />
        );
      } else {
        return (
          <Loader />
        )
      }
    }
    if(user.created) {
      return <OnBoarding />
    }
    if (view === 'home') return <Savant title='Ugh So Hottt' navigation={navigation} />
    if (view === 'likes') return <Likes title='Likes' navigation={navigation} />
    if (view === 'queue') return <Queue title='Queue' navigation={navigation} />
    if (view === 'playlists') return <Playlists title='Queue' navigation={navigation} />
    

  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  view: getView(state)
})

export default connect(mapStateToProps, { getSession })(Home);
