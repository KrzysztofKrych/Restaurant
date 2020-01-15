import { store } from "../../index";
import { fire } from "../../../config/firebaseConfig";
import ActionType from "./user.actions";
import Auth from "../../../api/models/Auth";
import { get, getByQuery } from "../../../config/firebaseReq";

export const loginActionInit = (user: Auth) => {
    fire.auth().signInWithEmailAndPassword(user.login, user.password).then((res) => {
        store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION, payload: { email: "s" }});
    }).catch((e)=>{
        console.log("error", e)
    })
}

export const signoutActionInit = () => {
    fire.auth().signOut();
    store.dispatch({type: ActionType.USER_SIGNOUT_SUCCESS_ACTION});
}

export const loginActionSuccess = async (email: string) => {
    // const users = await get('users').then(data => data);
    const users = await getByQuery('users', 'email', email)
    store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION, payload: { email } });
}