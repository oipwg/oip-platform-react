import * as actions from '../actions/User/actions'

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
				isLoggedIn: false,
                loginErrorMessage: action.err.message
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
				loginModalPrompt: action.prompt
			}
        case actions.RESET_LOGIN_STATE:
            return {
                ...state,
                isFetching: false,
                loginFailure: false,
                isLoggedIn: false,
                loginErrorMessage: null,
                publisher: {}
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
				registerError: true,
                registerErrorMessage: action.err.message
			}
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                registerError: false,
                registerSuccess: true,
                registerStart: false
            }
        case actions.RESET_REGISTER_STATE:
            return {
                ...state,
                registerError: false,
                registerSuccess: false,
                registerStart: false,
                registerErrorMessage: null
            }
        case actions.SET_ACCOUNT:
            return {
                ...state,
                Account: action.account
            }
		default:
			return state
	}
}