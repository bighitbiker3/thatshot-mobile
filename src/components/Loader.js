import React from 'react';
import { View, StyleSheet } from 'react-native'
import Spinner from 'react-native-spinkit'

import colors from '../lib/colors'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

const Loader = () => {
  return (
    <View style={styles.container}>
        <Spinner type='9CubeGrid' color={colors.main} size={100} />
    </View>
  );
};

export default Loader;