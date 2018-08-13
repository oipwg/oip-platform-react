export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const SET_ACTIVE_FILE_IN_PLAYLIST = 'SET_ACTIVE_FILE_IN_PLAYLIST'
export const SET_FILE_PLAYLIST = 'SET_FILE_PLAYLIST'

export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME'
export const UPDATE_IS_PLAYING = 'UPDATE_IS_PLAYING'
export const UPDATE_IS_PLAYABLE = 'UPDATE_IS_PLAYABLE'
export const UPDATE_IS_SEEKABLE = 'UPDATE_IS_SEEKABLE'
export const UPDATE_DURATION = 'UPDATE_DURATION'


// -------------------------------------------------------------------------------------------------

export const updateFileCurrentTime = (uid, currentTime) => ({
    type: UPDATE_CURRENT_TIME,
    uid,
    currentTime
})

export const isPlayingFile = (uid, isPlaying) => ({
    type: UPDATE_IS_PLAYING,
    uid,
    isPlaying
})

export const isPlayableFile = (uid, isPlayable) => ({
    type: UPDATE_IS_PLAYABLE,
    uid,
    isPlayable
})

export const isSeekableFile = (uid, isSeekable) => ({
    type: UPDATE_IS_SEEKABLE,
    uid,
    isSeekable
})

export const updateFileDuration = (uid, duration) => ({
    type: UPDATE_DURATION,
    uid,
    duration
})

export const setActiveFileInPlaylist = uid => ({
    type: SET_ACTIVE_FILE_IN_PLAYLIST,
    uid
})

export const addFileToPlaylist = (file, uid) => ({
    type: ADD_FILE_TO_PLAYLIST,
    uid,
    isPaid: file.isPaid(),
    file
})