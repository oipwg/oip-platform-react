import * as actions from '../actions/Wallet/actions'

export const Wallet = (state = {
	swapPrompt: false,
	buyPrompt: false,
	dailyFaucetPrompt: false,
	tryFaucet: true
}, action) => {
	switch (action.type) {
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
		default:
			return state
	}
}