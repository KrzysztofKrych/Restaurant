import Redux from "redux";

import ActionType, {
    UserLoginSuccessAction,
    UserSignOutSuccessAction,
    UserLoginInitAction
} from "./user.actions"

import User from "../../../api/models/User";
import AuthStatus from "../../../api/AuthStatus";


export interface UserState{
    user: User
    auth: AuthStatus
}

export const initialUserState: UserState = {
    auth: AuthStatus.UNLOGIN,
    user: {
        email: "",
        id: ""
    }
}

export type UserAction = UserLoginSuccessAction | UserSignOutSuccessAction | UserLoginInitAction;

const userReducer: Redux.Reducer<UserState, UserAction> = (state = initialUserState, action: UserAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.USER_LOGIN_SUCCESS_ACTION: {
                const { email, id }  = action.payload;
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: email,
                        id: String(id)
                    },
                    auth: AuthStatus.LOGIN
                }
            }
            case ActionType.USER_LOGIN_INIT_ACTION: {
                return { 
                    ...state,
                    user: {
                        ...state.user,
                        email: "",
                        id: ""
                    }, 
                    auth: AuthStatus.WORKING
                }
            }
            case ActionType.USER_SIGNOUT_SUCCESS_ACTION: {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: "",
                        id: ""
                    },
                    auth:  AuthStatus.UNLOGIN
                }
            }
            default: {
                return state
            }
        }
    }
    return state;
}
export default userReducer;

