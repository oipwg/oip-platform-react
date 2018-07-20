import * as actions from '../actions/PublisherPage/actions'

export const PublisherPage = (state = {publisher: {}}, action) => {
    switch (action.type) {
        case actions.SET_PUBLISHER_PAGE_PUBLISHER:
            return {
                ...state,
                publisher: action.publisher
            }
        default:
            return state
    }
}
