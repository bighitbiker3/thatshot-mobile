import React, { Component } from 'react';
import { connect } from 'react-native';

import { getQueue, getTrack, getSoundObject } from '../redux/selectors';

class Player extends Component {
  
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  queue: getQueue(state),
  track: getTrack(state),
  soundObject: getSoundObject(state)
})

export default connect(mapStateToProps)(Player)
