import {
    setCryptoBalances,
    errorFetchingBalance,
    setWalletAddresses} from "./actions"
import {
    paymentInProgress,
    buyInProgress,
    payForFile,
    buyFile,
    paymentError,
    buyError
} from '../FilePlaylist/actions'
import {loginPrompt} from '../User/actions'
import {ArtifactPaymentBuilder} from 'oip-account'

export const fetchCryptoBalances = (wallet) => (dispatch) => {
    wallet.getCoinBalances()
        .then(balances => {
            dispatch(setCryptoBalances(balances))
        })
        .catch(err => {
            dispatch(errorFetchingBalance(err))
        })
}

export const fetchWalletAddresses =  (wallet) =>  (dispatch) => {
    let coins = wallet.getCoins();
    let addr = {}
    for (let coin in coins) {
        addr[coin] = coins[coin].getAddress(0, 0, 0).getPublicAddress()
    }

    dispatch(setWalletAddresses(addr))
}

const waitForLogin = (dispatch, getState) => {
    return new Promise((resolve) =>{
        const user = getState().User
        if (!user.isLoggedIn) {
            dispatch(loginPrompt(true))
        } else {
            resolve()
        }

        let promptTimeout = setInterval(() => {
            let user = getState().User
            if (user.isLoggedIn) {
                clearInterval(promptTimeout)
                resolve()
            }
        }, 1000)
    })
}

export const payForArtifactFile = (artifact, file, type) => async (dispatch, getState) => {
    await waitForLogin(dispatch, getState)
    console.log(file.key, type)

    if (type === "view") {dispatch(paymentInProgress(file.key))}
    else if (type === "buy") {dispatch(buyInProgress(file.key))}

    let wallet = getState().Wallet.wallet
    let apb = new ArtifactPaymentBuilder(wallet, artifact, file.info, type)

    let preprocess = await apb.getPaymentAddressAndAmount()
    console.log(preprocess)
    if (preprocess.success) {
        try {
            let pay = await apb.pay()
            if (type === "view") {dispatch(payForFile(file.key))}
            else if (type === "buy") {dispatch(buyFile(file.key))}
            console.log(pay)
        } catch (err) {
            if (type === "view") {dispatch(paymentError(file.key))}
            else if (type === "buy") {dispatch(buyError(file.key))}
            console.log("Error sending payment \n ", err)
        }
    } else {
        if (type === "view") {dispatch(paymentError(file.key))}
        else if (type === "buy") {dispatch(buyError(file.key))}
        return preprocess
    }

}

// -------------------------------------------------------------------------------------------------
// @ToDo::PROMPT SWAP

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT CURRENCY BUY

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT TRY FAUCET

// -------------------------------------------------------------------------------------------------
//  @ToDo::TRY DAILY FAUCET

