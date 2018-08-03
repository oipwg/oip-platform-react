import * as actions from '../actions/NotificationSystem/actions'

export const NotificationSystem = (state = {NotificationSystem: undefined}, action) => {
    switch (action.type) {
        case actions.SET_NOTIFICATION_SYSTEM:
            return {
                ...state,
                NotificationSystem: action.notificationSystem
            }
        default:
            return state
    }
}
