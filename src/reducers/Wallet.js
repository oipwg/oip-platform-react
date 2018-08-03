import * as actions from '../actions/Wallet/actions'

export const Wallet = (state = {
	swapPrompt: false,
	buyPrompt: false,
	dailyFaucetPrompt: false,
	tryFaucet: true
}, action) => {
	switch (action.type) {
        case actions.SET_CRYPTO_BALANCES:
            return {
                ...state,
                cryptoBalances: action.balances
            }
        case actions.ERROR_FETCHING_BALANCE:
            return {
                ...state,
                errorFetchingBalance: action.err
            }
        case actions.SET_MNEMONIC:
            return {
                ...state,
                mnemonic: action.mem
            }
        case actions.SET_WALLET:
            return {
                ...state,
                wallet: action.wallet
            }
		case actions.PROMPT_SWAP:
			return {
				...state,
				swapPrompt: action.prompt
			}
		case actions.PROMPT_BUY:
			return {
				...state,
				buyPrompt: action.prompt
			}
		case actions.PROMPT_DAILY_FAUCET:
			return {
				...state,
				dailyFaucetPrompt: action.prompt
			}
		case actions.SET_TRY_FAUCET:
			return {
				...state,
				tryFaucet: action.tryFaucet
			}
		case actions.UPDATE_WALLET:
			return action.walletState
		case actions.SET_WALLET_ADDRESSES:
			return {
				...state,
				addresses: action.addresses
			}
		default:
			return state
	}
}