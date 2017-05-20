import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQueue} from '../redux/selectors';

import Nav from './Nav'
import TrackList from './TrackList'


class Queue extends Component {
  
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
  tracks: getQueue(state)
})

export default connect(mapStateToProps)(Queue)