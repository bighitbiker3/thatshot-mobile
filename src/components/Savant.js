import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'

import { fetchTracks } from '../redux/actions/tracks';
import { getUser, getSavantTracks } from '../redux/selectors';

import TrackList from './TrackList'

class Savant extends Component {
  componentDidMount() {
    const { tracks } = this.props
    const { id } = this.props.user
    if (!tracks.length) {
      this.props.fetchTracks(
        `https://thatshot.audio/api/songs/${id}/savantTracks`,
        'savant'
      )
    }
  }
  
  render() {
    const { tracks, title, navigation } = this.props
    return (
      <TrackList navigation={navigation} tracks={tracks || []} />
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  tracks: getSavantTracks(state) 
})

export default connect(mapStateToProps, { fetchTracks })(Savant)