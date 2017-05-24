import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../redux/actions/tracks';
import { getArtistTracks, getArtistNextHref } from '../redux/selectors';

import TrackList from './TrackList'


class ArtistPage extends Component {
  componentDidMount() {
    const { endpoint } = this.props.navigation.state.params
    this.props.fetchTracks(endpoint, 'artist')
  }
  
  render() {
    const { title, tracks, navigation } = this.props
    return (
      <TrackList navigation={navigation} tracks={tracks} />
    );
  }
}

ArtistPage.navigationOptions = (props) => {
  const { title } = props.navigation.state.params
  return {
    title
  }
};

const mapStateToProps = (state) => ({
  tracks: getArtistTracks(state)
})

export default connect(mapStateToProps, { fetchTracks })(ArtistPage)