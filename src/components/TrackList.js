import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import Nav from './Nav';
import Track from './Track';

import { getQueue } from '../redux/selectors';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      nextPage: null
    }
    this.makeTracks = this.makeTracks.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);

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

  makeTracks(track, i) {
    return (
      <Track key={i} playTrack={this.changeTrack} track={track} navigator={this.props.navigator} />
    )
  }
  
  // handleScroll(e) {
  //   const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
  //   if(contentOffset.y > (contentSize.height - layoutMeasurement.height*2)) {
  //     this.loadMoreTracks()
  //   }
  // }

  
  render() {
    const { tracks } = this.props
    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={10}
        contentContainerStyle={{paddingTop: '15%'}}
        style={{height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'black'}}
      >
        {tracks.map(this.makeTracks)}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  queue: getQueue(state)
})

export default connect(mapStateToProps)(TrackList);