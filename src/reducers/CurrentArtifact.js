import * as actions from '../actions'

const curArtifact = (state = {
	isFetching: false,
	didInvalidate: false,
	artifact: {}
}, action) => {
	switch (action.type) {
		case actions.INVALIDATE_CURRENT_ARTIFACT:
			return {
				...state,
				didInvalidate: true
			}
		case actions.REQUEST_CURRENT_ARTIFACT_ERROR:
			return {
				...state,
				isFetching: false,
				error: true,
				errorText: action.errorText
			}
		case actions.REQUEST_CURRENT_ARTIFACT:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			}
		case actions.RECIEVE_CURRENT_ARTIFACT:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				artifact: action.artifact,
				lastUpdated: action.receivedAt
			}
		default:
			return state
	}
}

export const CurrentArtifact = (state = { }, action) => {
	switch (action.type) {
		case actions.INVALIDATE_CURRENT_ARTIFACT:
		case actions.REQUEST_CURRENT_ARTIFACT_ERROR:
		case actions.REQUEST_CURRENT_ARTIFACT:
		case actions.RECIEVE_CURRENT_ARTIFACT:
			return curArtifact(state, action)
		default:
			return state
	}
}