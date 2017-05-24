import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native' 

import { startOnboarding } from '../redux/actions/auth';
import { getUser } from '../redux/selectors'

import Loader from './Loader'

class OnBoarding extends Component {
  componentDidMount() {
    const { id, soundcloud_id } = this.props.user
    this.props.startOnboarding(id, soundcloud_id)
  }
  
  render() {
    return (
      <Loader />
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state)
})

export default connect(mapStateToProps, { startOnboarding })(OnBoarding);