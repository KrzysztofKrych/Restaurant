
import { store, BASE_URI } from "../../index";
import ActionType from "./ingredients.actions";
import Ingredient from "../../../api/models/Ingredient";

export const addIngredientActionSuccess = (ingredient: Ingredient, successCallback: () => void) => {
    store.dispatch({ type: ActionType.ADD_INGREDIENT_SUCCESS_ACTION, payload: { ingredient } })
    successCallback();
}
export const addAvatarToIngredientActionSuccess = (avatar: string, id:number) => {
    store.dispatch({ type: ActionType.ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION, payload: { avatar,id } })
}
