import * as actions from '../actions/ArtifactLists/actions'

const artifactList = (state = {
	isFetching: false,
	didInvalidate: false,
	items: []
}, action) => {
	switch (action.type) {
		case actions.INVALIDATE_ARTIFACT_LIST:
			return {
				...state,
				didInvalidate: true
			}
		case actions.REQUEST_ARTIFACT_LIST_ERROR:
			return {
				...state,
				isFetching: false,
				error: true,
				errorText: action.errorText
			}
		case actions.REQUEST_ARTIFACT_LIST:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			}
		case actions.RECIEVE_ARTIFACT_LIST:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				error: false,
				items: action.items,
				lastUpdated: action.receivedAt
			}
		default:
			return state
	}
}

export const ArtifactLists = (state = {}, action) => {
	switch (action.type) {
		case actions.INVALIDATE_ARTIFACT_LIST:
		case actions.REQUEST_ARTIFACT_LIST_ERROR:
		case actions.RECIEVE_ARTIFACT_LIST:
		case actions.REQUEST_ARTIFACT_LIST:
			return {
				...state,
				[action.page]: artifactList(state[action.page], action)
			}
		default:
			return state
	}
}