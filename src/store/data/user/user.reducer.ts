import Redux from "redux";

import ActionType, {
    UserLoginSuccessAction,
    UserSignOutSuccessAction
} from "./user.actions"
import User from "../../../api/models/User";

export interface UserState{
    user: User
    auth: boolean
}

export const initialUserState: UserState = {
    auth: false,
    user: {
        email: ""
    }
}

export type UserAction = UserLoginSuccessAction | UserSignOutSuccessAction;

const userReducer: Redux.Reducer<UserState, UserAction> = (state = initialUserState, action: UserAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.USER_LOGIN_SUCCESS_ACTION: {
                const email = action.payload.email
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: email
                    },
                    auth: true
                }
            }
            case ActionType.USER_SIGNOUT_SUCCESS_ACTION: {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: ""
                    },
                    auth: false
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

