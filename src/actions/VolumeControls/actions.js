export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const CHANGE_MUTE = 'CHANGE_MUTE'

// --------------------------------------------------------------------------------

export const setVolume = volume => ({
    type: CHANGE_VOLUME,
    volume
})

export const setMute = mute => ({
    type: CHANGE_MUTE,
    isMuted: mute
})
