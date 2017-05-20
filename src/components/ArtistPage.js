import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../redux/actions/tracks';
import { getArtistTracks, getArtistNextHref } from '../redux/selectors';

import Nav from './Nav'
import TrackList from './TrackList'


class ArtistPage extends Component {
  componentDidMount() {
    const { endpoint, queueTracks, queue } = this.props 
    this.props.fetchTracks(endpoint, 'artist')
  }
  
  render() {
    const { title, tracks } = this.props
    return (
      <Nav extraStyles={{container: { flex: 1 } }} navigator={this.props.navigator} title={title}>
        <TrackList navigator={this.props.navigator} tracks={tracks} />
      </Nav>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: getArtistTracks(state)
})

export default connect(mapStateToProps, { fetchTracks })(ArtistPage)