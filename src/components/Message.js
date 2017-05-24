import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../lib/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: 'Karla',
  }
})

const Message = ({message}) => {
  return (
    <View style={styles.container} >
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Message;
