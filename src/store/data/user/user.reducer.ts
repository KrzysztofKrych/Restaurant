import Redux from "redux";

import ActionType, {
    UserLoginSuccessAction
} from "./user.actions"

export interface UserState{
    auth: boolean
}


export const initialUserState: UserState = {
    auth: false
}

export type UserAction = UserLoginSuccessAction;

const userReducer: Redux.Reducer<UserState, UserAction> = (state = initialUserState, action: UserAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.USER_LOGIN_SUCCESS_ACTION: {
                return {
                    ...state,
                    auth: true
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

