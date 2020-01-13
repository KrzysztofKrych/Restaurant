import Redux from "redux"
import Auth from "../../../api/models/Auth";
import { store } from "../../index";
import fire from "../../../config/firebaseConfig";


enum ActionType {
    USER_LOGIN_INIT_ACTION = "USER_LOGIN_INIT_ACTION",
    USER_LOGIN_SUCCESS_ACTION  = "USER_LOGIN_SUCCESS_ACTION" ,
    USER_LOGIN_FAIL_ACTION = "USER_LOGIN_FAIL_ACTION"
}


export class UserLoginInitAction implements Redux.Action {
    public type = ActionType.USER_LOGIN_INIT_ACTION;
}
export class UserLoginSuccessAction implements Redux.Action {
    public type = ActionType.USER_LOGIN_SUCCESS_ACTION;
}


export default ActionType;