//Queue
export const getQueue = (state) => state.queue

//Player
export const getTrack = (state) => state.player.track
export const getsoundObject = (state) => state.player.soundObject

// Tracks
export const getLikedTracks = (state) => state.tracks.likes.tracks
export const getLikedNextHref = (state) => state.tracks.likes.next_href
export const getArtistTracks = (state) => state.tracks.artist.tracks
export const getArtistNextHref = (state) => state.tracks.artist.next_href
export const getSavantTracks = (state) => state.tracks.savant.tracks

// User 
export const getUser = (state) => state.auth.user