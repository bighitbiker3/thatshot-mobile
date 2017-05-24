import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'
import Slider from 'react-native-slider'
import Icon from 'react-native-vector-icons/Ionicons';

import { getTrackIsPlaying, getCurrentTime, getDuration, getSoundObject } from '../redux/selectors';
import { playTrack, pauseTrack, seekToBeginning, songEnded } from '../redux/actions/player'
import colors from '../lib/colors'
import humanTime from '../lib/humanTime'

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: colors.dark,
    position: 'absolute',
    bottom: 100, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    position: 'absolute',
    top: -50,
    right: -10,
    backgroundColor: colors.dark
  },
  sliderControlWrapper: {
    flexDirection: 'column',
    height: 100,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  sliderAndDurationWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlWrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  sliderWrapper: {
    width: '60%',
    marginHorizontal: 10,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  timeText: {
    width: '20%',
    textAlign: 'center',
    color: colors.lighterMain
  }
})

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerBottom: new Animated.Value(-100),
      buttonTop: new Animated.Value(-98),
      showPlayer: false
    };
    this.togglePlayer = this.togglePlayer.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.showPlayer && !this.state.showPlayer) {
      Animated.timing(this.state.playerBottom, { toValue: 49, duration: 200 }).start()
      Animated.timing(this.state.buttonTop, { toValue: -49, duration: 200 }).start(); 
    } else if (!nextState.showPlayer && this.state.showPlayer) {
      Animated.timing(this.state.playerBottom, { toValue: -100, duration: 200 }).start(); 
      Animated.timing(this.state.buttonTop, { toValue: -98, duration: 200 }).start(); 

    }
  }

  togglePlayer() {
    this.setState((prev) => ({ showPlayer: !prev.showPlayer }))
  }

  handleSliderChange(e) {
    this.props.soundObject.seekToTime(e)
  }

  render() {
    const { isPlaying, currentTime, duration } = this.props;
    return (
      <Animated.View style={[styles.container, {bottom: this.state.playerBottom}]}>
        <Animated.View style={[styles.icon, {top: this.state.buttonTop}]}>
          <Icon.Button style={{justifyContent: 'center'}} onPress={this.togglePlayer} name='md-barcode' size={30} backgroundColor={colors.dark} color={colors.lightMain} />
        </Animated.View>
        <View style={styles.sliderControlWrapper}>
          <View style={styles.sliderAndDurationWrapper}>
            <Text style={styles.timeText}>{humanTime(currentTime) || '0:00'}</Text>
              <View style={styles.sliderWrapper}>
                  <Slider 
                    thumbStyle={{ top: 22 }}
                    minimumValue={0}
                    maximumValue={duration || 0}
                    value={currentTime}
                    onValueChange={this.handleSliderChange}
                    
                  />
              </View>
            <Text style={styles.timeText}>{humanTime(duration) || '0:00'}</Text>
          </View>
          <View style={styles.controlWrapper}>
            <TouchableOpacity
              onPress={this.props.seekToBeginning}
            >
              <Icon name='md-rewind' size={30} color={colors.lightMain} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isPlaying ? () => this.props.pauseTrack() : () => this.props.playTrack()}
            >
              <Icon name={isPlaying ? 'md-pause' : 'md-play'} size={30} color={colors.lightMain} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.songEnded}
            >
              <Icon name='md-fastforward' size={30} color={colors.lightMain} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const mapStateToProps = (state) => ({
 isPlaying: getTrackIsPlaying(state),
 currentTime: getCurrentTime(state),
 duration: getDuration(state),
 soundObject: getSoundObject(state)
})

export default connect(mapStateToProps, { playTrack, pauseTrack, seekToBeginning, songEnded })(Player)
