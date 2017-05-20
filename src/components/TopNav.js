import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

import navigate from '../lib/navigate';

const styles = StyleSheet.create({
  container: {
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0.93)',

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
          <Text onPress={() => navigate(navigator)('pop')} style={styles.backButton}>{navigator.getCurrentRoutes().length > 1 && '<'}</Text>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.backButton}></Text>
        </Animated.View>
      </View>
    );
  }
}

export default componentName;