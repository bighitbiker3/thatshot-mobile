import React, { Component } from 'react';
import { View } from 'react-native'
import TopNav from './TopNav';
import BottomNav from './BottomNav';

class Nav extends Component {
  render() {
    const { navigator, title, extraStyles} = this.props
    return (
      <View style={extraStyles.container}>
        <TopNav navigator={navigator} title={title} />
          {this.props.children}
        <BottomNav navigator={navigator} title={title}  />
      </View>
    );
  }
}

export default Nav;