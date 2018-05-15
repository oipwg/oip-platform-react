import * as actions from '../actions/index.js'

export const NotificationSystem = (state = {NotificationSystem: undefined}, action) => {
    switch (action.type) {
        case actions.SET_NOTIFICATION_SYS:
            console.log("ACTION :", action);
            return {
                ...state,
                NotificationSystem: action.notificationSystem
            }
        default:
            return state
    }
}
