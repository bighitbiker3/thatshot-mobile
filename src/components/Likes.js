import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../redux/actions/tracks';
import { getLikedTracks, getLikedHref, getUser } from '../redux/selectors';

import Nav from './Nav'
import TrackList from './TrackList'


class Likes extends Component {
  componentDidMount() {
    const { endpoint, queueTracks, queue, user } = this.props 
    this.props.fetchTracks(
      `https://api.soundcloud.com/users/22158004/favorites/?client_id=622c5a5338becb1365fb57b6bdc97f09&linked_partitioning=1`, 
      'likes'
    )
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
  tracks: getLikedTracks(state),
  user: getUser(state)
})

export default connect(mapStateToProps, { fetchTracks })(Likes)