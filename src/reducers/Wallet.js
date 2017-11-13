import * as actions from '../actions'

const Coin = (state = {
	balance: 0,
	addresses: []
}, action) => {
	switch (action.type){
		case actions.UPDATE_BALANCE:
			return {
				...state,
				balance: action.balance
			}
		case actions.UPDATE_ADDRESSES:
			return {
				...state,
				addresses: action.addresses
			}
		default:
			return state
	}
}

export const Wallet = (state = { }, action) => {
	switch (action.type) {
		case actions.UPDATE_BALANCE:
		case actions.UPDATE_ADDRESSES:
			return {
				...state,
				[action.coin]: Coin(state[action.coin], action)
			}
		case actions.UPDATE_WALLET:
			return action.walletState
		default:
			return state
	}
}