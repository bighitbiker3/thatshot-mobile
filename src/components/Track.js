import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { addToQueue } from '../redux/actions/queue';

import ArtistPage from './ArtistPage'
import navigate from '../lib/navigate';

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  albumArt: {
    height: '90%',
    width: '30%',
    alignSelf: 'center'
  },
  trackArtistContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'Karla',
    color: '#ecebe8',
    fontWeight: '100'
  },
  artist: {
    fontFamily: 'Karla',
    color: '#828282',
    fontWeight: '100'
  }
})

const makeArtworkUrl = (artwork) => {
  if (artwork) return artwork.replace('large', 't300x300')
  return 'https://facebook.github.io/react/img/logo_og.png'
}

const makeTitle = (title) => {
  const split = title.split('-')
  if (split.length >= 2) return split[1].trim()
  return split[0].trim()
}

class Track extends Component {
  constructor(props) {
    super(props);
    this.navigate = navigate(this.props.navigator);
  }
  
  render() {
    const { artwork_url, title, user, artist, artist_id } = this.props.track
    return (
      <TouchableOpacity
        onPress={() => this.props.addToQueue(this.props.track)}
      >
        <View style={styles.container}>
          <Image
            style={styles.albumArt}
            source={{uri: makeArtworkUrl(artwork_url) }}
            resizeMode='contain'
          />
          <View style={styles.trackArtistContainer}>
            <Text
              style={styles.artist}
              onPress={() => {
                this.navigate('push', 
                {
                  component: ArtistPage, 
                  passProps: { 
                    endpoint: `https://api.soundcloud.com/users/${artist_id || user.id}/tracks/?client_id=622c5a5338becb1365fb57b6bdc97f09&linked_partitioning=1`,
                    title: artist || user.username
                  }
                })
              }}
            >{artist || user.username}</Text>
            <Text style={styles.title}>{makeTitle(title)}</Text> 
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(() => ({}), { addToQueue } )(Track)
