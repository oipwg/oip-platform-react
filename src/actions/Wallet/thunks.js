import {setCryptoBalances, errorFetchingBalance, setWalletAddresses} from "./actions";

export const fetchCryptoBalances = (wallet) => (dispatch) => {
    wallet.getCoinBalances()
        .then(balances => {
            dispatch(setCryptoBalances(balances))
        })
        .catch(err => {
            dispatch(errorFetchingBalance(err))
        })
}

export const fetchWalletAddresses = (wallet) => (dispatch) => {
    let coins = wallet.getCoins();
    let addr = {}
    for (let coin in coins) {
        addr[coin] = coins[coin].getAddress(0, 0, 0).getPublicAddress()
    }
    dispatch(setWalletAddresses(addr))
}



// -------------------------------------------------------------------------------------------------
// @ToDo::PROMPT SWAP

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT CURRENCY BUY

// -------------------------------------------------------------------------------------------------
//  @ToDo::PROMPT TRY FAUCET

// -------------------------------------------------------------------------------------------------
//  @ToDo::TRY DAILY FAUCET

