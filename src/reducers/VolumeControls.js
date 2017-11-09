import * as actions from '../actions'

export const VolumeControls = (state = {
	isMuted: false,
	volume: 0.75,
	lastVolume: 0.75
}, action) => {
	switch (action.type) {
		case actions.CHANGE_VOLUME:
			return {
				...state,
				volume: action.volume,
				lastVolume: action.volume
			}
		case actions.CHANGE_MUTE:
			return {
				...state,
				isMuted: action.isMuted,
				volume: action.volume
			}
		default:
			return state
	}
}