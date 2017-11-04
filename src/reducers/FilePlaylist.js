import * as actions from '../actions'

const file = (state = {
	owned: false,
	isPaid: false,
	hasPaid: false,
	explicitAction: false,
	playState: actions.PAUSED,
	duration: 0,
	currentTime: 0,
	info: {}
}, action) => {
	switch (action.type) {
		case actions.ADD_FILE_TO_PLAYLIST:
			return {
				...state,
				isPaid: action.isPaid,
				owned: action.owned ? action.owned : false,
				info: action.file
			}
		case actions.PAY_FOR_FILE:
			return {
				...state,
				hasPaid: true
			}
		case actions.BUY_FILE:
			return {
				...state,
				owned: true
			}
		default:
			return state
	}
}

export const FilePlaylist = (state = { }, action) => {
	switch (action.type) {
		case actions.ADD_FILE_TO_PLAYLIST:
		case actions.PAY_FOR_FILE:
		case actions.BUY_FILE:
			return {
				...state,
				[action.uid]: file(state[action.uid], action)
			}
		case actions.SET_ACTIVE_FILE_IN_PLAYLIST:
			return {
				...state,
				active: action.uid
			}
		default:
			return state
	}
}