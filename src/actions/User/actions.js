export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'
export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_ERROR = 'REGISTER_ERROR'

// --------------------------------------------------------------------------------

export const loginFetching = () => ({
    type: LOGIN_FETCHING
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE
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

export const registerError = () => ({
    type: REGISTER_ERROR
})
