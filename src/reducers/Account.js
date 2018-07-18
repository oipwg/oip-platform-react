import * as actions from '../actions/Account/actions'

export const Account = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_ACCOUNT:
            return {
                ...state,
                Account: action.account
            };
        default:
            return state
    }
}

