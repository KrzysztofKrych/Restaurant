import Redux from "redux";
import dataReducer, { DataState,dataInitialState } from "./data/data.reducer";
import userReducer, {initialUserState, UserState, UserAction } from "./data/user/user.reducer";

export interface RootState {
    user: UserState
}

export type RootAction = UserAction;

export const rootInitialState: RootState = {
    user: initialUserState,
};

const rootReducer: Redux.Reducer<RootState, RootAction> = (store = rootInitialState, action) => {
    return {
        user: userReducer(store.user, action as UserAction),
    };
}


export default rootReducer;
