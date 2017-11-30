import * as actions from '../actions'

export const User = (state = {
	isFetching: false,
	loginFailure: false,
	isLoggedIn: false,
	modalPrompt: false,
	publisher: {}
}, action) => {
	switch (action.type){
		case actions.LOGIN_FETCHING:
			return {
				...state,
				isFetching: action.isFetching ? action.isFetching : true
			}
		case actions.LOGIN_FAILURE:
			return {
				...state,
				loginFailure: true,
				isFetching: false,
				isLoggedIn: false
			}
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				isFetching: false,
				loginFailure: false,
				isLoggedIn: true,
				modalPrompt: false,
				publisher: action.publisher
			}
		case actions.LOGOUT:
			return {
				...state,
				isFetching: false,
				loginFailure: false,
				isLoggedIn: false,
				publisher: {}
			}
		case actions.PROMPT_LOGIN:
			return {
				...state,
				modalPrompt: true
			}
		default:
			return state
	}
}