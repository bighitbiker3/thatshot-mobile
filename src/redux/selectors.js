//Queue
export const getQueue = (state) => state.queue

//Player
export const getTrack = (state) => state.player.track
export const getTrackIsPlaying = (state) => state.player.playing
export const getCurrentTime = (state) => state.player.currentTime
export const getDuration = (state) => state.player.duration
export const getSoundObject = (state) => state.player.soundObject

// Tracks
export const getLikedTracks = (state) => state.tracks.likes.tracks
export const getLikedNextHref = (state) => state.tracks.likes.next_href
export const getArtistTracks = (state) => state.tracks.artist.tracks
export const getArtistNextHref = (state) => state.tracks.artist.next_href
export const getSavantTracks = (state) => state.tracks.savant.tracks
export const getPlaylists = (state) => state.tracks.playlists.playlists
export const getPlaylistsNextHref = (state) => state.tracks.playlists.next_href

// User 
export const getUser = (state) => state.auth.user

//View 
export const getView = (state) => state.view;