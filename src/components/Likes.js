import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../redux/actions/tracks';
import { getLikedTracks, getLikedHref, getUser } from '../redux/selectors';

import TrackList from './TrackList'

class Likes extends Component {
  componentWillReceiveProps(nextProps) {
    const { endpoint, queueTracks, queue, user, tracks } = this.props
    if (!tracks.length && nextProps.user) {
      this.props.fetchTracks(
        `https://api.soundcloud.com/users/${nextProps.user.soundcloud_id}/favorites/?client_id=622c5a5338becb1365fb57b6bdc97f09&limit=200&linked_partitioning=1`, 
        'likes'
      )
    }
  }
  
  render() {
    const { title, tracks, navigation } = this.props
    return (
      <TrackList navigation={navigation} tracks={tracks} />
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: getLikedTracks(state),
  user: getUser(state)
})

export default connect(mapStateToProps, { fetchTracks })(Likes)