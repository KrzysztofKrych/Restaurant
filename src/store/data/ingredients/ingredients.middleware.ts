
import { store } from "../../index";
import ActionType from "./ingredients.actions";
import Ingredient from "../../../api/models/Ingredient";

export const addIngredientActionSuccess = (ingredient: Ingredient, successCallback: () => void) => {
    store.dispatch({ type: ActionType.ADD_INGREDIENT_SUCCESS_ACTION, payload: { ingredient } })
    successCallback();
}

export const editIngredientNameActionSuccess = (newName: string, id: string) => {
    store.dispatch({ type: ActionType.EDIT_INGREDIENT_NAME_SUCCESS_ACTION, payload: { newName, id } })
}

export const deleteIngredientNameActionSuccess = ( id: string) => {
    store.dispatch({ type: ActionType.DELETE_INGREDIENT_NAME_SUCCESS_ACTION, payload: { id } })
}

export const addAvatarToIngredientActionSuccess = (avatar: string, id:string) => {
    store.dispatch({ type: ActionType.ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION, payload: { avatar,id } })
}
