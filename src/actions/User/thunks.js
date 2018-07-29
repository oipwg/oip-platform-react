import Account from 'oip-account'
import {fetchCryptoBalances} from "../Wallet/thunks";

import {
    setAccount,
    registerError,
    loginSuccess,
    loginFailure,
    loginFetching,
    registerStarting,
    registerSuccess}
    from './actions'
import {setMnemonic, setWallet} from "../Wallet/actions";

export const createAccount = (username, pw, options) => dispatch => {
    dispatch(registerStarting())
    let acc = new Account(username, pw, options);
    console.log(acc)
    acc.create()
        .then( () => {
            dispatch(registerSuccess())
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
        .then( () => {
            dispatch(loginSuccess(username))
            if (options.rememberMe) {
                console.log(localStorage, localStorage.username)
                localStorage.username = username;
                localStorage.pw = pw;
            }
            dispatch(setAccount(account))
            dispatch(setWallet(account.wallet))
            dispatch(setMnemonic(account.wallet.getMnemonic()))
            dispatch(fetchCryptoBalances(account))
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