import * as actions from '../actions'

const curArtifact = (state = {
	isFetching: false,
	didInvalidate: false,
	artifact: {},
	comments: []
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
				didInvalidate: false,
				comments: []
			}
		case actions.RECIEVE_CURRENT_ARTIFACT:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				artifact: action.artifact,
				lastUpdated: action.receivedAt,
				comments: []
			}
		case actions.SET_COMMENTS:
			return {
				...state,
				comments: action.comments
			}
		case actions.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.comment]
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
		case actions.ADD_COMMENT:
		case actions.SET_COMMENTS:
			return curArtifact(state, action)
		default:
			return state
	}
}