import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, WebView, Linking, Text } from 'react-native'
import DeepLinking from 'react-native-deep-linking';
import axios from 'axios';

import Likes from './Likes'
import Savant from './Savant'
import OnBoarding from './OnBoarding'

import { getSession } from '../redux/actions/auth'
import { getUser } from '../redux/selectors'

const handleUrl = ({ url }) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      console.log('supported url', url);
      DeepLinking.evaluateUrl(url);
    }
  });
};

class Home extends Component {
  componentDidMount() {
    this.props.getSession()
    DeepLinking.addScheme('thatshot://');
    Linking.addEventListener('url', handleUrl);
    DeepLinking.addRoute('/success', (response) => {
      console.log(response);
      this.setState({auth: true})
      
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log(url, 'urlllllll');
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { user } = this.props;

    return (
      <Likes
      title='Your Likes'
      navigator={this.props.navigator}
    />
    )

  }
}

const mapStateToProps = (state) => ({
  user: getUser(state)
})

export default connect(mapStateToProps, { getSession })(Home);
