import {
    setCryptoBalances,
    errorFetchingBalance,
    setWalletAddresses, setCoinbaseModalVars, toggleCoinbaseModal
} from "./actions"
import {
    paymentInProgress,
    buyInProgress,
    payForFile,
    buyFile,
    paymentError,
    buyError,
    paymentClear
} from '../FilePlaylist/actions'
import {loginPrompt} from '../User/actions'
import {ArtifactPaymentBuilder} from 'oip-account'

export const getCoinBalances = (options) => async (dispatch, getState) => {
    let wallet = getState().Wallet.wallet
    try {
        let balances = await wallet.getCoinBalances(options)
        dispatch(setCryptoBalances(balances))
    } catch (err) {
        dispatch(errorFetchingBalance(err))
    }
}

export const getWalletAddresses =  () =>  (dispatch, getState) => {
    let wallet = getState().Wallet.wallet
    let coins = wallet.getCoins()
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

const waitForCoinbase = (dispatch, getState, coin) => {
    return new Promise((resolve, reject) => {
        const wallet = getState().Wallet

        wallet.wallet.onWebsocketUpdate((address) => {
            //@ToDo: Update coin balance onWebsocketUpdate (subscribe when logged in)
            wallet.wallet.getCoinBalances({discover: false})

            if (address.getPublicAddress() === wallet.addresses[coin]){
                resolve()
            }
        })

        let promptTimeout = setInterval(() => {
            if (!wallet.coinbaseModal) {
                clearInterval(promptTimeout)
                reject()
            }
        }, 1000)
    })
}

export const payForArtifactFile = (artifact, file, type) => async (dispatch, getState) => {
    await waitForLogin(dispatch, getState)

    if (type === "view") {dispatch(paymentInProgress(file.key))}
    else if (type === "buy") {dispatch(buyInProgress(file.key))}

    let wallet = getState().Wallet
    let apb = new ArtifactPaymentBuilder(wallet.wallet, artifact, file.info, type)

    let preprocess = await apb.getPaymentAddressAndAmount()

    if (!preprocess.success && preprocess.error_type === "PAYMENT_COIN_SELECT"){
        let coin;
        if (apb.getSupportedCoins().includes("ltc") || apb.getSupportedCoins().includes("btc")) {
            coin = apb.getSupportedCoins().includes("ltc") ? "ltc" : "btc"
            dispatch(setCoinbaseModalVars({
                currency: apb.getSupportedCoins().includes("ltc") ? "ltc" : "btc",
                amount: 1,
                address: wallet.addresses[coin === "ltc" ? "litecoin" : "bitcoin"]
            }))
        } else {
            if (type === "view") {dispatch(paymentError(file.key))}
            else if (type === "buy") {dispatch(buyError(file.key))}
        }
        try {
            await waitForCoinbase(dispatch, getState, coin)
        } catch (err) {
            console.log("Error waiting for coinbase \n", err)
        }
    }

    preprocess = await apb.getPaymentAddressAndAmount()

    if (preprocess.success) {
        try {
            await apb.pay()
            if (type === "view") {dispatch(payForFile(file.key))}
            else if (type === "buy") {dispatch(buyFile(file.key))}
        } catch (err) {
            if (type === "view") {dispatch(paymentError(file.key))}
            else if (type === "buy") {dispatch(buyError(file.key))}
        }
    } else {
        if (type === "view") {dispatch(paymentError(file.key))}
        else if (type === "buy") {dispatch(buyError(file.key))}
    }
}

export const handleCoinbaseModalEvents = (event) => (dispatch, getState) => {
    switch (event) {
        case "close":
            dispatch(paymentClear(getState().FilePlaylist.active))
            break
        case "success":
            dispatch(toggleCoinbaseModal(false))
            break
        case "cancel":
            dispatch(paymentClear(getState().FilePlaylist.active))
            break
    }
}

export const listenForWebsocketUpdates = () => (dispatch, getState) => {
    let wallet = getState().Wallet.wallet
    wallet.onWebsocketUpdate((addr) => {
        console.log("Websocket update: ", addr.getPublicAddress())
        dispatch(getCoinBalances({discover: false}))
    })
}

// -------------------------------------------------------------------------------------------------
// @ToDo::PROMPT SWAP

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT CURRENCY BUY

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT TRY FAUCET

// -------------------------------------------------------------------------------------------------
//  @ToDo::TRY DAILY FAUCET

