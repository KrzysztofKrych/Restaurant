import { store } from "../../index";
import fire from "../../../config/firebaseConfig";
import ActionType from "./user.actions";
import Auth from "../../../api/models/Auth";

export const loginActionInit = (user: Auth) => {
    fire.auth().signInWithEmailAndPassword(user.login , user.password).then((res) => {
        store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION });
    }).catch((e)=>{
        console.log("error",e)
    })
}

export const signoutActionInit = () => {
    fire.auth().signOut();
}

export const loginActionSuccess = () => {
    store.dispatch({type: ActionType.USER_LOGIN_SUCCESS_ACTION });
}