import * as actions from '../actions/VolumeControls/actions'

export const VolumeControls = (state = {
	isMuted: false,
	volume: 0.25,
	lastVolume: 0.25
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