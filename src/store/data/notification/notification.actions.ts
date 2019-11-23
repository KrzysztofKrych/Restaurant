import Redux from "redux"
enum ActionType {
    SHOW_NOTIFICATION_BAR = "SHOW_NOTIFICATION_BAR",
    HIDE_NOTIFICATION_BAR = "HIDE_NOTIFICATION_BAR"
}


export class ShowNotificationBar implements Redux.Action {
    public type = ActionType.SHOW_NOTIFICATION_BAR
    public payload: { message: string, variant: string }

    constructor( message: string, variant: string ){
        this.payload = { message, variant }
    }
}

export class HideNotificationBar implements Redux.Action {
    public type = ActionType.HIDE_NOTIFICATION_BAR
}



export default ActionType;