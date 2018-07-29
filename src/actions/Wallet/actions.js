export const UPDATE_BALANCE = 'UPDATE_BALANCE'
export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES'
export const UPDATE_USD = 'UPDATE_USD'
export const PROMPT_SWAP = 'PROMPT_SWAP'
export const PROMPT_BUY = 'PROMPT_BUY'
export const PROMPT_DAILY_FAUCET = 'PROMPT_DAILY_FAUCET'
export const SET_TRY_FAUCET = 'SET_TRY_FAUCET'
export const UPDATE_WALLET = 'UPDATE_WALLET'

export const SET_CRYPTO_BALANCES = "SET_CRYPTO_BALANCES"
export const ERROR_FETCHING_BALANCE = "ERROR_FETCHING_BALANCE"
export const SET_WALLET = "SET_WALLET"
export const SET_MNEMONIC = "SET_MNEMONIC"

// -------------------------------------------------------------------------------------------------

export const setCryptoBalances = (balances) => ({
    type: SET_CRYPTO_BALANCES,
    balances
})

export const errorFetchingBalance = (err) => ({
    type: ERROR_FETCHING_BALANCE,
    err
})

export const setMnemonic = (mem) => ({
    type: SET_MNEMONIC,
    mem
})

export const setWallet = (wallet) => ({
    type: SET_WALLET,
    wallet
})

export const swapPrompt = (prompt) => ({
    type: PROMPT_SWAP,
    prompt
})

export const buyPrompt = (prompt) => ({
    type: PROMPT_BUY,
    prompt
})

export const faucetPrompt = (prompt) => ({
    type: PROMPT_DAILY_FAUCET,
    prompt
})

export const setTryFaucet = (newValue) => ({
    type: SET_TRY_FAUCET,
    tryFaucet: newValue
})

export const updateWallet = walletState => ({
    type: UPDATE_WALLET,
    walletState
})

