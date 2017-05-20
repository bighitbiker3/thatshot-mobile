import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'

import { fetchTracks } from '../redux/actions/tracks';
import { getUser, getSavantTracks } from '../redux/selectors';

import Nav from './Nav'
import TrackList from './TrackList'

class Savant extends Component {
  componentDidMount() {
    console.log(this.props);
    const { tracks } = this.props
    const { id } = this.props.user
    if (!tracks.length) {
      this.props.fetchTracks(
        `http://localhost:3000/api/songs/${id}/savantTracks`,
        'savant'
      )
    }
  }
  
  render() {
    const { tracks, title } = this.props
    return (
      <Nav extraStyles={{container: { flex: 1 } }} navigator={this.props.navigator} title={title}>
        <TrackList navigator={this.props.navigator} tracks={tracks || []} />
      </Nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  tracks: getSavantTracks(state) 
})

export default connect(mapStateToProps, { fetchTracks })(Savant)