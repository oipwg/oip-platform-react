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
            dispatch(registerSuccess())
            dispatch(setAccount(succ))
            dispatch(accountLogin(username, pw, options))
        })
        .catch( err => {
            dispatch(registerError(err))
        })
}

export const accountLogin = (username, pw, options, acc) => dispatch => {
    dispatch(loginFetching())
    let account = acc ? acc : options ? new Account(username, pw, options) : new Account(username, pw);
    account.login()
        .then( succ => {
            dispatch(loginSuccess(username))
            if (options.rememberMe) {
                console.log(localStorage, localStorage.username)
                localStorage.username = username;
                localStorage.pw = pw;
            }
        })
        .catch( err => {
            if (!options.store_in_keystore) {
                //@ToDo::change hardcoded keystore_url when server is up
                dispatch(accountLogin(username, pw, {discover: false, store_in_keystore: true,
                    keystore_url: "http://localhost:9196", rememberMe: options.rememberMe}))
            } else {
                dispatch(loginFailure(err))
            }
        })

}