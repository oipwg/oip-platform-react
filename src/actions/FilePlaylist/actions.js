
export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const PAY_FOR_FILE = 'PAY_FOR_FILE'
export const BUY_FILE = 'BUY_FILE'
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME'
export const UPDATE_IS_PLAYING = 'UPDATE_IS_PLAYING'
export const UPDATE_IS_PLAYABLE = 'UPDATE_IS_PLAYABLE'
export const UPDATE_IS_SEEKABLE = 'UPDATE_IS_SEEKABLE'
export const UPDATE_DURATION = 'UPDATE_DURATION'
export const PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS'
export const PAYMENT_ERROR = 'PAYMENT_ERROR'
export const CLEAR_PAY_PROGRESS_ERROR = 'CLEAR_PAY_PROGRESS_ERROR'
export const SET_ACTIVE_FILE_IN_PLAYLIST = 'SET_ACTIVE_FILE_IN_PLAYLIST'
export const BUY_IN_PROGRESS = 'BUY_IN_PROGRESS'
export const BUY_ERROR = 'BUY_ERROR'
export const SET_FILE_PLAYLIST = 'SET_FILE_PLAYLIST'

// -------------------------------------------------------------------------------------------------

export const payForFile = uid => ({
    type: PAY_FOR_FILE,
    uid
})

export const buyFile = uid => ({
    type: BUY_FILE,
    uid
})

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

export const paymentInProgress = uid => ({
    type: PAYMENT_IN_PROGRESS,
    uid
})

export const paymentError = uid => ({
    type: PAYMENT_ERROR,
    uid
})

export const clearPaymentProgressError = uid => ({
    type: CLEAR_PAY_PROGRESS_ERROR,
    uid
})

export const setActiveFileInPlaylist = uid => ({
    type: SET_ACTIVE_FILE_IN_PLAYLIST,
    uid
})

export const buyError = uid => ({
    type: BUY_ERROR,
    uid
})


export const buyInProgress = uid => ({
    type: BUY_IN_PROGRESS,
    uid
})

export const addFileToPlaylist = (file, uid) => ({
    type: ADD_FILE_TO_PLAYLIST,
    uid,
    isPaid: file.isPaid(),
    file
})