import Redux from "redux"

enum ActionType {
    USER_LOGIN_INIT_ACTION = "USER_LOGIN_INIT_ACTION",
    USER_LOGIN_SUCCESS_ACTION  = "USER_LOGIN_SUCCESS_ACTION" ,
    USER_LOGIN_FAIL_ACTION = "USER_LOGIN_FAIL_ACTION",
    USER_SIGNOUT_SUCCESS_ACTION = "USER_SIGNOUT_SUCCESS_ACTION"
}


export class UserLoginInitAction implements Redux.Action {
    public readonly type = ActionType.USER_LOGIN_INIT_ACTION;
}

export class UserLoginSuccessAction implements Redux.Action {
    public readonly type = ActionType.USER_LOGIN_SUCCESS_ACTION;
    public readonly payload: { email: string, id: number }
    constructor(email: string, id: number ){
        this.payload = { email, id }
    }
}
export class UserSignOutSuccessAction implements Redux.Action {
    public readonly type = ActionType.USER_SIGNOUT_SUCCESS_ACTION;
}

export default ActionType;