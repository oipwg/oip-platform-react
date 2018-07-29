import Account from 'oip-account'

import {
    setAccount,
    registerError,
    loginSuccess,
    loginFailure,
    loginFetching,
    registerStarting,
    registerSuccess}
    from './actions'

export const createAccount = (username, pw, options) => dispatch => {
    dispatch(registerStarting())
    console.log(username, pw, options)
    let acc = new Account(username, pw, options);
    console.log(acc)
    acc.create()
        .then( succ => {
            console.log("reg succ", succ)
            dispatch(registerSuccess())
            dispatch(setAccount(succ))
            dispatch(accountLogin(username, pw, options))
        })
        .catch( err => {
            console.log("reg err", err)
            dispatch(registerError(err))
        })
}

export const accountLogin = (username, pw, options, acc) => dispatch => {
    dispatch(loginFetching())
    let account = acc ? acc : options ? new Account(username, pw, options) : new Account(username, pw);
    account.login()
        .then( succ => {
            console.log("login succ", succ)
            dispatch(loginSuccess(username))
            if (options.rememberMe) {
                localStorage.username = username;
                localStorage.pw = pw;
            }
        })
        .catch( err => {
            console.log("login err", err)
            dispatch(loginFailure())
        })

}