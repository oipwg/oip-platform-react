export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'
export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_ERROR = 'REGISTER_ERROR'
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const RESET_REGISTER_STATE = 'RESET_REGISTER_STATE'
export const RESET_LOGIN_STATE = 'RESET_LOGIN_STATE'

// --------------------------------------------------------------------------------

export const loginFetching = () => ({
    type: LOGIN_FETCHING
})

export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    err: err
})

export const loginSuccess = (publisher) => ({
    type: LOGIN_SUCCESS,
    publisher
})

export const logoutAction = () => ({
    type: LOGOUT
})

export const loginPrompt = (prompt) => ({
    type: PROMPT_LOGIN,
    prompt
})

export const registerStarting = () => ({
    type: REGISTER_START
})

export const registerError = (err) => ({
    type: REGISTER_ERROR,
    err: err
})

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const setAccount = account => ({
    type: SET_ACCOUNT,
    account
})

export const resetRegisterState = () => ({
    type: RESET_REGISTER_STATE
})

export const resetLoginState = () => ({
    type: RESET_LOGIN_STATE
})