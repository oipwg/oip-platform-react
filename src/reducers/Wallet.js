import * as actions from '../actions/Wallet/actions'

export const Wallet = (state = {
	swapPrompt: false,
	buyPrompt: false,
	dailyFaucetPrompt: false,
	tryFaucet: true,
	coinbaseModal: false,
	coinbaseModalVars: {}
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
		case actions.SET_WALLET_ADDRESSES:
			return {
				...state,
				addresses: action.addresses
			}
		case actions.TOGGLE_COINBASE_MODAL:
			return {
				...state,
				coinbaseModal: action.bool
			}
		case actions.SET_COINBASE_MODAL_VARS:
			return {
				...state,
				coinbaseModalVars: action.vars,
				coinbaseModal: true
			}
		default:
			return state
	}
}