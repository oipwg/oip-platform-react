import Account from 'oip-account'
import {fetchCryptoBalances, fetchWalletAddresses} from "../Wallet/thunks";

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
    if (!options.autoLogin) {dispatch(loginFetching())}
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
            dispatch(fetchCryptoBalances(account.wallet))
            dispatch(fetchWalletAddresses(account.wallet))
        })
        .catch( err => {
            if (!options.store_in_keystore) {
                options = {...options, store_in_keystore: true,
                    keystore_url: "https://mk1.alexandria.io/keystore/"}
                dispatch(accountLogin(username, pw, options))
            } else {
                if (!options.autoLogin){dispatch(loginFailure(err))}
            }
        })

}