import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Home from './Home';


class NavigatorWrapper extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  configureScene(route, routeStack) {
    if (route.type === 'Modal') return Navigator.SceneConfigs.FloatFromBottom;
    if (route.type === 'Left') return Navigator.SceneConfigs.FloatFromLeft;
    return Navigator.SceneConfigs.PushFromRight;
  }
  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />;
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        style={{ flex: 1 }}
        initialRoute={{ 
          component: Home,
          passProps: {
            endpoint: 'https://api.soundcloud.com/users/22158004/favorites?client_id=622c5a5338becb1365fb57b6bdc97f09&linked_partitioning=1&limit=200',
            title: 'Your Likes' 
          } 
        }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default NavigatorWrapper;
