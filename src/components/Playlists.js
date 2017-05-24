import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../redux/actions/tracks';
import { getPlaylists, getPlaylistsNextHref, getUser } from '../redux/selectors';

import TrackList from './TrackList'
import Message from './Message'

class Playlists extends Component {
  componentWillReceiveProps(nextProps) {
    const { endpoint, queueTracks, queue, user, playlists } = this.props 
    if (!playlists.length && nextProps.user) {
      this.props.fetchTracks(
        `https://api.soundcloud.com/users/${nextProps.user.soundcloud_id}/playlists/?client_id=622c5a5338becb1365fb57b6bdc97f09&limit=200&linked_partitioning=1`, 
        'playlists'
      )
    }
  }
  
  render() {
    const { title, playlists, navigation } = this.props
    if(!playlists.length) {
      return <Message message='No playlists found :(' />
    }
    return (
      <TrackList navigation={navigation} tracks={playlists.length && playlists[0].tracks} />
    );
  }
}

const mapStateToProps = (state) => ({
  playlists: getPlaylists(state),
  user: getUser(state)
})

export default connect(mapStateToProps, { fetchTracks })(Playlists)