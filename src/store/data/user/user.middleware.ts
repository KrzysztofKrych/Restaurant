import { store } from "../../index";
import { fire } from "../../../config/firebaseConfig";
import ActionType from "./user.actions";
import Auth from "../../../api/models/Auth";
import { getByQuery } from "../../../config/firebaseReq";

export const loginActionInit = (user: Auth) => {
    fire.auth().signInWithEmailAndPassword(user.login, user.password).then((res) => {
        loginActionSuccess(res.user && res.user.email || "")
    }).catch((e)=>{
        console.log("error", e)
    })
}

export const signoutActionInit = () => {
    fire.auth().signOut();
    store.dispatch({type: ActionType.USER_SIGNOUT_SUCCESS_ACTION});
}

export const loginActionSuccess = async (email: string) => {
    const user = await getByQuery('users', 'email', email);
    store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION, payload:  { ...user }  });
}