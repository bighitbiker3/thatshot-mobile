import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

import Queue from './Queue'

import navigate from '../lib/navigate';

const styles = StyleSheet.create({
  container: {
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0.93)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1000
  },
  animatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  titleText: {
    color: 'white',
    fontFamily: 'Karla',
    fontSize: 18,
    marginTop: '4%'
  },
  backButton: {
    color: 'white',
    fontFamily: 'Karla',
    fontSize: 18,
    marginLeft: '7%',
    marginTop: '4%'
  }
})

class componentName extends Component {
  render() {
    const { title, navigator } = this.props
    console.log();
    return (
      <View style={styles.container}>
        <Animated.View style={styles.animatedContainer}>
          <Text style={styles.backButton}></Text>
          <Text onPress={() => {
            navigate(navigator)('push', {component: Queue, passProps: { title: 'Queued Tracks Boss' } });
          }} style={styles.titleText}>Your Queue</Text>
          <Text style={styles.backButton}></Text>
        </Animated.View>
      </View>
    );
  }
}

export default componentName;