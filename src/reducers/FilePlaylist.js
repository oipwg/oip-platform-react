import * as actions from '../actions/FilePlaylist/actions'

const file = (state = {
	owned: false,
	isPaid: false,
	hasPaid: false,
	paymentInProgress: false,
	paymentError: false,
	buyInProgress: false,
	buyError: false,
	explicitAction: false,
	isPlaying: false,
	isPlayable: false,
	isSeekable: false,
	duration: 0,
	currentTime: 0,
	info: undefined
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
				hasPaid: true,
				paymentInProgress: false,
				paymentError: false
			}
		case actions.BUY_FILE:
			return {
				...state,
				owned: true
			}
		case actions.UPDATE_CURRENT_TIME:
			return {
				...state,
				currentTime: action.currentTime
			}
		case actions.UPDATE_DURATION:
			return {
				...state,
				duration: action.duration
			}
		case actions.UPDATE_IS_PLAYING:
			return {
				...state,
				isPlaying: action.isPlaying
			}
		case actions.UPDATE_IS_PLAYABLE:
			return {
				...state,
				isPlayable: action.isPlayable
			}
		case actions.UPDATE_IS_SEEKABLE:
			return {
				...state,
				isSeekable: action.isSeekable
			}
		case actions.PAYMENT_IN_PROGRESS:
			return {
				...state,
				paymentInProgress: true,
				paymentError: false
			}
		case actions.PAYMENT_ERROR:
			return {
				...state,
				paymentInProgress: false,
				paymentError: true
			}
		case actions.PAYMENT_CLEAR:
			return {
				...state,
				paymentInProgress: false,
				paymentError: false,
			}
		case actions.BUY_IN_PROGRESS:
			return {
				...state,
				buyInProgress: true,
				buyError: false
			}
		case actions.BUY_ERROR:
			return {
				...state,
				buyInProgress: false,
				buyError: true
			}
		default:
			return state
	}
}

export const FilePlaylist = (state = {}, action) => {
	switch (action.type) {
		case actions.ADD_FILE_TO_PLAYLIST:
		case actions.PAY_FOR_FILE:
		case actions.BUY_FILE:
		case actions.UPDATE_CURRENT_TIME:
		case actions.UPDATE_IS_PLAYING:
		case actions.UPDATE_IS_PLAYABLE:
		case actions.UPDATE_IS_SEEKABLE:
		case actions.UPDATE_DURATION:
		case actions.PAYMENT_IN_PROGRESS:
		case actions.PAYMENT_ERROR:
		case actions.CLEAR_PAY_PROGRESS_ERROR:
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