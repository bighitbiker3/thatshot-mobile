import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { getQueue} from '../redux/selectors';

import TrackList from './TrackList'
import Message from './Message'

class Queue extends Component {
  
  render() {
    const { title, tracks, navigation } = this.props
    if(!tracks.length) {
      return <Message message='Go queue up some tracks!' />
    }
    return (
      <TrackList navigation={navigation} tracks={tracks} />
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: getQueue(state)
})

export default connect(mapStateToProps)(Queue)