import * as actions from '../actions'

export const User = (state = {
	isFetching: false,
	loginFailure: false,
	isLoggedIn: false,
	loginModalPrompt: false,
	registerStart: false,
	registerError: false,
	publisher: {}
}, action) => {
	switch (action.type){
		case actions.LOGIN_FETCHING:
			return {
				...state,
				isFetching: true
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
				loginModalPrompt: false,
				registerStart: false,
				registerError: false,
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
				loginModalPrompt: true
			}
		case actions.REGISTER_START:
			return {
				...state,
				registerStart: true,
				registerError: false
			}
		case actions.REGISTER_ERROR:
			return {
				...state,
				registerStart: false,
				registerError: true
			}
		default:
			return state
	}
}