import Redux from "redux"
import Auth from "../../../api/models/Auth";
import { store } from "../../index";


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
    public payload: { userAuth: Auth }

    constructor(userAuth: Auth){
        this.payload = { userAuth }
    }
}

export const loginAction = (userAuth: Auth) => {
    store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION, payload: { userAuth } });

    // fetch(`${BASE_URI}/kkrych/webresources`, {method:'GET'})
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
}

export default ActionType;