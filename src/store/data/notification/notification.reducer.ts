import Redux from "redux";

import ActionType, {
    ShowNotificationBar
} from "./notification.actions"

export interface NotificationState {
    message: string,
    variant: string,
    show: boolean
}


export const initialNotificationState: NotificationState = {
    message: "",
    variant: "",
    show: false
}

export type NotificationAction = ShowNotificationBar

const notificationReducer: Redux.Reducer<NotificationState, NotificationAction> = (state = initialNotificationState, action: NotificationAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.SHOW_NOTIFICATION_BAR: {
                const { message, variant} = action.payload
                return{
                    ...state,
                    message: message,
                    variant: variant,
                    show: true
                }
            }
            case ActionType.HIDE_NOTIFICATION_BAR: {
                return{
                    ...state,
                    show: false
                }
            }
            default: {
                return state
            }
        }
    }
    return state;
}
export default notificationReducer;

