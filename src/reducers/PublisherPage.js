import * as actions from '../actions/index.js'

export const PublisherPage = (state = {publisher: {}}, action) => {
    switch (action.type) {
        case actions.SET_PUBLISHER_PAGE_PUBLISHER:
            console.log("ACTION :", action);
            return {
                ...state,
                publisher: action.publisher
            }
        default:
            return state
    }
}
