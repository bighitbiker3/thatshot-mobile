import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, StyleSheet } from 'react-native';
import axios from 'axios';

import Track from './Track';

import { getQueue } from '../redux/selectors';
import colors from '../lib/colors'

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tracks: this.ds.cloneWithRows([]),
      nextPage: null
    }
    this.makeTracks = this.makeTracks.bind(this);
    this.makeSeparator = this.makeSeparator.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(nextProps) {
    this.setState({tracks: this.ds.cloneWithRows(this.props.tracks)})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tracks !== this.props.tracks) {
      this.setState({tracks: this.ds.cloneWithRows(nextProps.tracks)})
    }
  }
  
  
  
  loadMoreTracks() {
    const { nextPage, likes } = this.state;
    if(nextPage) {
      axios.get(nextPage)
      .then(res => res.data)
      .then(data => {
        const newCollection = [...likes, ...data.collection ]
        this.setState({likes: newCollection, nextPage: data.next_href})
      })
    }
  }

  makeTracks(track) {
    return (
      <Track playTrack={this.changeTrack} track={track} navigation={this.props.navigation} />
    )
  }

  makeSeparator() {
    return <View style={{ width: '100%', height: 1, backgroundColor: 'transparent' }} />
  }
  
  // handleScroll(e) {
  //   const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
  //   if(contentOffset.y > (contentSize.height - layoutMeasurement.height*2)) {
  //     this.loadMoreTracks()
  //   }
  // }

  
  render() {
    const { tracks } = this.state
    return (
      <ListView
        onScroll={this.handleScroll}
        scrollEventThrottle={10}
        contentContainerStyle={{paddingTop: 10}}
        style={{height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: colors.white}}
        dataSource={tracks}
        removeClippedSubviews={false}
        renderSeparator={this.makeSeparator}
        renderRow={this.makeTracks}
        enableEmptySections={true}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  queue: getQueue(state)
})

export default connect(mapStateToProps)(TrackList);