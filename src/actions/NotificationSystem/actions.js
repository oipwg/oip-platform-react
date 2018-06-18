export const SET_NOTIFICATION_SYSTEM = "SET_NOTIFICATION_SYSTEM"

// --------------------------------------------------------------------------------
// @TODO Make sure to change the redux store to reflect the change in the constant's name

export const setNotificationSystem = (notificationSystem) => ({
    type: SET_NOTIFICATION_SYSTEM,
    notificationSystem
})

